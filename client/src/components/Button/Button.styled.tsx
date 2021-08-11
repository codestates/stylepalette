import styled from 'styled-components';

export const DefaultButton = styled.button`
  background: transparent;
  color: palevioletred;
  border-radius: 3px;
  border: 2px solid palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  &:disabled {
    // change opacity
  }

  &:hover {
    // change color
  }
`;

export const PrimaryButton = styled(DefaultButton)`
  background: palevioletred;
  color: white;

  &:active {
    outline: none;
    background-color: #f8bbd0;
    border-color: #f8bbd0;
  }

  &:disabled {
    opacity: 50%;
  }
`;

export const SecondaryButton = styled(DefaultButton)`
  background: skyblue;
  color: black;
`;

export const CloseButton = styled(DefaultButton)`
  border: none;
  padding: 0.25em;
  margin: 0;
`;
