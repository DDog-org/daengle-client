import { css } from '@emotion/react';

const wrapper = css`
  display: flex;
  flex-direction: column;
  padding: 8px 18px;
  margin-bottom: 16px;
  gap: 14px;
`;

const requestTitle = css`
  padding: 24px 18px;
  font-size: 16px;
  font-weight: 600;
`;

const title = css`
  font-size: 14px;
  color: #979797;
`;

const content = css`
  font-size: 16px;
  color: #000000;
  margin-left: 2px;
`;

const styles = {
  wrapper,
  requestTitle,
  title,
  content,
};

export default styles;
