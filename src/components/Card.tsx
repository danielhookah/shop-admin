import React from "react";
import styled, { css } from "styled-components";
import {
  space,
  SpaceProps,
  LayoutProps,
  layout,
} from "styled-system";

interface ICard extends SpaceProps, LayoutProps {
}

const Card = styled.div<ICard>(
  () =>
    css`
      ${({ theme }) => `
    background-color: ${theme.palette.neutral.white};
    box-shadow: rgba(0, 0, 0, 0.1) 4px 8px 10px;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
  `};
    `,
  space,
  layout,
);

export default Card;
