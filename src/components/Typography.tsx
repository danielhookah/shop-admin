import { theme as themeConfig } from "styles/theme";
import React from "react";
import styled, { css } from "styled-components";
import { space, SpaceProps, variant } from "styled-system";

export type TypographyType = {
  variant: keyof typeof themeConfig.textStyles;
  children: React.ReactNode;
  color?: | "primary" | "secondary" | "app" | "gray"
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
  textAlign?: "center" | "start" | "end";
} & SpaceProps;

const defaultColor = themeConfig.palette.neutral.black;

const colors = css`
  ${({ theme, color }) => css`
    ${color === "primary" ? `color: ${theme.palette.text.primary};` : defaultColor};
    ${color === "secondary" ? `color: ${theme.palette.text.secondary};` : defaultColor};
    ${color === "gray" ? `color: ${theme.palette.neutral.grey};` : defaultColor};
    ${color === "app" ? `color: ${theme.palette.primary.dark};` : defaultColor};
  `};
`;

const props = css`
  ${({ fontWeight, textAlign }) => css`
    ${fontWeight ? `font-weight: ${fontWeight};` : ""};
    ${textAlign ? `text-align: ${textAlign};` : ""};
    font-family: 'Montserrat', sans-serif;
  `};
`;

const P = styled.p<TypographyType>(
  variant({
    scale: "textStyles",
  }),
  props,
  colors,
  space,
);
const H1 = styled.h1<TypographyType>(
  variant({
    scale: "textStyles",
  }),
  props,
  colors,
  space,
);
const H2 = styled.h2<TypographyType>(
  variant({
    scale: "textStyles",
  }),
  props,
  colors,
  space,
);
const H3 = styled.h3<TypographyType>(
  variant({
    scale: "textStyles",
  }),
  props,
  colors,
  space,
);
const H4 = styled.h4<TypographyType>(
  variant({
    scale: "textStyles",
  }),
  props,
  colors,
  space,
);
const H5 = styled.h5<TypographyType>(
  variant({
    scale: "textStyles",
  }),
  props,
  colors,
  space,
);
const H6 = styled.h6<TypographyType>(
  variant({
    scale: "textStyles",
  }),
  props,
  colors,
  space,
);

export { P, H1, H2, H3, H4, H5, H6 };
