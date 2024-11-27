import { css } from '@emotion/react';

export const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const container = css`
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`;
export const profileImageWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px 0 40px;
`;
export const profileEditButtonBox = css`
  margin-top: 12px;
  font-size: 14px;
  color: #bebebe;
`;
export const inputWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 0 0 159px;
`;
export const nickNameWrapper = css`
  display: flex;
  align-items: flex-end;
`;
export const editButtonBox = css`
  margin: 0 0 18px;
`;
export const duplicateButtonBox = css`
  width: 59px;
  height: 30px;
  border: 1px solid black;
  border-radius: 15px;
  font-size: 10px;
`;
