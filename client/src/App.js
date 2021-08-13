import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Text from './components/Text/Text';
import Button from './components/Button/Button';
import StyledText from './components/Text/Text';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import GenderSelect from './pages/GenderSelect';
import MyPage from './pages/MyPage';

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
            {/* TODO: Add gallery once completed */}
            gallery
          </Route>
        </Switch>
        {/* <GenderSelect /> */}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
