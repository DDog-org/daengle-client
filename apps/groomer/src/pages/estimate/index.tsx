import { useState } from 'react';
import { useGetGroomerEstimateListQuery } from '~/queries';
import { Tab, Card } from '@daengle/services/components';
import { GNB, Layout, Text, theme } from '@daengle/design-system';
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
} from '@daengle/design-system/icons';
import { css } from '@emotion/react';

export const PATHS = {
  ESTIMATE: '/estimate',
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

export default function EstimateList(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('전체');
  const { data, isLoading, isError } = useGetGroomerEstimateListQuery();
  const [, setActivePath] = useState<string>(PATHS.ESTIMATE);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>데이터를 가져오는 데 실패했습니다.</div>;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const estimateData = data || [];
  const filteredData =
    activeTab === '전체'
      ? estimateData
      : estimateData.filter((data) => data.proposal === 'DESIGNATION');

  return (
    <Layout isAppBarExist={false}>
      <div css={wrapper}>
        <header css={headerContainer}>
          <Text typo="title1">견적</Text>
        </header>
        <Tab items={['전체', '지정']} activeItem={activeTab} onChange={handleTabChange} />
        <div css={listContainer}>
          {filteredData.map((data) => (
            <Card key={data.id} {...data} />
          ))}
        </div>
      </div>
      <GNB menus={MENUS} activePath={PATHS.ESTIMATE} onNavigate={(path) => setActivePath(path)} />
    </Layout>
  );
}

const wrapper = css`
  height: 100vh;
  padding-bottom: 104px;

  background-color: ${theme.colors.background};
`;

const headerContainer = css`
  margin-top: 20px;
  padding: 18px;
`;

const listContainer = css`
  flex: 1;
  overflow-y: auto;

  padding: 18px 18px 104px 0;

  background-color: ${theme.colors.background};
`;
