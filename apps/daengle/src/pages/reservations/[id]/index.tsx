import { AppBar, Layout, RoundButton, Text } from '@daengle/design-system';
import { theme } from '@daengle/design-system';
import { css } from '@emotion/react';
import { PartnersInfo, Receipt } from '~/components/estimate';
import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {
  GetUserReservationCareDetailRequestParams,
  GetUserReservationCareDetailResponse,
  GetUserReservationGroomingDetailRequestParams,
  GetUserReservationGroomingDetailResponse,
} from '~/models/reservation';
import {
  useUserReservationCareDetailQuery,
  useUserReservationGroomingDetailQuery,
} from '~/queries/reservation';
import { ROUTES } from '~/constants/commons';

type DetailData = GetUserReservationGroomingDetailResponse | GetUserReservationCareDetailResponse;

export default function Detail() {
  const router = useRouter();
  const { id, service } = router.query;
  const estimateId = Number(id);

  const isGrooming = service === 'groomer';
  const isCare = service === 'vet';

  const groomingParams: GetUserReservationGroomingDetailRequestParams = {
    estimateId: estimateId,
  };
  const careParams: GetUserReservationCareDetailRequestParams = { estimateId: estimateId };

  const {
    data: groomingData,
    isLoading: groomerLoading,
    error: groomerError,
  } = useUserReservationGroomingDetailQuery(groomingParams, isGrooming);

  const {
    data: careData,
    isLoading: careLoading,
    error: careError,
  } = useUserReservationCareDetailQuery(careParams, isCare);

  if (groomerLoading || careLoading) return <div>Loading...</div>;

  if (groomerError || careError || (!groomingData && !careData)) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

  let detailData: DetailData;
  if (isGrooming && groomingData) {
    detailData = groomingData;
  } else if (isCare && careData) {
    detailData = careData;
  } else {
    return <div>유효하지 않은 type 입니다.</div>;
  }

  const isGroomingDetail = (data: DetailData): data is GetUserReservationGroomingDetailResponse =>
    'groomerId' in data;
  const formattedDate = dayjs(detailData.reservedDate).locale('ko').format('YYYY.MM.DD(ddd) HH:mm');
  const introduction = detailData.introduction || '소개글 없음';

  if (isGroomingDetail(detailData)) {
    const designerData = {
      id: detailData.groomingEstimateId,
      name: detailData.name,
      shopName: detailData.shopName,
      image: detailData.imageUrl,
      daengleMeter: detailData.daengleMeter,
    };

    // TODO: null값에 대한 일괄 처리 필요
    const overallOpinion = detailData.overallOpinion || '없음';

    return (
      <Layout isAppBarExist={false}>
        <AppBar
          backgroundColor={theme.colors.background}
          onBackClick={() => {
            router.back;
          }}
          onHomeClick={() => router.push(ROUTES.HOME)}
        />
        <div css={wrapper}>
          <div css={header}>
            <Text typo="title1">견적 상세</Text>
          </div>
          <PartnersInfo
            profile={designerData}
            onClick={() => router.push(ROUTES.GROOMER_SHOP_DETAIL(detailData.shopId))}
          />
          <section css={section}>
            <Text typo="body1">소개</Text>
            <Text typo="body10" tag="div">
              {introduction}
            </Text>
          </section>
          <Receipt
            items={[
              { title: '지역', receipt: detailData.address },
              { title: '일정', receipt: formattedDate },
              { title: '서비스', receipt: detailData.desiredStyle },
              { title: '추가 소견', receipt: overallOpinion, typo: 'body4' },
            ]}
          />
          <div css={buttonGroup}>
            <RoundButton variant="primary" size="S" fullWidth>
              <Text typo="body1" color="white">
                채팅 문의
              </Text>
            </RoundButton>
            <RoundButton
              variant="primary"
              size="M"
              fullWidth
              onClick={() => alert('예약을 취소하시겠습니까?')}
            >
              <Text typo="body1" color="white">
                예약 취소
              </Text>
            </RoundButton>
          </div>
        </div>
      </Layout>
    );
  } else {
    const vetData = {
      id: detailData.careEstimateId,
      name: detailData.name,
      shopName: null,
      image: detailData.imageUrl,
      daengleMeter: detailData.daengleMeter,
    };
    return (
      <Layout isAppBarExist={false}>
        <AppBar
          backgroundColor={theme.colors.background}
          onBackClick={() => {
            router.back;
          }}
          onHomeClick={() => router.push(ROUTES.HOME)}
        />
        <div css={wrapper}>
          <div css={header}>
            <Text typo="title1">진료 상세</Text>
          </div>
          <PartnersInfo profile={vetData} />
          <section css={section}>
            <Text typo="body1">소개</Text>
            <Text typo="body10" tag="div">
              {introduction}
            </Text>
          </section>
          <Receipt
            items={[
              { title: '지역', receipt: detailData.address },
              { title: '일정', receipt: formattedDate, hasLine: true, addTitle: '종합소견' },
              { title: '추정 병명', receipt: detailData.diagnosis },
              { title: '추정 원인', receipt: detailData.cause },
              {
                title: '예상 진료',
                receipt: detailData.treatment || '내원하여 확인해 주세요.',
                typo: 'body4',
              },
            ]}
          />
          <div css={buttonGroup}>
            <RoundButton variant="primary" size="S" fullWidth>
              <Text typo="body1" color="white">
                채팅 문의
              </Text>
            </RoundButton>
            <RoundButton
              variant="primary"
              size="M"
              fullWidth
              onClick={() => alert('예약을 취소하시겠습니까?')}
            >
              <Text typo="body1" color="white">
                예약 취소
              </Text>
            </RoundButton>
          </div>
        </div>
      </Layout>
    );
  }
}

const wrapper = css`
  padding-top: ${theme.size.appBarHeight};

  background-color: ${theme.colors.background};
`;

const header = css`
  display: flex;
  align-items: center;

  margin: 18px;
`;

const section = css`
  display: flex;
  flex-direction: column;
  gap: 11px;

  margin: 18px 18px 32px;
`;

const buttonGroup = css`
  display: flex;
  justify-content: center;
  gap: 13px;

  margin: 32px 18px 18px;
`;
