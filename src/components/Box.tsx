import React from "react";
import styled, { css } from "styled-components";
import {
  space,
  layout,
  display,
  DisplayProps,
  SpaceProps,
  LayoutProps,
} from "styled-system";

interface IBox extends SpaceProps, LayoutProps, DisplayProps {}

const Box = styled.div<IBox>`
  ${display},
  ${space},
  ${layout},
`;

export default Box;
