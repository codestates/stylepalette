import React from 'react';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';

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
  // const isModalOpen = useSelector();

  return (
    <ModalContainer>
      <Button close>X</Button>
      {props.children}
    </ModalContainer>
  );
}
