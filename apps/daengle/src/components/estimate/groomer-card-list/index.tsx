import { EmptyState } from '@daengle/services/components';
import { useEffect, useState } from 'react';
import {
  useUserEstimateDesignationGroomingPetsQuery,
  useUserEstimateDesignationGroomingQuery,
  useUserEstimateGeneralGroomingPetsQuery,
  useUserEstimateGeneralGroomingQuery,
} from '~/queries';
import { ProfileSelector } from '../pet-profile';
import { CardList } from '../card-list';
import {
  GetUserEstimateDesignationGroomingList,
  GetUserEstimateGeneralGroomingList,
} from '~/models';
import { useIntersectionLoad } from '~/hooks';
import { bottom } from './index.styles';
import { useRouter } from 'next/router';
import { ROUTES } from '~/constants/commons';
import { OptionSelector } from '../option';

interface Props {
  isDesignation: boolean;
}

export function GroomerEstimateList({ isDesignation }: Props) {
  const router = useRouter();
  const { petId } = router.query;

  const [selectedPetId, setSelectedPetId] = useState<number | undefined>(
    petId ? Number(petId) : undefined
  );
  const [selectedEstimateId, setSelectedEstimateId] = useState<number | undefined>(0);

  const {
    data: petData,
    isLoading: petLoading,
    error: petError,
  } = isDesignation
    ? useUserEstimateDesignationGroomingPetsQuery()
    : useUserEstimateGeneralGroomingPetsQuery();

  const petInfos = petData?.pets || [];

  useEffect(() => {
    if (!selectedPetId && petInfos.length > 0) {
      const firstPetId = petInfos[0]?.petId;
      setSelectedPetId(firstPetId);
      router.replace({ pathname: router.pathname, query: { ...router.query, petId: firstPetId } });
    }
  }, [petInfos, selectedPetId, router]);

  useEffect(() => {
    if (selectedPetId) {
      const selectedPet = petInfos.find((pet) => pet.petId === selectedPetId);
      setSelectedEstimateId(selectedPet?.estimateId);
    }
  }, [selectedPetId, petInfos]);

  const {
    data: estimates,
    isLoading: estimateLoading,
    error: estimateError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = isDesignation
    ? useUserEstimateDesignationGroomingQuery(selectedPetId)
    : useUserEstimateGeneralGroomingQuery(selectedPetId);

  const { loadMoreRef } = useIntersectionLoad({ fetchNextPage, hasNextPage, isFetchingNextPage });

  const flattenedEstimates = isDesignation
    ? estimates?.pages
        .flatMap((page) => page.estimates)
        .filter((estimate): estimate is GetUserEstimateDesignationGroomingList => !!estimate) || []
    : estimates?.pages
        .flatMap((page) => page.estimates)
        .filter((estimate): estimate is GetUserEstimateGeneralGroomingList => !!estimate) || [];

  return (
    <>
      {petLoading ? (
        <div>로딩 중...</div>
      ) : petError ? (
        <div>펫 정보를 불러오는데 실패했습니다.</div>
      ) : petInfos.length === 0 ? (
        <EmptyState
          isEmptyEstimates={false}
          hasOptions={false}
          onClick={() => router.push(ROUTES.ESTIMATE_GROOMING)}
        />
      ) : (
        <>
          <ProfileSelector
            petInfos={petInfos}
            selectedPetId={selectedPetId}
            onSelectPet={(petId) => {
              setSelectedPetId(petId);
              router.push({ pathname: router.pathname, query: { ...router.query, petId } });
            }}
          />
          <OptionSelector estimateId={selectedEstimateId} />
          {estimateLoading ? (
            <div>견적 데이터를 불러오는 중...</div>
          ) : estimateError ? (
            <div>견적 데이터를 불러오는데 실패했습니다.</div>
          ) : flattenedEstimates.length === 0 ? (
            <EmptyState isEmptyEstimates={true} hasOptions={true} />
          ) : (
            <CardList
              mode={isDesignation ? 'designation' : 'general'}
              category="groomer"
              estimateData={flattenedEstimates}
              onCardClick={(id: number) =>
                router.push({
                  pathname: ROUTES.ESTIMATE_DETAIL(id),
                  query: { service: 'groomer', petId: selectedPetId },
                })
              }
            />
          )}
          <div ref={loadMoreRef} css={bottom} />
        </>
      )}
    </>
  );
}
