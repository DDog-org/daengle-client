import { useRouter } from 'next/router';
import { ROUTES } from '~/constants/commons';
import { Card } from '~/components/mypage';
import { Empty } from '~/components/reviews';
import { useIntersectionLoad } from '~/hooks/review';
import {
  deleteUserCareReviewMutation,
  getUserCareMyReviewListInfiniteQuery,
} from '~/queries/review';
import { bottom, wrapper } from './index.styles';

export function VetCardList() {
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    getUserCareMyReviewListInfiniteQuery();
  const { mutateAsync: deleteUserCareReview } = deleteUserCareReviewMutation();

  const { loadMoreRef } = useIntersectionLoad({ fetchNextPage, hasNextPage, isFetchingNextPage });

  return (
    <div css={wrapper}>
      {data?.pages.map((page) =>
        page.reviewCount > 0 ? (
          page.reviewList.map(
            ({
              careReviewId,
              vetId,
              careKeywordReviewList,
              revieweeName,
              starRating,
              content,
              imageUrlList,
            }) => (
              <Card
                reviewId={careReviewId}
                revieweeId={vetId}
                keywordReviewList={careKeywordReviewList}
                revieweeName={revieweeName}
                starRating={starRating}
                content={content}
                imageUrlList={imageUrlList}
                onRevieweeNameClick={() => router.push(ROUTES.VET_DETAIL(vetId))}
                onDelete={() => deleteUserCareReview({ reviewId: careReviewId })}
                onEdit={() => router.push(ROUTES.VET_REVIEW_FORM_EDIT(careReviewId))}
              />
            )
          )
        ) : (
          <Empty title="작성한 리뷰가 없어요" actionLabel="리뷰 작성하기" />
        )
      )}

      <div ref={loadMoreRef} css={bottom} />
    </div>
  );
}