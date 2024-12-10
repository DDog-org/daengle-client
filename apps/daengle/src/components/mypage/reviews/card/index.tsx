import { CapsuleButton, Rating, Text, TextButton } from '@daengle/design-system';
import {
  buttonWrapper,
  clampText,
  groomerInfo,
  groomerText,
  imageWrapper,
  tag,
  tagWrapper,
  top,
  wrapper,
} from './index.styles';
import { ButtonTextButtonArrow, ReviewFold, ReviewUnfold } from '@daengle/design-system/icons';
import Image from 'next/image';
import { useState } from 'react';

export function Card() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div css={wrapper}>
      <div css={top}>
        <div css={groomerInfo}>
          <div css={groomerText}>
            <Text typo="subtitle2" color="black">{`문소연 디자이너`}</Text>
            <ButtonTextButtonArrow width="6px" />
          </div>

          <Rating rate={4} />
        </div>
        <div css={buttonWrapper}>
          <CapsuleButton>수정하기</CapsuleButton>
          <CapsuleButton>삭제하기</CapsuleButton>
        </div>
      </div>

      <div css={imageWrapper}>
        <Image
          src="https://i.namu.wiki/i/v3XjJuiyfmU9GIKiSxmuoEWvhQrdM-svxus1JFKnWRGA1Z9acCv3Wd3Ijfz08QeLi5s7XH-Co2JCOCqlBBbjaA.webp"
          alt="리뷰 이미지"
          width={101}
          height={101}
        />
        <Image
          src="https://i.namu.wiki/i/v3XjJuiyfmU9GIKiSxmuoEWvhQrdM-svxus1JFKnWRGA1Z9acCv3Wd3Ijfz08QeLi5s7XH-Co2JCOCqlBBbjaA.webp"
          alt="리뷰 이미지"
          width={101}
          height={101}
        />
        <Image
          src="https://i.namu.wiki/i/v3XjJuiyfmU9GIKiSxmuoEWvhQrdM-svxus1JFKnWRGA1Z9acCv3Wd3Ijfz08QeLi5s7XH-Co2JCOCqlBBbjaA.webp"
          alt="리뷰 이미지"
          width={101}
          height={101}
        />
        <Image
          src="https://i.namu.wiki/i/v3XjJuiyfmU9GIKiSxmuoEWvhQrdM-svxus1JFKnWRGA1Z9acCv3Wd3Ijfz08QeLi5s7XH-Co2JCOCqlBBbjaA.webp"
          alt="리뷰 이미지"
          width={101}
          height={101}
        />
        <Image
          src="https://i.namu.wiki/i/v3XjJuiyfmU9GIKiSxmuoEWvhQrdM-svxus1JFKnWRGA1Z9acCv3Wd3Ijfz08QeLi5s7XH-Co2JCOCqlBBbjaA.webp"
          alt="리뷰 이미지"
          width={101}
          height={101}
        />
        <Image
          src="https://i.namu.wiki/i/v3XjJuiyfmU9GIKiSxmuoEWvhQrdM-svxus1JFKnWRGA1Z9acCv3Wd3Ijfz08QeLi5s7XH-Co2JCOCqlBBbjaA.webp"
          alt="리뷰 이미지"
          width={101}
          height={101}
        />
        <Image
          src="https://i.namu.wiki/i/v3XjJuiyfmU9GIKiSxmuoEWvhQrdM-svxus1JFKnWRGA1Z9acCv3Wd3Ijfz08QeLi5s7XH-Co2JCOCqlBBbjaA.webp"
          alt="리뷰 이미지"
          width={101}
          height={101}
        />
        <Image
          src="https://i.namu.wiki/i/v3XjJuiyfmU9GIKiSxmuoEWvhQrdM-svxus1JFKnWRGA1Z9acCv3Wd3Ijfz08QeLi5s7XH-Co2JCOCqlBBbjaA.webp"
          alt="리뷰 이미지"
          width={101}
          height={101}
        />
      </div>

      <div css={tagWrapper}>
        <div css={tag}>
          <Text typo="body2" color="blue200">{`#맞춤케어를 잘해줘요`}</Text>
        </div>
        <div css={tag}>
          <Text typo="body2" color="blue200">{`#맞춤케어를 잘해줘요`}</Text>
        </div>
        <div css={tag}>
          <Text typo="body2" color="blue200">{`#맞춤케어를 잘해줘요`}</Text>
        </div>
      </div>

      <Text
        tag="p"
        typo="body11"
        color="black"
        css={!isExpanded && clampText}
      >{`디자이너 최고 어쩌고 저쩌고 정말 마음에 들어요
앞으로 여기에 정착할거에요~!~! ...디자이너 최고 어쩌고 저쩌고 정말 마음에 들어요
앞으로 여기에 정착할거에요~!~! ...디자이너 최고 어쩌고 저쩌고 정말 마음에 들어요
앞으로 여기에 정착할거에요~!~! ...디자이너 최고 어쩌고 저쩌고 정말 마음에 들어요
앞으로 여기에 정착할거에요~!~! ...`}</Text>

      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <ReviewFold width="6px" /> : <ReviewUnfold width="6px" />}
      </button>
    </div>
  );
}
