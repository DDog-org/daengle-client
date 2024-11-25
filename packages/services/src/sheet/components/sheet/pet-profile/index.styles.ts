import { css } from '@emotion/react';

const wrapper = css`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-top: 3px;
  margin-bottom: 4px;
`;

const profile = css`
  display: flex;
  flex-direction: column;
`;

const image = css`
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #d9d9d9;
`;

const name = css`
  font-size: 16px;
  width: 100%;
  text-align: center;
  margin-top: 10px;
`;

const detail = css`
  display: flex;
  align-items: flex-start; /* 나란히 정렬 */
  flex-direction: row;
  gap: 24px;
  border-left: 2px solid #d9d9d9;
  padding-left: 12px;
`;

const labelWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const valueWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const label = css`
  font-size: 14px;
  color: #979797;
`;

const value = css`
  font-size: 14px;
  color: #000000;
`;

const detailButton = css`
  font-size: 14px;
  color: #d9d9d9;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 3px;
  &:hover {
    text-decoration: underline;
  }
`;

const styles = {
  wrapper,
  profile,
  image,
  name,
  detail,
  labelWrapper,
  valueWrapper,
  label,
  value,
  detailButton,
};

export default styles;
