import styled from "styled-components";

import {
  space,
  layout, SpaceProps, LayoutProps,
} from "styled-system";
import React from "react";

interface IButtonGroup extends SpaceProps, LayoutProps {}

export const ButtonGroup = styled.div<IButtonGroup>`
  display: flex;
  gap: 8px;
  ${space},
  ${layout},
`;
