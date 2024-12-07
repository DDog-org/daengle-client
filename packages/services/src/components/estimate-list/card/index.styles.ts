import { theme } from '@daengle/design-system';
import { css } from '@emotion/react';

export const wrapper = css`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 20px 24px;
  margin-bottom: 12px;
  background-color: #ffffff;
  border-top-right-radius: 65.6px;
  border-bottom-right-radius: 65.6px;
`;

export const contentContainer = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
`;

export const detailContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
`;

export const cardHeader = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const cardContent = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const profileImage = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

export const type = css`
  padding: 2px 7px;
  border-radius: 14.03px;
  ${theme.typo.body2};
`;

export const general = css`
  background-color: ${theme.colors.green100};
  color: ${theme.colors.green200};
  border: ${theme.colors.green200} solid 0.5px;
`;

export const designated = css`
  background-color: ${theme.colors.yellow100};
  color: ${theme.colors.yellow200};
  border: ${theme.colors.yellow200} solid 0.5px;
`;

export const specials = css`
  ${theme.typo.subtitle1};
  margin: 0;
`;

export const specialsNot = css`
  ${theme.typo.subtitle1};
  color: ${theme.colors.gray200};
`;
