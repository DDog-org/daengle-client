import { useRouter } from 'next/router';
import { TextButton, Text } from '@daengle/design-system';
import { wrapper } from './index.styles';
import { ROUTES } from '~/constants/commons';

interface Props {
  estimateId: number | undefined;
}

export function OptionSelector({ estimateId }: Props): JSX.Element {
  const router = useRouter();
  const { service } = router.query;

  return (
    <div css={wrapper}>
      <TextButton
        onClick={() =>
          router.push({
            pathname: ROUTES.ESTIMATES_REQUEST(estimateId || 0),
            query: { service },
          })
        }
        disabled={!estimateId}
      >
        <Text typo="body4" color="gray500">
          내가 보낸 요청
        </Text>
      </TextButton>
    </div>
  );
}
