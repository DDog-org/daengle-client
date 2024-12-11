import { css } from '@emotion/react';
import { theme } from '../../../foundation';

export const wrapper = css`
  overflow-y: hidden;

  width: 100%;
  height: 100%;
  padding-bottom: 18px;
`;

export const tabHeader = css`
  display: flex;

  border-bottom: 0.5px solid ${theme.colors.gray300};

  cursor: pointer;
`;

export const tabContent = css`
  flex: 1;
  position: relative;
  overflow: hidden;
  overflow-y: auto;

  width: 100%;
  height: 100%;
`;

export const tabContentItem = css`
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;
  padding: 14px 18px;
`;
