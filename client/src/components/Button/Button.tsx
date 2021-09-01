import React from 'react';
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
