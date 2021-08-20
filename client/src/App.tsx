import { useState } from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../src/redux/actions/action';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
// import ProfileEdit from './modals/ProfileEdit';

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
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap');
  font-family: 'Noto Sans KR', sans-serif;
  overflow-x: hidden;
  overflow-y: auto;
}
`;

function App() {
  const [gender, setGender] = useState<string>('');
  const [imageBlob, setImageBlob] = useState<Blob>(new Blob());
  const dispatch = useDispatch();
  useEffect(() => {
    // check if user has logged in
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loginSuccess(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isModalOpen = useSelector(getIsModalOpen);

  return (
    <Wrapper isModalOpen={isModalOpen}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        {/* <MainPage gender={gender} setImageBlob={setImageBlob} /> */}
        <Switch>
          <Route exact path="/">
            {/* TODO: Add landing page once completed */}
            Landing Page
          </Route>
          <Route exact path="/genderselect">
            <GenderSelect setGender={setGender} />
          </Route>
          <Route exact path="/mainpage">
            <MainPage gender={gender} setImageBlob={setImageBlob} />
          </Route>
          <Route exact path="/mypage">
            <MyPage />
          </Route>
          <Route exact path="/gallery">
            <Gallery />
          </Route>
          <Route exact path="/otheruserpage">
            <OtherUserPage />
          </Route>
          <Route exact path="/result">
            <Result imageBlob={imageBlob} />
          </Route>
        </Switch>
        {/* <ProfileEdit /> */}
        <Footer />
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
