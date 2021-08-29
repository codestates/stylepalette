import styled from 'styled-components';

export const DefaultButton = styled.button`
  background: #ff7e67;
  color: white;
  border-radius: 20px;
  border: 1px solid #ff7e67;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  transition: all 0.2s linear;

  &:hover {
    cursor: pointer;
    opacity: 90%;
    transform: translatey(3px);
    animation: ani9 0.4s ease-in-out infinite alternate;
  }
`;

export const PrimaryButton = styled(DefaultButton)`
  background: #09214c;
  color: white;
  /* width: 100px; */
  height: 30px;
  border: none;

  &:hover {
    cursor: pointer;
    opacity: 90%;
  }

  &:active {
    outline: none;
  }

  &:disabled {
    opacity: 50%;
    animation: none;
    transform: none;
  }
`;

export const SecondaryButton = styled(DefaultButton)`
  background: white;
  color: #09214c;
  /* width: 100px; */
  height: 30px;
  border: 1px solid #09214c;

  &:hover {
    cursor: pointer;
  }
`;

export const CloseButton = styled(DefaultButton)`
  background: none;
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
