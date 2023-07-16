import { Flex } from 'components/Flex';
import React, { InputHTMLAttributes, useRef } from 'react';
import styled from 'styled-components';
import { P } from "./Typography";

export interface CheckboxI extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  name?: string;
  checked?: boolean;
  unCheckedIconDisplay?: boolean;
}

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: pre-wrap;

  + label {
    cursor: pointer;
    ${({ theme }) => `
      color: ${theme.palette.neutral.grey};
    `};
  }
`;

const Control = styled(Flex)`
  flex-shrink: 0;
  ${({ theme }) => `    
    position: relative;
    width: 22px;
    height: 22px;
    margin-right: 8px;
    border: 2px solid ${theme.palette.primary.main};
    border-radius: 3px;
    top: 0;

    :focus-visible {
      outline: 1px solid ${theme.palette.neutral.grey};
    }
  `}
`;


interface IInput {
  error?: boolean;
}

const Input = styled.input<IInput>`
  ${({ theme, error }) => `
    opacity: 0;
    width: 22px;
    height: 22px;
    display: none;
    border-radius: 3px;
    + ${Control} {
      ${error ? `border-color: ${theme.palette.primary.main}` : ''};
    }

    &:not(:checked) {
      + ${Control} {
        span {
          display: none;
        }
      }
    }
    &:checked {
      + ${Control} {
        span {
          padding-left: 2px;
          font-size: 16px;
          font-weight: bold;
        }
        background-color: theme.palette.primary.main;
        border-color: ${
          error ? theme.palette.accent.red : theme.palette.primary.main
        };
      }
    }

    &:disabled {
      + ${Control} {
        opacity: 0.4;

        background-color: ${theme.palette.neutral.medium};
        border-color: ${theme.palette.neutral.medium};
      }
    }
  `}
`;

export const Checkbox: React.FC<CheckboxI> = ({
                                                label,
                                                name,
                                                error,
                                                checked,
                                                unCheckedIconDisplay,
                                                onChange,
                                                id,
                                                ...props
                                              }) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Label htmlFor={id}>
      <Input
        type="checkbox"
        checked={checked}
        error={error}
        name={name}
        onChange={onChange}
        id={id}
        ref={ref}
        {...props}
      />
      <Control
        onKeyPress={() => {
          ref?.current?.click();
        }}
        tabIndex={0}
      >
        <span>✓</span>
      </Control>
      {label && <P variant="medium">{label}</P>}
    </Label>
  );
};
