import { useState } from 'react';
import { useRouter } from 'next/router';
import { EmptyState, Tab } from '@daengle/services/components';
import { GNB, Layout, Text, TextButton } from '@daengle/design-system';
import {
  GnbChattingActive,
  GnbChattingInactive,
  GnbHomeActive,
  GnbHomeInactive,
  GnbMyActive,
  GnbMyInactive,
  GnbReservationActive,
  GnbReservationInactive,
  GnbEstimateActive,
  GnbEstimateInactive,
  SelectUnfoldInactive,
} from '@daengle/design-system/icons';
import {
  wrapper,
  headerContainer,
  modalOverlay,
  modalContent,
  line,
  modalItem,
} from './index.styles';
import { useDaengleEstimateListQuery } from '~/queries';
import { CardList, OptionSelector, ProfileSelector } from '~/components/estimate';

export const PATHS = {
  ESTIMATE: '/estimate-list',
  RESERVATION: '/reservation',
  HOME: '/',
  CHATTING: '/chatting',
  MYPAGE: '/mypage',
} as const;

export const MENUS = [
  {
    name: '견적',
    icon: {
      active: <GnbEstimateActive width="32px" height="32px" />,
      inactive: <GnbEstimateInactive width="32px" height="32px" />,
    },
    path: PATHS.ESTIMATE,
  },
  {
    name: '예약',
    icon: {
      active: <GnbReservationActive width="32px" height="32px" />,
      inactive: <GnbReservationInactive width="32px" height="32px" />,
    },
    path: PATHS.RESERVATION,
  },
  {
    name: '홈',
    icon: {
      active: <GnbHomeActive width="32px" height="32px" />,
      inactive: <GnbHomeInactive width="32px" height="32px" />,
    },
    path: PATHS.HOME,
  },
  {
    name: '채팅',
    icon: {
      active: <GnbChattingActive width="32px" height="32px" />,
      inactive: <GnbChattingInactive width="32px" height="32px" />,
    },
    path: PATHS.CHATTING,
  },
  {
    name: '마이',
    icon: {
      active: <GnbMyActive width="32px" height="32px" />,
      inactive: <GnbMyInactive width="32px" height="32px" />,
    },
    path: PATHS.MYPAGE,
  },
];

export default function EstimateList() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('미용사');
  const [isDesignation, setIsDesignation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetIndex, setSelectedPetIndex] = useState(0);
  const { data, isLoading, error } = useDaengleEstimateListQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>에러가 발생했습니다.</div>;

  const cardData = data || [];

  const selectedPet = cardData?.petInfos?.[selectedPetIndex];
  const type = activeTab === '미용사' ? 'grooming' : 'care';
  const estimateData = selectedPet
    ? (() => {
        const groomingData =
          selectedPet?.groomingEstimates
            ?.filter((item) => (isDesignation ? item.proposal === 'DESIGNATION' : true))
            .map((item) => ({
              ...item,
              id: item.groomingEstimateId,
            })) || [];

        const careData =
          selectedPet?.careEstimates
            ?.filter((item) => (isDesignation ? item.proposal === 'DESIGNATION' : true))
            .map((item) => ({
              ...item,
              id: item.careEstimateId,
            })) || [];

        return activeTab === '미용사' ? groomingData : careData;
      })()
    : [];

  const petInfos = cardData?.petInfos || [];
  const hasOptions = !!(
    cardData?.petInfos &&
    cardData.petInfos.length > 0 &&
    cardData.petInfos.some(
      (petInfo) =>
        (petInfo.groomingEstimates && petInfo.groomingEstimates.length > 0) ||
        (petInfo.careEstimates && petInfo.careEstimates.length > 0)
    )
  );

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTogglePage = (isDesignationPage: boolean) => {
    setIsDesignation(isDesignationPage);
    handleModal();
  };
  const handleNavigate = (path: string) => {
    // 임시 경로
    router.push(path);
  };

  const handleCardClick = (itemId: number) => {
    router.push(`/estimate/detail/${itemId}?type=${type}`);
  };

  return (
    <Layout isAppBarExist={false}>
      <div css={wrapper}>
        <div css={headerContainer} onClick={handleModal}>
          <Text typo="title1">{isDesignation ? '바로 예약' : '견적'}</Text>
          <SelectUnfoldInactive width="14px" height="8px" color="black" />
        </div>
        {isModalOpen && (
          <>
            <div css={modalOverlay} onClick={handleModal}></div>
            <div css={modalContent}>
              <TextButton onClick={() => handleTogglePage(false)}>
                <Text typo="subtitle1" css={modalItem(isDesignation === false)}>
                  견적
                </Text>
              </TextButton>
              <div css={line}></div>
              <TextButton onClick={() => handleTogglePage(true)}>
                <Text typo="subtitle1" css={modalItem(isDesignation === true)}>
                  바로 예약
                </Text>
              </TextButton>
            </div>
          </>
        )}
        <Tab items={['미용사', '병원']} activeItem={activeTab} onChange={handleTabChange} />
        {estimateData && estimateData.length > 0 ? (
          <>
            <ProfileSelector
              petInfos={petInfos}
              selectedPetIndex={selectedPetIndex}
              onSelectPet={setSelectedPetIndex}
            />
            <OptionSelector />
            <CardList
              estimateData={estimateData}
              isDesignation={isDesignation}
              onCardClick={handleCardClick}
            />
          </>
        ) : (
          <EmptyState />
        )}
        <GNB menus={MENUS} activePath={PATHS.ESTIMATE} onNavigate={handleNavigate} />
      </div>
    </Layout>
  );
}