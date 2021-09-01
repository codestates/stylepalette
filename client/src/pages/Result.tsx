import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PrimaryButton } from '../components/Button/Button.styled';
import Text from '../components/Text/Text';

import { handleModal } from '../redux/actions/action';
import { getIsLoggedIn } from '../redux/selectors';

const ResultContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 88vh;
  left: 0;
  top: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding-top: 5rem;

  @media (min-width: 768px) {
    height: 100vh;
  }
`;

const ResultImage = styled.img`
  width: 300px;
  margin: 0;
  margin-top: -100px;
  @media (min-width: 768px) {
    width: 550px;
    margin: 10px 0;
  }
`;

const ResultText = styled(Text)`
  font-size: 1.5rem;
  height: 60px;
  @media (min-width: 768px) {
    font-size: 2rem;
    font-weight: 600;
    height: 80px;
  }
`;

const ResultButton = styled(PrimaryButton)`
  width: 80px;
  height: 50px;
  border-radius: 20px;
  word-break: keep-all;
  @media (min-width: 768px) {
    width: 140px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  height: auto;
  @media (min-width: 768px) {
    height: 120px;
  }
`;

export default function Result() {
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState<any>(null);
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    const imgSrc = localStorage.getItem('imgLocation');

    setImageSrc(imgSrc);
    window.scrollTo(0, 0);
  }, []);

  const handleClickPostSharing = () => {
    dispatch(handleModal({ isOpen: true, type: 'postSharing' }));
  };

  const handleClickLogin = () => {
    dispatch(handleModal({ isOpen: true, type: 'login' }));
  };

  const handleClickScrollTo = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <ResultContainer>
        <ResultImage src={imageSrc}></ResultImage>
        <ResultText>멋진 코디네요!</ResultText>
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
            <ResultButton onClick={handleClickScrollTo}>갤러리 구경하기</ResultButton>
          </Link>
        </ButtonContainer>
      </ResultContainer>
    </>
  );
}
