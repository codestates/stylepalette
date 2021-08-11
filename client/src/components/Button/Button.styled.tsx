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
    color: white;
  }
`;

export const PrimaryButton = styled(DefaultButton)`
  background: palevioletred;
  color: white;
`;

export const SecondaryButton = styled(DefaultButton)`
  background: skyblue;
  color: black;
`;

export const CloseButton = styled(DefaultButton)`
  border: none;
  padding: 0.25em;
  margin: 5px;
  right: 0;
  top: 0;
  position: absolute;
  font-size: 20px;
`;
