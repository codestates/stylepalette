import './App.css';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Text from './components/Text/Text';
import Button from './components/Button/Button';
import StyledText from './components/Text/Text';
import StyledSignUp from './modals/signup';

const TestButton = styled.button`
  width: 200px;
  height: 100px;
`;

function App() {
  const [bModal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return <div className="App"></div>;
}

export default App;
