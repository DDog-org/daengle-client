import { useAddressStore } from '~/stores/home';
import { useRouter } from 'next/router';
import { ROUTES } from '~/constants/commons';
import { cardBox, emptyBox, wrapper, tag, bottom, itemBox } from './index.styles';
import { useState } from 'react';
import { GROOMER_SEARCH_TAG, GROOMER_SEARCH_TAG_BUTTON } from '~/constants/search';
import { Item } from '../item';
import { ChipToggleButton, Empty } from '@daengle/design-system';
import { useIntersectionLoad } from '~/hooks';
import { useGetUserSearchGroomerInfiniteQuery } from '~/queries/search';

interface GroomerListProps {
  inputValue: string;
}

export function GroomerList({ inputValue }: GroomerListProps) {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  const params = {
    keyword: inputValue,
    // TODO: 시연 영상 및 테스트 후 address으로 수정
    address: '역삼동',
    tag: selectedTag || '',
    page: 0,
    size: 6,
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetUserSearchGroomerInfiniteQuery(params);
  const { loadMoreRef } = useIntersectionLoad({ fetchNextPage, hasNextPage, isFetchingNextPage });

  const { address } = useAddressStore();

  const handleCardClick = (groomerId: number) => {
    console.log(groomerId);
    router.push(ROUTES.GROOMERS_DETAIL(groomerId));
  };

  const handleTagClick = (tagValue: string) => {
    setSelectedTag((prevTag) => (prevTag === tagValue ? undefined : tagValue));
  };
  return (
    <div css={wrapper}>
      <section css={tag}>
        {GROOMER_SEARCH_TAG_BUTTON.map((item) => {
          return (
            <ChipToggleButton
              key={item.value}
              onClick={() => handleTagClick(item.value)}
              service="tags"
              isTagSelected={selectedTag === item.value}
            >
              {item.label}
            </ChipToggleButton>
          );
        })}
      </section>
      <section css={itemBox}>
        {data ? (
          data?.pages.map((page, index) =>
            page.result.length > 0 || index > 0 ? (
              page.result.map(({ partnerId, partnerImage, partnerName, groomingBadges }) => (
                <div css={cardBox}>
                  <Item
                    key={partnerId}
                    partnerId={partnerId}
                    partnerImage={partnerImage}
                    partnerName={partnerName}
                    badges={groomingBadges
                      .map((tag) => GROOMER_SEARCH_TAG[tag])
                      .filter((tag): tag is string => !!tag)}
                    onClick={(partnerId: number) => {
                      router.push(ROUTES.GROOMERS_DETAIL(partnerId));
                    }}
                  />
                </div>
              ))
            ) : (
              <div css={emptyBox}>
                <Empty title="해당 주소 주변에 샵이 없어요" />
              </div>
            )
          )
        ) : (
          <div css={emptyBox}>
            <Empty title="해당 주소 주변에 샵이 없어요" />
          </div>
        )}
      </section>
      <div ref={loadMoreRef} css={bottom} />
    </div>
  );
}
