import { Text } from '@daengle/design-system';
import { addTitle, inputSection, textarea } from './index.styles';

interface Props {
  title: string;
  placeholder: string;
  height?: number;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function AddInput({ title, placeholder, height, value, onChange }: Props): JSX.Element {
  return (
    <div>
      <div css={addTitle}>
        <Text typo="body4" color="gray400">
          {title}
        </Text>
      </div>
      <section css={inputSection}>
        <textarea
          css={[textarea, height && { minHeight: `${height}px` }]}
          placeholder={placeholder}
          maxLength={400}
          value={value}
          onChange={onChange}
        />
      </section>
    </div>
  );
}
