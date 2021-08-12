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

const NavMobile = styled.span`
  @media (min-width: 768px) {
    display: none;
  }
  padding-right: 1em;
`;
const NavIcon = styled.span`
  padding-right: 1em;
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
          <Link to="/">StylePalette</Link>
        </LogoWrapper>
        <NavWrapper>
          {isLoggedIn ? (
            <>
              <Link to="/mypage">
                <NavIcon>마이페이지</NavIcon>
              </Link>
              <Link to="/gallery">
                <NavIcon>갤러리</NavIcon>
              </Link>
              <NavIcon onClick={handleClickLogOut}>
                <Link to="/">로그아웃</Link>
              </NavIcon>
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
