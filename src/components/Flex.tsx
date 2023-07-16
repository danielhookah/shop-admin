import styled, { css } from 'styled-components';
import {
  flexbox,
  FlexboxProps,
  gridColumnGap,
  GridColumnGapProps,
  space,
  SpaceProps,
  layout,
  LayoutProps
} from 'styled-system';

interface IFlex
  extends SpaceProps,
    FlexboxProps,
    GridColumnGapProps,
    LayoutProps {
  gap?: string;
}

export const Flex = styled.div<IFlex>(
  ({ gap }) =>
    css`
      display: flex;
      ${gap ? `gap: ${gap};` : ''}
    `,
  space,
  flexbox,
  gridColumnGap,
  layout
);
