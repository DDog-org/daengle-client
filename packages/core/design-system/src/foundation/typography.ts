import { css } from '@emotion/react';

// TODO: 변수명 변경
const typography = {
  title1: css`
    font-size: 24px;
    font-weight: 600;
  `,
  title2: css`
    font-size: 20px;
    font-weight: 600;
  `,

  subtitle1: css`
    font-size: 16px;
    font-weight: 600;
  `,
  subtitle2: css`
    font-size: 15px;
    font-weight: 600;
  `,
  subtitle3: css`
    font-size: 16px;
    font-weight: 500;
  `,

  body1: css`
    font-size: 14px;
    font-weight: 600;
  `,
  body2: css`
    font-size: 9px;
    font-weight: 600;
  `,
  body3: css`
    font-size: 18px;
    font-weight: 500;
  `,
  body4: css`
    font-size: 14px;
    font-weight: 500;
  `,
  body5: css`
    font-size: 12px;
    font-weight: 500;
  `,
  body6: css`
    font-size: 11px;
    font-weight: 500;
  `,
  body7: css`
    font-size: 10px;
    font-weight: 500;
  `,
  body8: css`
    font-size: 16px;
    font-weight: 400;
  `,
  body9: css`
    font-size: 14px;
    font-weight: 400;
  `,
  body10: css`
    font-size: 13px;
    font-weight: 400;
  `,
  body11: css`
    font-size: 12px;
    font-weight: 400;
  `,
  body12: css`
    font-size: 10px;
    font-weight: 400;
  `,
} as const;

export default typography;
