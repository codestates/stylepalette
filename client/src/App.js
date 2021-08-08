import "./App.css";
import Text from "./components/Text/Text";
import Button from "./components/Button/Button";
import StyledText from "./components/Text/Text";

function App() {
  return (
    <div className="App">
      <Text size="large" />
      <header className="App-header">
        <StyledText size="small">
          Edit <code>src/App.js</code> and save to reload.
        </StyledText>

        <Button>Hello</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
