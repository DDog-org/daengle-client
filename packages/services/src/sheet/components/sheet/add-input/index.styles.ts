import { css } from '@emotion/react';

const addTitle = css`
  font-size: 14px;
  color: #979797;
  padding: 24px 18px 14px;
`;

const inputSection = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 18px;
  margin-bottom: 16px;
`;

const textarea = css`
  width: 100%;
  min-height: 80px;
  padding: 8px;
  font-size: 14px;
  color: #000000;
  background-color: #f0f0f0;
  border-radius: 10px;
  resize: none;
  outline: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 3px rgba(37, 99, 235, 0.5);
  }
`;

const styles = {
  addTitle,
  inputSection,
  textarea,
};

export default styles;
