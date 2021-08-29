import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import {
  handleModal,
  loginFailure,
  signupSuccess,
  signupFailure,
  passwordCheckFailure,
} from '../redux/actions/action';
import Login from './Login';
import SignUp from './SignUp';
import { getModalType, getModalData } from '../redux/selectors';
import PostInfo from './PostInfo';
import Menu from './Menu';
import ProfileEdit from './ProfileEdit';
import PostSharing from './PostSharing';
import PasswordCheck from './PasswordCheck';
import PasswordChange from './PasswordChange';
import { ReactComponent as CloseIcon } from '../images/close.svg';

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 15;
  left: 0;
  top: 0;
  background: rgba(250, 250, 250, 0.95);
`;

const ModalContent = styled.div`
  /* border-radius: 10px;
  border: solid 1px #dbdbdb; */
`;

export default function Modal() {
  const dispatch = useDispatch();
  const modalType = useSelector(getModalType);
  const modalData = useSelector(getModalData);

  const handleModalClose = () => {
    dispatch(handleModal({ isOpen: false }));
    dispatch(signupSuccess(''));
    dispatch(signupFailure(''));
    dispatch(loginFailure(''));
    dispatch(passwordCheckFailure(''));
  };

  const renderModalContentComponent = () => {
    if (modalType === 'login') {
      return <Login />;
    } else if (modalType === 'signup') {
      return <SignUp />;
    } else if (modalType === 'postInfo') {
      return <PostInfo modalData={modalData} />;
    } else if (modalType === 'menu') {
      return <Menu />;
    } else if (modalType === `profileEdit`) {
      return <ProfileEdit />;
    } else if (modalType === `passwordCheck`) {
      return <PasswordCheck />;
    } else if (modalType === `postSharing`) {
      return <PostSharing />;
    } else if (modalType === `passwordChange`) {
      return <PasswordChange />;
    }
  };

  return (
    <ModalContainer onClick={handleModalClose}>
      <Button close onClick={handleModalClose}>
        <CloseIcon />
      </Button>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {renderModalContentComponent()}
      </ModalContent>
    </ModalContainer>
  );
}

//placeholder to stop event propagation
//https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
