import React from "react";
import styled, { css } from "styled-components";
import {
  space,
  SpaceProps,
  LayoutProps,
  layout,
} from "styled-system";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement>, SpaceProps, LayoutProps {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

const ButtonStyled = styled.button<IButton>`
  ${({ theme, variant }) => {
    if (variant === "secondary") {
      return css`
        background-color: ${theme.palette.secondary.dark};
        color: ${theme.palette.text.secondary};
      `;
    } else {
      return css`
        background-color: ${theme.palette.primary.dark};
        color: ${theme.palette.text.primary};
      `;
    }
  }};

  ${({ size }) => {
    switch (size) {
      case "small":
        return css`
          font-size: 12px;
          padding: 6px 12px;
        `;
      case "large":
        return css`
          font-size: 18px;
          padding: 10px 20px;
        `;
      default:
        return css`
          font-size: 16px;
          padding: 8px 16px;
        `;
    }
  }};

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `};

  display: block;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${space},
  ${layout},
`;

const Button: React.FC<IButton> = ({
                                         variant = "primary",
                                         size = "medium",
                                         fullWidth = false,
                                         children,
                                         ...rest
                                       }) => {
  return (
    <ButtonStyled variant={variant} size={size} fullWidth={fullWidth} {...rest}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
