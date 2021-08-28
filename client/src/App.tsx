import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../src/redux/actions/action';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { getIsModalOpen } from './redux/selectors/index';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage';
import GenderSelect from './pages/GenderSelect';
import MyPage from './pages/MyPage';
import OtherUserPage from './pages/OtherUserPage';
import Gallery from './pages/Gallery';
import Result from './pages/Result';
import LandingPage from './pages/LandingPage';
import { kakaoLogin, googleLogin } from './redux/actions/action';

interface WrapperProps {
  isModalOpen: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  ${(props) => {
    if (props.isModalOpen) {
      return `overflow-y: hidden;
    `;
    }
  }}
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap');
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
  overflow-x: hidden;
  overflow-y: auto;
}
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    const scope = url.searchParams.get('scope');
    if (authorizationCode && scope) {
      dispatch(googleLogin({ authorizationCode, scope }));
    } else if (authorizationCode && !scope) {
      dispatch(kakaoLogin({ authorizationCode, scope }));
    }
    // check if user has logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    let userInfoString = '';
    console.log(token, user);
    if (user !== '') {
      userInfoString = JSON.parse(user!);
    }
    if (token) {
      dispatch(loginSuccess({ accessToken: token, user: userInfoString }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isModalOpen = useSelector(getIsModalOpen);

  return (
    <Wrapper isModalOpen={isModalOpen}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <LandingPage />
            {/* <MainPage /> */}
          </Route>
          <Route exact path="/genderselect">
            <GenderSelect />
          </Route>
          <Route exact path="/mainpage">
            <MainPage />
          </Route>
          <Route exact path="/result">
            <Result />
          </Route>
          <Route exact path="/mypage">
            <MyPage />
          </Route>
          <Route exact path="/gallery">
            <Gallery />
          </Route>
          <Route exact path="/user/:userId">
            <OtherUserPage />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
