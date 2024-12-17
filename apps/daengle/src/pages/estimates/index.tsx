import { useEffect, useState } from 'react';
import { Layout, Tabs, Text, TextButton } from '@daengle/design-system';
import { BlackUnfoldArrow, SelectUnfoldInactive } from '@daengle/design-system/icons';
import { theme } from '@daengle/design-system';
import { css } from '@emotion/react';
import { GNB } from '~/components/commons';
import { GroomerEstimateList } from '~/components/estimate/groomer-card-list';
import { VetEstimateList } from '~/components/estimate/vet-card-list';
import { useRouter } from 'next/router';

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
export default function EstimateList() {
  const router = useRouter();
  const { service, isDesignation: isDesignationQuery } = router.query;
  const isDesignation = isDesignationQuery === 'true';
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (router.isReady && !service) {
      router.replace({
        pathname: '/estimates',
        query: { service: 'groomer', isDesignation: 'false' },
      });
    }
  }, [router.isReady]);

  const renderContent = (activeTabId: string) => {
    switch (activeTabId) {
      case 'groomer':
        return <GroomerEstimateList isDesignation={isDesignation} />;

      case 'vet':
        return <VetEstimateList isDesignation={isDesignation} />;
      default:
        return <GroomerEstimateList isDesignation={isDesignation} />;
    }
  };

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleTogglePage = (isDesignationPage: boolean) => {
    router.push(
      {
        pathname: '/estimates',
        query: { ...router.query, isDesignation: isDesignationPage.toString() },
      },
      undefined,
      { shallow: true }
    );
    setIsModalOpen(false);
  };

  return (
    <Layout isAppBarExist={false}>
      <div css={wrapper}>
        <div css={headerContainer} onClick={handleModal}>
          <Text typo="title1">{isDesignation ? '바로 예약' : '견적'}</Text>
          <BlackUnfoldArrow width={14} height={8} />
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
        <Tabs tabs={TABS} renderContent={renderContent} />
        <GNB />
      </div>
    </Layout>
  );
}

const wrapper = css`
  min-height: 100%;
  padding-bottom: 104px;

  background-color: ${theme.colors.background};
`;

const headerContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  margin-top: 4px;
  padding: 34px 18px;

  cursor: pointer;
`;

const line = css`
  width: 100%;
  height: 1px;

  background: ${theme.colors.gray100};
`;

const modalItem = (isDesignation: boolean) => css`
  width: 100%;
  border: none;

  color: ${isDesignation ? theme.colors.blue200 : theme.colors.gray400};
  text-align: center;

  cursor: pointer;

  :hover {
    color: ${theme.colors.blue200};
  }
`;

const modalOverlay = css`
  position: fixed;
  inset: 0;

  z-index: 100;

  background: ${theme.colors.grayOpacity300};
`;

const modalContent = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 19px;
  position: fixed;
  bottom: 0;
  z-index: 101;

  width: 100%;
  max-width: ${theme.size.maxWidth};
  padding: 21px 18px;
  border-radius: 20px 20px 0 0;

  background: white;

  animation: slide-up 0.3s ease-in-out;

  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }

    to {
      transform: translateY(0);
    }
  }
`;
