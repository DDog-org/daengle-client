import { css } from '@emotion/react';

const wrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 18px;
`;

const image = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const name = css`
  font-size: 16px;
  color: #000;
`;

const styles = {
  wrapper,
  image,
  name,
};

export default styles;
