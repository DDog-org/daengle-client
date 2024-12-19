import { DefaultProfile } from '@daengle/design-system/icons';
import { Tag, Text } from '@daengle/design-system';

import Image from 'next/image';
import { imageStyle, wrapper, profileWrapper, DetailsWrapper, opacity, tags } from './index.styles';
import { Result } from '~/interfaces/search';

interface Props {
  partnerId: number;
  partnerImage: string;
  partnerName: string;
  badges: string[];
  onClick: (partnerId: number) => void;
}

export function Item({ partnerId, partnerImage, partnerName, badges, onClick }: Props) {
  return (
    <div css={wrapper} onClick={() => onClick(partnerId)}>
      {!partnerId ? (
        <>
          <DefaultProfile width={170} height={200} css={imageStyle} />
          <div css={DetailsWrapper}>
            <Text typo="subtitle1" color="white">
              {partnerName}
            </Text>
            <div css={tags}>
              {badges?.map((hashTag, index) => (
                <Tag key={index} service="search" variant="line">
                  #{hashTag}
                </Tag>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div css={profileWrapper}>
          <div css={opacity} />
          <Image src={partnerImage} alt="프로필 이미지" width={170} height={200} css={imageStyle} />
          <div css={DetailsWrapper}>
            <Text typo="subtitle1" color="white">
              {partnerName}
            </Text>
            <div css={tags}>
              {badges.map((hashTag, index) => (
                <Tag key={index} service="search" variant="line">
                  #{hashTag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
