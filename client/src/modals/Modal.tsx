import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import { handleModal } from '../redux/actions/action';
import Login from './Login';
import SignUp from './SignUp';
import { getModalType } from '../redux/selectors';
import PostInfo from './PostInfo';

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
  const dispatch = useDispatch();
  const modalType = useSelector(getModalType);

  const handleModalClose = () => {
    dispatch(handleModal({ isOpen: false }));
  };

  const renderModalContentComponent = () => {
    if (modalType === 'login') {
      return <Login />;
    } else if (modalType === 'signup') {
      return <SignUp />;
    } else if (modalType === 'postInfo') {
      return <PostInfo />;
    }
  };

  return (
    <ModalContainer>
      <Button close onClick={handleModalClose}>
        X
      </Button>
      {renderModalContentComponent()}
    </ModalContainer>
  );
}
