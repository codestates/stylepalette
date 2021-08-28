import styled from 'styled-components';
import { PrimaryButton, SecondaryButton, DefaultButton, CloseButton } from './Button.styled';

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  close?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: any;
}

export default function Button(props: ButtonProps) {
  if (props.primary) {
    return (
      <PrimaryButton onClick={props.onClick} disabled={props.disabled}>
        {props.children}
      </PrimaryButton>
    );
  } else if (props.secondary) {
    return (
      <SecondaryButton onClick={props.onClick} disabled={props.disabled}>
        {props.children}
      </SecondaryButton>
    );
  } else if (props.close) {
    return (
      <CloseButton onClick={props.onClick} disabled={props.disabled}>
        {props.children}
      </CloseButton>
    );
  }

  return (
    <DefaultButton onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </DefaultButton>
  );
}

export const StyledButton = styled.button<ButtonProps>`
  background: transparent;
  color: palevioletred;
  border-radius: 3px;
  border: 2px solid palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${(props) => {
    if (props.primary) {
      return `
        background: palevioletred;
        color: white;
    `;
    } else if (props.secondary) {
      return `
        background: skyblue;
        color: black;
    `;
    }
  }}

  &:disabled {
    // change opacity
  }
  &:hover {
    // change color
  }

  &:active {
    outline: none;
    background-color: #fce4ec;
  }
`;
