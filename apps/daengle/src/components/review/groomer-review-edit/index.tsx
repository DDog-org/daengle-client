import { useState, useEffect } from 'react';
import { AppBar, Layout, Text, RoundButton, theme } from '@daengle/design-system';
import { KeywordCard, PartnersCard, RatingCard, ReviewInputCard } from '~/components/review';
import {
  useGetUserGroomingReviewQuery,
  usePatchUserGroomingReviewMutation,
} from '~/queries/review';
import { useRouter } from 'next/router';
import { useS3 } from '@daengle/services/hooks';
import { GetUserGroomingReviewParams, PatchUserGroomingReviewRequestBody } from '~/models/review';
import { QUERY_KEYS } from '~/queries/query-keys';
import { queryClient } from '@daengle/services/providers';
import { GROOMER_REVIEW_KEYWORDS } from '~/constants/review';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { container, header, submitButton, wrapper } from './index.styles';
import { ROUTES } from '~/constants/commons';

const KEYWORDS = Object.values(GROOMER_REVIEW_KEYWORDS);

export function GroomerReviewEdit() {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const router = useRouter();
  const { id } = router.query;
  const reviewId = Number(id);

  const params: GetUserGroomingReviewParams = { reviewId: reviewId };

  const { data, isLoading, error } = useGetUserGroomingReviewQuery(params);
  const reservationId = data?.reservationId || 0;
  const groomerId = data?.groomerId || 0;

  const { mutate: patchReview } = usePatchUserGroomingReviewMutation();
  const { uploadToS3 } = useS3({ targetFolderPath: 'user/review-images' });

  useEffect(() => {
    if (data) {
      const convertUrlsToFiles = async () => {
        const filePromises = data.imageUrlList.map(async (url) => {
          const response = await fetch(url);
          const blob = await response.blob();
          const filename = url.split('/').pop() || 'uploaded-image';
          return new File([blob], filename, { type: blob.type });
        });

        const files = await Promise.all(filePromises);
        setSelectedImages(files);
      };

      convertUrlsToFiles();
      setRating(data.starRating);
      setReviewText(data.content);
      setSelectedTags(
        data.groomingKeywordList.map((keyword) => GROOMER_REVIEW_KEYWORDS[keyword] || keyword)
      );
    }
  }, [data]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!rating || !reviewText) {
      alert('별점과 리뷰 내용을 입력해주세요.');
      return;
    }

    let uploadedImageUrls: string[] = [];

    if (selectedImages.length > 0) {
      const newImageUrls = await uploadToS3(selectedImages);
      if (!newImageUrls) {
        alert('이미지 업로드에 실패했습니다.');
        return;
      }
      uploadedImageUrls = newImageUrls;
    }

    const handleError = (error: any) => {
      console.log('Error 객체:', error);

      const { code, message } = error;

      if (code === 4000) {
        alert(`${message}는 등록할 수 없는 단어입니다!`);
      } else {
        alert(`리뷰 등록에 실패했습니다. 에러 메시지: ${message}`);
      }
    };

    const body: PatchUserGroomingReviewRequestBody = {
      reservationId,
      starRating: rating,
      groomingKeywordList: selectedTags.map(
        (tag) =>
          Object.entries(GROOMER_REVIEW_KEYWORDS).find(([, value]) => value === tag)?.[0] || ''
      ),
      content: reviewText,
      imageUrlList: uploadedImageUrls,
    };

    patchReview(
      { reviewId, body },
      {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: QUERY_KEYS.GET_USER_GROOMING_REVIEW });

          alert('리뷰가 성공적으로 수정되었습니다!');
          router.push(ROUTES.GROOMER_REVIEWS(groomerId));
        },
        onError: handleError,
      }
    );
  };

  return (
    <Layout>
      <AppBar backgroundColor={theme.colors.background} />
      <div css={wrapper}>
        <div css={header}>
          <Text typo="title1">{data?.shopName || '알 수 없음'}</Text>
        </div>
        <div css={container}>
          {isLoading ? (
            <Text typo="body11">로딩 중...</Text>
          ) : error ? (
            <Text typo="body11">리뷰 데이터를 불러오는 데 실패했습니다.</Text>
          ) : (
            <>
              <PartnersCard
                partnerName={data?.revieweeName || '알 수 없음'}
                shopName={data?.shopName || '알 수 없음'}
                schedule={dayjs(data?.schedule).locale('ko').format('YYYY.MM.DD(ddd) • HH:mm')}
              />

              <RatingCard rating={rating} onRatingChange={setRating} />

              <KeywordCard
                tags={KEYWORDS}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
                isExpanded={isExpanded}
                toggleExpand={toggleExpand}
              />

              <ReviewInputCard
                reviewText={reviewText}
                setReviewText={setReviewText}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            </>
          )}
        </div>

        <div css={submitButton}>
          <RoundButton
            service="daengle"
            size="L"
            fullWidth
            onClick={handleSubmit}
            disabled={!rating || !reviewText || selectedTags.length === 0}
          >
            리뷰 수정하기
          </RoundButton>
        </div>
      </div>
    </Layout>
  );
}
