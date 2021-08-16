import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage';
import GenderSelect from './pages/GenderSelect';
import MyPage from './pages/MyPage';
import OtherUserPage from './pages/OtherUserPage';
import Gallery from './pages/Gallery';
// import PostInfo from './modals/PostInfo';
// import Result from './pages/Result';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <MainPage />
        <Switch>
          <Route exact path="/">
            {/* TODO: Add landing page once completed */}
            Landing Page
          </Route>
          <Route exact path="/genderselect">
            <GenderSelect />
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
        </Switch>
        {/* <GenderSelect /> */}
        {/* <Result /> */}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
