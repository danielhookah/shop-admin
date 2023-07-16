import React, { useState, ChangeEvent, FocusEvent, InputHTMLAttributes, useId } from "react";
import styled, { css } from "styled-components";
import {
  space,
  SpaceProps,
} from "styled-system";

interface IUserInput extends InputHTMLAttributes<HTMLInputElement>, SpaceProps {
  label?: string;
  value?: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

const InputContainer = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 100;
  font-size: 14px;
  display: block;
  padding-left: 12px;
  margin-bottom: 4px;
`;

const Input = styled.input<{ hasError: boolean; isFocused: boolean; disabled: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.neutral.lightGrey};
  background-color: ${({ theme }) => theme.palette.neutral.white};
  transition: border-color 0.3s ease;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-color: ${theme.palette.neutral.black};
    `}

  ${({ theme, hasError }) =>
    hasError &&
    css`
      border-color: ${theme.palette.accent.red};
    `}

  ${({ theme, disabled }) =>
    disabled &&
    css`
      background-color: ${theme.palette.neutral.lightGrey};
      cursor: not-allowed;
    `};
  ${space},
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.palette.accent.red};
  font-size: 14px;
  margin-top: 4px;
`;

const UserInput = React.forwardRef<HTMLInputElement, IUserInput>(
  (
    {
      label,
      value,
      onChange,
      name,
      type = "text",
      placeholder = "",
      error = "",
      disabled = false,
    },
    ref,
  ) => {
    const id = useId();
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
    };

    const hasError = !!error;

    return (
      <InputContainer>
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          hasError={hasError}
          isFocused={isFocused}
          disabled={disabled}
        />
        {hasError && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
    );
  });

UserInput.displayName = "UserInput";

export default UserInput;
