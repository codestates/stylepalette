import React from 'react';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton, DefaultButton } from './Button.styled';

interface ButtonProps {
  primary?: string;
  secondary?: string;
  children?: any;
}

export default function Button(props: ButtonProps) {
  if (props.primary) {
    return <PrimaryButton>{props.children}</PrimaryButton>;
  } else if (props.secondary) {
    return <SecondaryButton>{props.children}</SecondaryButton>;
  }
  return <DefaultButton>{props.children}</DefaultButton>;
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
`;
