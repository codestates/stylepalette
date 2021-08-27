import styled from 'styled-components';

export const DefaultButton = styled.button`
  background: transparent;
  color: black;
  border-radius: 20px;
  border: 1px solid black;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  transition: all 0.2s linear;

  &:disabled {
    // change opacity
  }

  &:hover {
    cursor: pointer;
    opacity: 90%;
    transform: translatey(3px);
    animation: ani9 0.4s ease-in-out infinite alternate;
  }
`;

export const PrimaryButton = styled(DefaultButton)`
  background: black;
  color: white;
  width: 100px;
  height: 30px;

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
  background: white;
  color: black;
  width: 100px;
  height: 30px;

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
