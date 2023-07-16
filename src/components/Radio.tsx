import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import styled from 'styled-components';

export interface RadioI extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  onChecked?: (data: boolean) => void;
  onClick?: () => void;
}

interface IHandleChangeInterface {
  target: HTMLInputElement;
}

const Label = styled.label`
  display: flex;
  font-size: 14px;
  text-transform: capitalize;
  align-items: center;
  cursor: pointer;
`;

const Control = styled.div`
  ${({ theme }) => `
    position: relative;
    width: 24px;
    height: 24px;
    margin-right: 8px;    
    border: 2px solid ${theme.palette.primary.main};
    border-radius: 50%;

    &::after {
      content: '';
      display: block;
      visibility: hidden;
      width: 10px;
      height: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: ${theme.palette.primary.main};
      border-radius: 50%;
    }
  `}
`;

const Input = styled.input<RadioI>`
  ${({ theme, error }) => `
    opacity: 0;
    width: 16px;
    height: 16px;
    position: absolute;    

    + ${Control} {
      ${error ? `border-color: ${theme.palette.accent.red}` : ''}
    }

    &:checked {
      + ${Control} {
        background-color: ${theme.palette.neutral.white};
        border-color: ${
  error ? theme.palette.accent.red : theme.palette.primary.main
};

        &::after {
          visibility: visible;
        }
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

export const Radio = React.forwardRef<HTMLInputElement, RadioI>(
  (
    {
      label,
      name,
      value,
      error = false,
      onClick,
      onChecked,
      checked,
      ...props
    },
    ref
  ) => {
    const [check, setCheck] = useState(false);

    const handleCheck = (event: IHandleChangeInterface) => {
      setCheck(event.target.checked);
    };

    useEffect(() => {
      if (!onChecked) return;
      onChecked(check);
    }, [check]);

    return (
      <Label>
        <Input
          label={label}
          name={name}
          value={value}
          error={error}
          type="radio"
          onClick={onClick}
          checked={checked}
          onChange={(e: IHandleChangeInterface) => handleCheck(e)}
          ref={ref}
          {...props}
        />
        <Control />
        {label && label}
      </Label>
    );
  }
);

Radio.displayName = 'Radio';
