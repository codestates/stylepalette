import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getIsLoggedIn, getIsModalOpen } from '../../redux/selectors';
import { handleModal, logOut } from '../../redux/actions/action';
import Modal from '../../modals/Modal';
import { ReactComponent as MenuIcon } from '../../images/menu.svg';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 4rem;
  position: sticky;
  top: 0;
  border-bottom: solid 1px #dbdbdb;
  z-index: 10;
  opacity: 90%;
`;
const LogoWrapper = styled.span`
  padding-left: 1em;
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    display: none;
  }
`;

const LinkedLoGo = styled(Link)`
  text-decoration: none;
  color: #666666;
  font-size: 2rem;

  &:hover {
    opacity: 70%;
  }
`;

const Linked = styled(Link)`
  text-decoration: none;
  color: #666666;
  font-size: 1.15rem;

  &:hover {
    opacity: 70%;
  }
`;

const NavMobile = styled.span`
  @media (min-width: 768px) {
    display: none;
  }
  padding-right: 0.8em;
`;
const NavIcon = styled.span`
  padding-right: 0.8em;
`;

// If user is logged in: nav will show: mypage, logout, gallery

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isModalOpen = useSelector(getIsModalOpen);

  const handleClickLogIn = (event: React.MouseEvent) => {
    dispatch(handleModal({ isOpen: true, type: 'login' }));
  };

  const handleClickSignUp = (event: React.MouseEvent) => {
    dispatch(handleModal({ isOpen: true, type: 'signup' }));
  };

  const handleClickLogOut = (event: React.MouseEvent) => {
    dispatch(logOut());
  };

  const handleClickMenuIcon = (event: React.MouseEvent) => {
    console.log('HANDLE CLICK');
    dispatch(handleModal({ isOpen: true, type: 'menu' }));
  };

  return (
    <>
      <HeaderWrapper>
        <LogoWrapper>
          <LinkedLoGo to="/">StylePalette</LinkedLoGo>
        </LogoWrapper>
        <NavWrapper>
          {isLoggedIn ? (
            <>
              <Linked to="/mypage">
                <NavIcon>마이페이지</NavIcon>
              </Linked>
              <Linked to="/gallery">
                <NavIcon>갤러리</NavIcon>
              </Linked>
              <NavIcon onClick={handleClickLogOut}>
                <Linked to="/">로그아웃</Linked>
              </NavIcon>
              <Linked to="/genderselect">
                <NavIcon>성별선택</NavIcon>
              </Linked>
              <Linked to="/otheruserpage">
                <NavIcon>다른유저페이지</NavIcon>
              </Linked>
            </>
          ) : (
            <>
              <NavIcon onClick={handleClickLogIn}>로그인</NavIcon>
              <NavIcon onClick={handleClickSignUp}>회원가입</NavIcon>
            </>
          )}
        </NavWrapper>
        <NavMobile onClick={handleClickMenuIcon}>
          <MenuIcon />
        </NavMobile>
      </HeaderWrapper>
      {isModalOpen && <Modal />}
    </>
  );
}
