import { AppBar, Empty, Layout, Text, theme } from '@daengle/design-system';
import { DetailCall, DetailLocation, DetailTime } from '@daengle/design-system/icons';
import { ShopDefaultImage } from '@daengle/design-system/images';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import ProfileCard from '~/components/groomers/profile-card';
import { DAY_OFF, ROUTES } from '~/constants';
import { GetUserShopDetailResponse } from '~/models';

interface Props {
  shopInfo: GetUserShopDetailResponse;
}

export default function ShopInfo({ shopInfo }: Props) {
  const router = useRouter();

  const handleCardClick = (id: number) => {
    router.push(ROUTES.GROOMERS_DETAIL(id));
  };

  return (
    <Layout isAppBarExist={false}>
      <AppBar onBackClick={router.back} onHomeClick={() => router.push(ROUTES.HOME)} />

      <div css={wrapper}>
        <div css={imageSection}>
          {shopInfo?.shopImage ? (
            <img src={shopInfo?.shopImage} alt="미용샵 이미지" />
          ) : (
            <ShopDefaultImage />
          )}
          <Text typo="title2" color={shopInfo?.shopImage ? 'white' : 'gray700'} css={shopName}>
            {shopInfo?.shopName}
          </Text>
        </div>

        <div css={infoBox}>
          <section css={topSection}>
            <section css={infoSection}>
              <div css={time}>
                <DetailTime width={20} />
                <Text typo="body9">
                  {shopInfo?.closedDay?.length
                    ? `${shopInfo?.startTime?.substring(0, 5)} - ${shopInfo?.endTime?.substring(0, 5)} ${shopInfo?.closedDay
                        .map((day) => DAY_OFF.find((item) => item.value === day)?.label || day)
                        .join(', ')} 휴무`
                    : `매일 ${shopInfo?.startTime?.substring(0, 5)} - ${shopInfo?.endTime?.substring(0, 5)}`}
                </Text>
              </div>

              {shopInfo?.shopNumber && (
                <div css={call}>
                  <DetailCall width={20} />
                  <Text typo="body9">{shopInfo?.shopNumber}</Text>
                </div>
              )}

              <div css={address}>
                <DetailLocation width={20} />
                <Text typo="body9">{shopInfo?.shopAddress}</Text>
              </div>
            </section>

            <div css={line} />

            <section css={infoText}>
              <Text typo="body1">소개</Text>
              <Text typo="body10">{shopInfo?.introduction}</Text>
            </section>
          </section>

          <section css={bottomSection}>
            <div css={textBox}>
              <Text typo="title2">디자이너</Text>
              <Text typo="title2">{shopInfo?.groomers.length}</Text>
            </div>
            <section css={groomerList}>
              {shopInfo?.groomers.length === 0 ? (
                <div css={emptyBox}>
                  <Empty title="해당 샵에 등록된 디자이너가 없습니다." />
                </div>
              ) : (
                shopInfo?.groomers.map((groomer) => (
                  <ProfileCard
                    key={groomer.groomerAccountId}
                    groomerName={groomer.groomerName}
                    groomerImage={groomer.groomerImage}
                    badges={groomer.badges}
                    daengleMeter={groomer.daengleMeter}
                    onClick={() => handleCardClick(groomer.groomerAccountId)}
                  />
                ))
              )}
            </section>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { shopId } = context.params;
  const res = await fetch(`${process.env.API_URL}/user/shop/${shopId}`);
  const shopInfo = await res.json();

  return {
    props: {
      shopInfo: shopInfo.response,
    },
  };
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 100%;
`;

const imageSection = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;

  width: 100%;
  height: 260px;

  background: ${theme.colors.gray200};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const shopName = css`
  position: absolute;
  bottom: 48px;
  left: 24px;
`;

const infoBox = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: absolute;
  top: 228px;
  z-index: 2;

  width: 100%;
  border-radius: 20px 20px 0 0;

  background: ${theme.colors.white};
`;

const topSection = css`
  padding: 32px 18px 0;

  border-bottom: 7px solid ${theme.colors.gray100};
`;

const infoSection = css`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const time = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const call = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const address = css`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 24px;
`;

const line = css`
  height: 1px;

  background-color: ${theme.colors.gray100};
`;

const infoText = css`
  display: flex;
  flex-direction: column;
  gap: 11px;

  margin-bottom: 32px;
  padding-top: 24px;
`;

const bottomSection = css`
  padding: 24px 18px 0;
`;

const textBox = css`
  display: flex;
  gap: 4px;

  margin-bottom: 9px;
`;

const groomerList = css`
  cursor: pointer;
`;

export const emptyBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  margin-top: 80px;
`;
