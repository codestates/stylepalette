import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Text from './components/Text/Text';
import Button from './components/Button/Button';
import StyledText from './components/Text/Text';
import Header from './components/Header/Header';
import GenderSelect from './pages/GenderSelect';

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
          </Route>
          <Route exact path="/mypage">
            mypage
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
