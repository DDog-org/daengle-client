import { useState } from 'react';

import {
  Section,
  PetDetails,
  UserProfile,
  AddInput,
  AcceptButton,
  DatePick,
} from '@daengle/services';
import styles from './index.styles';

export default function Sheet() {
  const petData = {
    image: 'https://via.placeholder.com/80',
    name: '꼬미',
    attributes: [
      { label: '나이', value: '13세' },
      { label: '몸무게', value: '중형견' },
      { label: '특이사항', value: '노견, 슬개골 탈구' },
    ],
  };

  const [, setSelectedDateTime] = useState<Date | null>(null);

  const handleDateTimeChange = (dateTime: Date) => {
    setSelectedDateTime(dateTime);
  };

  return (
    <div css={styles.wrapper}>
      <header css={styles.header}>
        <div css={styles.backButton}>{'<'}</div>
      </header>
      <UserProfile userImage="https://via.placeholder.com/50" userName="왈왈" />
      <div css={styles.sectionDivider}></div>
      <div css={styles.requestTitle}>요청상세</div>
      <Section title="지역">서울시 강남구 역삼동</Section>
      <Section title="시술 희망 날짜 및 시간">
        <DatePick onChange={handleDateTimeChange} />
      </Section>
      <Section title="어떤 아이를 가꿀 예정이신가요?">
        <PetDetails image={petData.image} name={petData.name} attributes={petData.attributes} />
      </Section>
      <Section title="원하는 미용">전체 가위컷</Section>
      <Section title="추가 요청사항">없음</Section>
      <div css={styles.sectionDivider}></div>
      <AddInput title="추가 소견" placeholder="추가 안내사항을 입력해주세요." height={120} />
      <AcceptButton label="예약받기" onClick={() => alert('예약 완료!')} />
    </div>
  );
}
