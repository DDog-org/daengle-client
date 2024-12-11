import { useState } from 'react';
import Image from 'next/image';
import { Rating, Text } from '@daengle/design-system';
import { DefaultProfile, ReviewFold, ReviewUnfold } from '@daengle/design-system/icons';
import {
  clampText,
  reviewerInfo,
  imageWrapper,
  tagsWrapper,
  tagWrapper,
  wrapper,
  top,
} from './index.styles';

interface Props {
  reviewId: number;
  reviewerName: string;
  reviewerImageUrl: string | null;
  keywordReviewList: string[];
  starRating: 1 | 2 | 3 | 4 | 5;
  content: string | null;
  imageUrlList: string[] | null;
}

export function Card({
  keywordReviewList,
  reviewerName,
  reviewerImageUrl,
  starRating,
  content,
  imageUrlList,
}: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div css={wrapper}>
      <div css={top}>
        <div css={reviewerInfo}>
          {reviewerImageUrl ? (
            <Image
              src={reviewerImageUrl}
              alt="리뷰 작성자 이미지"
              width={33}
              height={33}
              objectFit="cover"
            />
          ) : (
            <DefaultProfile width={33} height={33} />
          )}
          <Text typo="subtitle1" color="black">
            {reviewerName}
          </Text>
        </div>
        <Rating rate={starRating} />
      </div>

      {imageUrlList && imageUrlList?.length && (
        <div css={imageWrapper}>
          {imageUrlList?.map((url) => (
            <Image src={url} alt="리뷰 이미지" width={101} height={101} />
          ))}
        </div>
      )}

      <div css={tagsWrapper}>
        {keywordReviewList.length > 0 &&
          keywordReviewList.map((tag) => (
            <div css={tagWrapper}>
              <Text typo="body12" color="blue200">
                {`#${tag}`}
              </Text>
            </div>
          ))}
      </div>

      {content && (
        <>
          <Text tag="p" typo="body11" color="black" css={!isExpanded && clampText}>
            {content}
          </Text>

          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ReviewFold width="6px" /> : <ReviewUnfold width="6px" />}
          </button>
        </>
      )}
    </div>
  );
}
