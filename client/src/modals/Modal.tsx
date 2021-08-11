import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  background: rgba(219, 219, 219, 0.9);
  left: 0;
  top: 0;
`;

interface ModalProps {
  children?: any;
}

export default function Modal(props: ModalProps) {
  return <ModalContainer>{props.children}</ModalContainer>;
}
