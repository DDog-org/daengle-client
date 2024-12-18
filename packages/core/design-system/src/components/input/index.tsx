import { forwardRef, InputHTMLAttributes, ReactNode, useImperativeHandle, useRef } from 'react';
import { input, wrapper, label as labelCss, infoTextWrapper, inputWrapper } from './index.styles';
import { Service } from '../../types';
import { Text } from '../text';

export interface InputRef {
  focus: () => void;
}

export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> {
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  confirmMessage?: string;
  errorMessage?: string;
  service?: Service;
}

export const Input = forwardRef<InputRef, Props>(
  (
    {
      type = 'text',
      label,
      disabled,
      spellCheck = false,
      autoComplete = 'off',
      prefix,
      suffix,
      confirmMessage,
      errorMessage,
      required,
      service = 'daengle',
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as InputRef);

    return (
      <div css={wrapper}>
        {label && (
          <>
            <Text typo="subtitle3" css={labelCss}>
              {label}{' '}
              {required && (
                <Text typo="body12" color={service === 'daengle' ? 'blue200' : 'green200'}>
                  *
                </Text>
              )}
            </Text>
          </>
        )}

        <div css={inputWrapper}>
          {prefix && prefix}
          <input
            ref={inputRef}
            type={type}
            spellCheck={spellCheck}
            autoComplete={autoComplete}
            disabled={disabled}
            css={input({ service, errorMessage })}
            {...props}
          />
          {suffix && suffix}
        </div>

        {!errorMessage && confirmMessage && (
          <div css={infoTextWrapper}>
            <Text typo="body12" color="blue200">
              {confirmMessage}
            </Text>
          </div>
        )}

        {errorMessage && (
          <div css={infoTextWrapper}>
            <Text typo="body12" color="red200">
              {errorMessage}
            </Text>
          </div>
        )}
      </div>
    );
  }
);
