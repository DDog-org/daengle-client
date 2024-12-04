import { useRouter } from 'next/router';
import { Text, RoundButton } from '@daengle/design-system';
import { EmptyStateBone } from '@daengle/design-system/icons';
import { wrapper, emptyButton } from './index.styles';

interface Props {
  hasOptions: boolean;
}

export function EmptyState({ hasOptions }: Props): JSX.Element {
  const router = useRouter();

  return (
    <div css={wrapper(hasOptions)}>
      <EmptyStateBone />
      <Text typo="subtitle3" color="gray400">
        견적을 요청해 보세요!
      </Text>
      <RoundButton
        css={emptyButton}
        size="M"
        variant="primary"
        onClick={() => router.push('/request-estimate')}
      >
        견적 요청하기
      </RoundButton>
    </div>
  );
}