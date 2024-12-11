import { css } from '@emotion/react';
import { theme } from '../../foundation';

export const wrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  z-index: ${theme.zIndex.gnb};

  width: 100%;
  max-width: ${theme.size.maxWidth};
  margin: 0 auto;
  padding: 4px 0;

  background: ${theme.colors.white};
  box-shadow: 0 -4px 10px 0 ${theme.colors.grayOpacity50};
`;

export const menuItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 69px;
`;
