import { useState } from 'react';
import { Section, PetDetails, UserProfile, AddInput, DatePick } from '@daengle/services/estimate';

import { AppBar, Layout, RoundButton, Text } from '@daengle/design-system';
import { wrapper, sectionDivider, requestTitle, button } from './index.styles';
import { useGroomerEstimateDetailQuery } from '~/queries';

export default function EstimateDetail({ id }: { id: number }) {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | string>();
  const [overallOpinion, setOverallOpinion] = useState<string>('');
  const validId = id || 1;
  const { data, isLoading, error } = useGroomerEstimateDetailQuery(validId);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>데이터를 불러오지 못했습니다.</div>;

  const petData = data || [];
  const petAttributes = [petData.birth, petData.weight, petData.significant];

  const handleDateTimeChange = (dateTime: Date) => {
    setSelectedDateTime(dateTime);
  };

  const handleReservation = () => {
    if (!selectedDateTime || !overallOpinion) {
      alert('날짜와 요청 사항을 입력해주세요.');
      return;
    }
  };

  return (
    <Layout>
      <div css={wrapper}>
        <AppBar />
        <UserProfile userImage={petData.userImage} userName={petData.nickname} />
        <div css={sectionDivider}></div>
        <div css={requestTitle}>
          <Text typo="subtitle1">요청상세</Text>
        </div>
        <Section title="지역">{petData.address}</Section>
        <Section title="시술 희망 날짜 및 시간">
          <DatePick onChange={handleDateTimeChange} placeholderText={petData.reservedDate} />
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
          <RoundButton variant="green" size="L" fullWidth onClick={handleReservation}>
            예약받기
          </RoundButton>
        </div>
      </div>
    </Layout>
  );
}
