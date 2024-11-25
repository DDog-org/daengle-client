import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './index.styles';
// import NavBar from '../components/NavBar'; // 하단 네비게이션 바 컴포넌트

interface Props {
  profileImage: string;
  name: string;
  type: '일반' | '지정';
  details: string;
  date: string;
}

const sheetData: Props[] = [
  {
    profileImage: 'https://via.placeholder.com/40',
    name: '미꼬누나',
    type: '일반',
    details: '노견, 슬개골 탈구',
    date: '2024. 11. 18(수) · 11:00',
  },
  {
    profileImage: 'https://via.placeholder.com/40',
    name: '꼬미누나',
    type: '지정',
    details: '특이사항 없음',
    date: '2024. 11. 18(수) · 11:00',
  },
  {
    profileImage: 'https://via.placeholder.com/40',
    name: '꼬미누나',
    type: '지정',
    details: '대형견',
    date: '2024. 11. 18(수) · 11:00',
  },
  {
    profileImage: 'https://via.placeholder.com/40',
    name: '꼬미누나',
    type: '일반',
    details: '특이사항 없음',
    date: '2024. 11. 18(수) · 11:00',
  },
  {
    profileImage: 'https://via.placeholder.com/40',
    name: '꼬미누나',
    type: '일반',
    details: '특이사항 없음',
    date: '2024. 11. 18(수) · 11:00',
  },
  {
    profileImage: 'https://via.placeholder.com/40',
    name: '꼬미누나',
    type: '지정',
    details: '특이사항 없음',
    date: '2024. 11. 18(수) · 11:00',
  },
];

export default function SheetList(): JSX.Element {
  const [filterType, setFilterType] = useState<'전체' | '지정'>('전체');

  const filteredData =
    filterType === '전체' ? sheetData : sheetData.filter((data) => data.type === '지정');

  return (
    <div css={styles.wrapper}>
      <header css={styles.headerContainer}>견적</header>
      <div css={styles.tabContainer}>
        <button
          css={[styles.tab, filterType === '전체' && styles.activeTab]}
          onClick={() => setFilterType('전체')}
        >
          전체 견적서
        </button>
        <button
          css={[styles.tab, filterType === '지정' && styles.activeTab]}
          onClick={() => setFilterType('지정')}
        >
          지정 견적서
        </button>
      </div>
      <div css={styles.listContainer}>
        {filteredData.map((data, index) => (
          <SheetCard key={index} {...data} />
          /* API 연동 후 key 고유 id값으로 변경 */
        ))}
      </div>
    </div>
  );
}

function SheetCard({ profileImage, name, type, details, date }: Props): JSX.Element {
  const router = useRouter();

  const handleDetailClick = () => {
    router.push(`/details?name=${encodeURIComponent(name)}`); //임시 경로입니다
  };

  return (
    <div css={styles.card}>
      {/* contentContainer */}
      <div css={styles.contentContainer}>
        {/* Header */}
        <div css={styles.cardHeader}>
          <img src={profileImage} alt={`${name} 프로필`} css={styles.profileImage} />
          <span css={styles.name}>{name}</span>
          <span css={[styles.type, type === '지정' ? styles.designated : styles.general]}>
            {type}
          </span>
        </div>

        {/* Content */}
        <div css={styles.cardContent}>
          <p css={[styles.details, details === '특이사항 없음' && styles.detailsNot]}>{details}</p>
          <p css={styles.date}>{date}</p>
        </div>
      </div>

      {/* detailContainer */}
      <div css={styles.detailContainer}>
        <button css={styles.detailButton} onClick={handleDetailClick}>
          자세히 보기 &gt;
        </button>
      </div>
    </div>
  );
}
