import { css } from '@emotion/react';
import { AppBar, Layout, Tabs, Text, theme } from '@daengle/design-system';
import { GroomerCardList, VetCardList } from '~/components/mypage';

const TABS = [
  {
    id: 'groomer',
    label: '미용사',
  },
  {
    id: 'vet',
    label: '병원',
  },
];

export default function Reviews() {
  const renderContent = (activeTabId: string) => {
    switch (activeTabId) {
      case 'groomer':
        return <GroomerCardList />;
      case 'vet':
        return <VetCardList />;
      default:
        return <GroomerCardList />;
    }
  };

  return (
    <Layout isAppBarExist={false}>
      <AppBar />
      <section css={wrapper}>
        <Text tag="h1" typo="title1" color="black">
          내가 쓴 리뷰
        </Text>

        <div css={content}>
          <Tabs tabs={TABS} renderContent={renderContent} />
        </div>
      </section>
    </Layout>
  );
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: calc(${theme.size.appBarHeight} + 18px) 0 0 0;

  background: ${theme.colors.background};

  h1 {
    margin: 0 18px;
  }
`;

const content = css`
  width: 100%;
  height: 100%;
  margin: 34px 0 0;
`;