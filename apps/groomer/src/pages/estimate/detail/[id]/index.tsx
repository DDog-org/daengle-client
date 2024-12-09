import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { AddInput, PetDetails, Section, UserProfile } from '@daengle/services/components';
import { AppBar, Layout, RoundButton, Text, theme } from '@daengle/design-system';
import { useGetGroomerEstimateDetailQuery, usePostGroomerEstimateMutation } from '~/queries';
import { DatePick } from '~/components/estimate';
import { useRouter } from 'next/router';
import { GetGroomerEstimateDetailParams } from '~/models/estimate';
import { css } from '@emotion/react';
import { QUERY_KEYS } from '~/queries/query-keys';
import { queryClient } from '@daengle/services/providers';

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default function EstimateDetail() {
  const router = useRouter();
  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | string>();
  const [overallOpinion, setOverallOpinion] = useState<string>('');

  const { id } = router.query;
  const groomingEstimateId = Number(id);

  const params: GetGroomerEstimateDetailParams = { id: groomingEstimateId };
  const { data, isLoading, error } = useGetGroomerEstimateDetailQuery(params);

  const mutation = usePostGroomerEstimateMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>데이터를 불러오지 못했습니다.</div>;

  const petData = data || [];
  const significant = petData.significant ?? '없음';

  const petAttributes = [petData.age, petData.weight, significant];
  const isEditable = petData.proposal === 'DESIGNATION';

  const handleDateTimeChange = (dateTime: Dayjs) => {
    setSelectedDateTime(dateTime);
  };

  const handleReservation = () => {
    if (!overallOpinion) {
      alert('추가 요청 사항을 입력해주세요.');
      return;
    }

    const formattedDate = selectedDateTime
      ? formatDate(new Date(selectedDateTime.toString()).toISOString())
      : formatDate(petData.reservedDate);

    if (isEditable && !selectedDateTime) {
      if (!selectedDateTime) {
        alert('날짜를 선택해주세요.');
        return;
      }

      const body = {
        id: groomingEstimateId,
        reservedDate: formattedDate,
        overallOpinion,
      };

      mutation.mutate(body, {
        onSuccess: (data) => {
          if (data.isRegistered) {
            alert('요청 사항이 성공적으로 전송되었습니다.');
          }
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_GROOMER_ESTIMATE_LIST });

          router.back();
        },
        onError: () => {
          alert('요청 사항 전송에 실패했습니다.');
        },
      });
    } else {
      const body = {
        id: groomingEstimateId,
        reservedDate: formattedDate,
        overallOpinion,
      };

      mutation.mutate(body, {
        onSuccess: (data) => {
          if (data.isRegistered) {
            alert('요청 사항이 성공적으로 전송되었습니다.');
          }
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GET_GROOMER_ESTIMATE_LIST });

          router.back();
        },
        onError: () => {
          alert('요청 사항 전송에 실패했습니다.');
        },
      });
    }
  };

  return (
    <Layout>
      <AppBar onBackClick={() => router.back()} />
      <div css={wrapper}>
        <UserProfile userImage={petData.userImage} userName={petData.nickname} />
        <div css={sectionDivider}></div>
        <div css={requestTitle}>
          <Text typo="subtitle1">요청상세</Text>
        </div>
        <Section title="지역">{petData.address}</Section>
        <Section title="시술 희망 날짜 및 시간">
          <DatePick
            onChange={handleDateTimeChange}
            placeholderText={petData.reservedDate}
            isEditable={isEditable}
          />
        </Section>
        <Section title="어떤 아이를 가꿀 예정이신가요?">
          <PetDetails image={petData.petImage} name={petData.name} attributes={petAttributes} />
        </Section>
        <Section title="원하는 미용">{petData.desiredStyle}</Section>
        <Section title="추가 요청사항">{petData.requirements}</Section>
        <div css={sectionDivider}></div>
        <AddInput
          title="안내 사항"
          placeholder="추가 안내사항을 입력해주세요."
          height={120}
          value={overallOpinion}
          onChange={(e) => setOverallOpinion(e.target.value)}
        />
        <div css={button}>
          <RoundButton service="partner" size="L" fullWidth onClick={handleReservation}>
            예약받기
          </RoundButton>
        </div>
      </div>
    </Layout>
  );
}

const wrapper = css`
  height: 100vh;
`;

const sectionDivider = css`
  display: block;

  width: 100%;
  height: 8px;
  margin: 0;

  background-color: ${theme.colors.gray100};
`;

const requestTitle = css`
  padding: 24px 18px;
`;

const button = css`
  padding: 24px 18px;
`;
