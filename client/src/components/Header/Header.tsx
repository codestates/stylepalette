import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getIsLoggedIn, getIsModalOpen } from '../../redux/selectors';
import { handleModal, logOut } from '../../redux/actions/action';
import Modal from '../../modals/Modal';

import { ReactComponent as MenuIcon } from '../../images/menu.svg';
import StylePaletteLogo from '../../images/Logo/StylePaletteLogo.png';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  width: 100%;
  height: 5rem;
  position: fixed;
  top: 0;
  z-index: 10;
  opacity: 90%;
`;

const LogoWrapper = styled.span`
  display: flex;
  flex-direction: row;
  width: 250px;
  height: 3.9rem;
  padding: 0 0 0 30px;
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
  color: white;
  font-size: 2.2rem;
  width: 400px;
  text-align: center;

  &:hover {
    opacity: 70%;
  }
`;

const Linked = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 1.2rem;

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
  padding-right: 1.5em;
  color: white;
  cursor: pointer;
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
    dispatch(handleModal({ isOpen: true, type: 'menu' }));
  };

  const handleClickScrollTo = () => {
    window.scrollTo(0, 0);
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
                <NavIcon onClick={handleClickScrollTo}>갤러리</NavIcon>
              </Linked>
              <NavIcon onClick={handleClickLogOut}>
                <Linked to="/">로그아웃</Linked>
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
