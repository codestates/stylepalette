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
    /* color: #dbdbdb; */
    cursor: pointer;
    opacity: 90%;
  }
`;

export const PrimaryButton = styled(DefaultButton)`
  background: palevioletred;
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 90%;
  }

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

  &:hover {
    cursor: pointer;
  }
`;

export const CloseButton = styled(DefaultButton)`
  border: none;
  padding: 1em;
  margin: 20px;
  right: 0;
  top: 0;
  position: absolute;
  font-size: 20px;

  &:hover {
    cursor: pointer;
  }
`;
