import React from 'react';
import { Link } from 'react-router-dom';
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
  background-color: #fafafa;
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const LinkedLoGo = styled(Link)`
  text-decoration: none;
  color: #ff7e67;
  font-size: 2.2rem;
  width: 400px;
  text-align: center;

  &:hover {
    opacity: 70%;
  }
`;

const Linked = styled(Link)`
  text-decoration: none;
  color: #ff7e67;
  font-size: 1.2rem;

  &:hover {
    opacity: 70%;
  }
`;

const NavMobile = styled.span`
  display: none;
  margin-right: 2rem;

  @media (max-width: 768px) {
    display: inline;
  }
`;

const NavIcon = styled.span`
  color: #ff7e67;
  cursor: pointer;
  margin-right: 2.5rem;
  font-size: 1.2rem;
`;

const MenuIcons = styled(MenuIcon)`
  width: 30px;
  height: 30px;
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
          <MenuIcons />
        </NavMobile>
      </HeaderWrapper>
      {isModalOpen && <Modal />}
    </>
  );
}
