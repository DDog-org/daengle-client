import Image from 'next/image';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { AppBar, Layout, RoundButton, Text, theme } from '@daengle/design-system';
import { VetDefaultImage } from '@daengle/design-system/images';
import {
  ButtonTextButtonArrow,
  DetailCall,
  DetailLocation,
  DetailTime,
  Heart,
  Paw,
  ToolTip,
} from '@daengle/design-system/icons';
import { DAY_OFF, ROUTES } from '~/constants';
import { useGetChatStartQuery, useGetUserVetDetailQuery } from '~/queries';
import { useState } from 'react';
import { GetUserVetDetailResponse } from '~/models';

interface Props {
  vetInfo: GetUserVetDetailResponse;
}

export default function VetInfo({ vetInfo }: Props) {
  const router = useRouter();

  console.log(vetInfo);
  const [isStartChat, setIsStartChat] = useState<boolean>(false);

  const { data: chatStartInfo } = useGetChatStartQuery({
    params: { otherId: Number(vetInfo.vetAccountId) },
    enable: isStartChat,
  });

  return (
    <Layout isAppBarExist={false}>
      <AppBar onBackClick={router.back} onHomeClick={() => router.push(ROUTES.HOME)} />

      <div css={wrapper}>
        <div css={imageSection}>
          {vetInfo?.vetImage ? (
            <img src={vetInfo.vetImage} alt="동물병원 이미지" />
          ) : (
            <VetDefaultImage />
          )}

          <Text typo="title2" color={vetInfo?.vetImage ? 'white' : 'gray700'} css={vetName}>
            {vetInfo?.vetName}
          </Text>

          <div css={tags}>
            {/*  TODO: 뱃지 나오면 연동 */}
            <Text typo="body12" color="white" css={tag}>
              #대형견
            </Text>
            <Text typo="body12" color="white" css={tag}>
              #노견
            </Text>
          </div>
        </div>

        <div css={infoBox}>
          <section css={topSection}>
            <section css={infoSection}>
              <div css={time}>
                <DetailTime width={20} />
                <Text typo="body9">
                  {vetInfo?.closedDay
                    ? `${vetInfo?.startTime?.substring(0, 5)} - ${vetInfo?.endTime?.substring(0, 5)} ${vetInfo?.closedDay
                        .map((day) => DAY_OFF.find((item) => item.value === day)?.label || day)
                        .join(', ')} 휴무`
                    : `매일 ${vetInfo?.startTime?.substring(0, 5)} - ${vetInfo?.endTime?.substring(0, 5)}`}
                </Text>
              </div>
              <div css={call}>
                <DetailCall width={20} />
                <Text typo="body9">{vetInfo?.vetNumber}</Text>
              </div>
              <div css={address}>
                <DetailLocation width={20} />
                <Text typo="body9">{vetInfo?.vetAddress}</Text>
              </div>
            </section>
            <section css={infoText}>
              <Text typo="body1">소개</Text>
              <Text typo="body10">{vetInfo?.introduction}</Text>
            </section>
            <section css={daengleMeter}>
              <div css={textBox}>
                <Text typo="body1">댕글미터</Text>
                <div css={toolTip}>
                  <ToolTip width={14} />
                  <div css={toolTipInfo}>
                    <Text typo="body6">댕글미터란?</Text>
                    <Text typo="body7">
                      댕글미터는 미용사가 강아지를 위해 걸어온 신뢰의 거리입니다. 미용사가 반려견을
                      더 잘 이해하고 배려할수록 거리가 증가합니다. 거리는 미용사의 리뷰와 반려견과의
                      매칭 데이터를 기반으로 계산됩니다.
                    </Text>
                  </div>
                </div>
                <Text typo="body1" color="blue200" css={meter}>
                  {vetInfo?.daengleMeter}m
                </Text>
              </div>
              <div css={graph}>
                <div css={graphBar(vetInfo?.daengleMeter)}>
                  <Heart width={8} height={7} css={heart} />
                </div>
                <Paw width={9} height={7} css={paw} />
              </div>
            </section>
            <div css={button}>
              <RoundButton
                fullWidth={true}
                onClick={() => router.push(ROUTES.ESTIMATES_VET(vetInfo.vetAccountId))}
              >
                바로 예약
              </RoundButton>
              <RoundButton
                fullWidth={true}
                variant="primaryLow"
                onClick={() => {
                  setIsStartChat(true);

                  chatStartInfo?.chatRoomId &&
                    router.push({
                      pathname: ROUTES.CHATS_DETAIL(chatStartInfo?.chatRoomId),
                      query: { otherId: vetInfo.vetAccountId, service: 'vet' },
                    });
                }}
              >
                채팅하기
              </RoundButton>
            </div>
          </section>
          <section css={bottomSection}>
            <div
              css={menu}
              onClick={() =>
                router.push({
                  pathname: ROUTES.VETS_REVIEWS(vetInfo.vetAccountId),
                  query: { otherId: vetInfo.vetAccountId, service: 'vet' },
                })
              }
            >
              <div css={review}>
                <Text typo="subtitle1">받은 리뷰</Text>
                <Text typo="subtitle1">{vetInfo?.reviewCount}</Text>
              </div>
              <ButtonTextButtonArrow width={6} />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { vetId } = context.params;
  const res = await fetch(`${process.env.API_URL}/user/vet/${vetId}`);
  const vetInfo = await res.json();

  return {
    props: {
      vetInfo: vetInfo.response,
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
  height: 416px;

  background: ${theme.colors.gray200};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const vetName = css`
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translate(-50%);
`;

const tags = css`
  display: flex;
  gap: 6px;
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translate(-50%);
`;

const tag = css`
  padding: 4px 12px;
  border: 1px solid ${theme.colors.white};
  border-radius: 14px;
`;

const topSection = css`
  border-bottom: 7px solid ${theme.colors.gray100};

  padding: 32px 18px 0;
`;

const infoBox = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: absolute;
  top: 376px;
  z-index: 2;

  width: 100%;
  border-radius: 20px 20px 0 0;

  background: ${theme.colors.white};
`;

const infoSection = css`
  display: flex;
  flex-direction: column;
  gap: 11px;
  border-bottom: 1px solid ${theme.colors.gray100};
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

const infoText = css`
  display: flex;
  flex-direction: column;
  gap: 11px;

  margin: 24px 0;
`;

const daengleMeter = css`
  display: flex;
  flex-direction: column;
  gap: 15px;

  margin-bottom: 32px;
`;

const textBox = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const meter = css`
  margin-left: 6px;
`;

const graph = css`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 15px;
  border-radius: 10px;

  background-color: ${theme.colors.gray200};
`;

const graphBar = (daengleMeter: number | undefined) => css`
  position: relative;
  z-index: 5px;

  width: ${daengleMeter}%;
  height: 100%;

  background: linear-gradient(0.25turn, ${theme.colors.blue100}, ${theme.colors.blue200});

  transition: width 0.3s ease;

  clip-path: inset(0 0 0 0 round 10px);
`;

const heart = css`
  position: absolute;
  top: 4px;
  right: 6px;
  z-index: 10px;
`;

const paw = css`
  position: absolute;
  top: 4px;
  right: 6px;
  z-index: 1px;

  fill: ${theme.colors.gray600};
`;

const button = css`
  display: flex;
  justify-content: center;
  gap: 13px;

  margin-bottom: 24px;
`;

const toolTip = css`
  display: flex;
  position: relative;

  cursor: pointer;

  &:hover > div {
    opacity: 1;

    visibility: visible;
  }
`;

const toolTipInfo = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: calc(100% + 8px);
  left: 100px;
  transform: translateX(-50%);
  z-index: 2;
  visibility: hidden;

  width: 280px;
  padding: 16px;
  border-radius: 12px;

  background-color: white;
  box-shadow: 0 0 6px rgb(0 0 6 / 10%);

  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
  opacity: 0;
`;

const bottomSection = css`
  padding: 0 18px;
`;

const menu = css`
  display: flex;
  justify-content: space-between;

  padding: 24px 0;

  cursor: pointer;
`;

const review = css`
  display: flex;
  gap: 4px;
`;
