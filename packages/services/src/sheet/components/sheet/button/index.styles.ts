import { css } from '@emotion/react';

const acceptButton = css`
  background-color: #d9d9d9;
  width: 100%;
  color: #000000;
  font-size: 14px;
  font-weight: 600;
  padding: 16px 0px;
  border: none;
  border-radius: 24px;
  cursor: pointer;

  &:hover {
    background-color: #000000;
    color: white;
  }
`;

const styles = {
  acceptButton,
};

export default styles;
