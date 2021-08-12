import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Text from './components/Text/Text';
import Button from './components/Button/Button';
import StyledText from './components/Text/Text';
import Header from './components/Header/Header';

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
            <Text size="large" />
            <header className="App-header">
              <StyledText size="small">
                Edit <code>src/App.js</code> and save to reload.
              </StyledText>
              <Button primary>Hello</Button>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </Route>
          <Route exact path="/genderselect">
            <GenderSelect />
          </Route>
          <Route exact path="/mypage">
            <MyPage />
          </Route>
          <Route exact path="/gallery">
            gallery
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
