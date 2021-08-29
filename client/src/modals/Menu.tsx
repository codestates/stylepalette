import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn } from '../redux/selectors';
import { handleModal, logOut } from '../redux/actions/action';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NavIcon = styled.span`
  padding-bottom: 2rem;
  font-size: 1.2rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
`;

export default function Menu() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);

  const handleClickLogin = (event: React.MouseEvent) => {
    dispatch(handleModal({ isOpen: true, type: 'login' }));
  };

  const handleClickSignUp = (event: React.MouseEvent) => {
    dispatch(handleModal({ isOpen: true, type: 'signup' }));
  };

  const handleClickLogOut = (event: React.MouseEvent) => {
    dispatch(logOut());
    dispatch(handleModal({ isOpen: false }));
  };

  const handleModalClose = (event: React.MouseEvent) => {
    dispatch(handleModal({ isOpen: false }));
  };

  return (
    <>
      <MenuContainer>
        {isLoggedIn ? (
          <>
            <NavIcon onClick={handleModalClose}>
              <NavLink to="/mypage">마이페이지</NavLink>
            </NavIcon>
            <NavIcon onClick={handleModalClose}>
              <NavLink to="/gallery">갤러리</NavLink>
            </NavIcon>
            <NavIcon onClick={handleClickLogOut}>
              <NavLink to="/">로그아웃</NavLink>
            </NavIcon>
          </>
        ) : (
          <>
            <NavIcon onClick={handleClickLogin}>로그인</NavIcon>
            <NavIcon onClick={handleClickSignUp}>회원가입</NavIcon>
          </>
        )}
      </MenuContainer>
    </>
  );
}
