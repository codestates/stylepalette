import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PrimaryButton } from '../components/Button/Button.styled';
import Text from '../components/Text/Text';

import { handleModal } from '../redux/actions/action';
import { getIsLoggedIn } from '../redux/selectors';

const ResultContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ResultImage = styled.img`
  width: 550px;
  margin: 10px 0;
`;

const ResultText = styled(Text)`
  font-size: 24px;
  font-style: bold;
  padding: 0 0 10px 0;
`;

const ResultButton = styled(PrimaryButton)`
  width: 140px;
  height: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Result() {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState<any>(null);
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    const imgSrc = localStorage.getItem('imgLocation');

    setImageSrc(imgSrc);
  });

  const handleClickPostSharing = () => {
    dispatch(handleModal({ isOpen: true, type: 'postSharing' }));
  };

  const handleClickLogin = () => {
    dispatch(handleModal({ isOpen: true, type: 'login' }));
  };

  return (
    <>
      <ResultContainer>
        <ResultImage src={imageSrc}></ResultImage>
        <ResultText>최종결과: 멋진 코디네요!</ResultText>
        <ButtonContainer>
          <Link to="/genderselect">
            <ResultButton>처음으로</ResultButton>
          </Link>
          {isLoggedIn ? (
            <ResultButton onClick={handleClickPostSharing}>저장하기</ResultButton>
          ) : (
            <ResultButton onClick={handleClickLogin}>저장하기</ResultButton>
          )}

          <Link to="/gallery">
            <ResultButton>다른 작품 구경하기</ResultButton>
          </Link>
        </ButtonContainer>
      </ResultContainer>
    </>
  );
}
