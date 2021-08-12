import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ArrowLongRight } from '@styled-icons/entypo/ArrowLongRight';

import { serverUrl } from '../utils/constants';
import axios from 'axios';

import MalePNG from '../images/male.png';
import femalePNG from '../images/female.png';

const GenderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: white;
  flex-direction: column;
  left: 0;
  top: 0;
`;

const GenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  padding: 50px;
`;

const GenderContent = styled.h1`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 2.8rem;
`;

const PhotoContent = styled.h2`
  text-align: center;
  font-size: 2.5rem;
`;

const GenderFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const PhotoWrapper = styled.div`
  padding: 30px 225px;
`;

const GenderPhoto = styled.img`
  width: 350px;
  height: 350px;
  margin: 10px 0 30px;
`;

const PhotoButton = styled.button`
  width: 350px;
  height: 380px;
  border-style: none;
  border-radius: 45px;
  background-color: white;
  text-align: center;

  &:hover {
    opacity: 70%;
  }

  &:focus {
    background-color: #dedede;
  }
`;

const NextButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100vw;
  align-items: center;
`;

const NextButton = styled.button`
  width: 150px;
  height: 100px;
  border: none;
  text-align: center;
  margin: 10px 100px 10px 100px;
  background-color: white;
  animation: moveArrow 0.5s infinite linear alternate;

  &:disabled {
    opacity: 70%;
    animation-play-state: paused;
  }

  &:hover {
    background-color: #efefef;
    border-radius: 45px;
    animation-play-state: paused;
  }

  @keyframes moveArrow {
    100% {
      margin: 10px 130px 10px 100px;
    }
  }
`;

const NextIcons = styled(ArrowLongRight)`
  color: #222222;
`;

function GenderSelect() {
  const [gender, setGender] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    enAble();
  }, [gender]);

  function enAble() {
    if (gender === '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function handleChangeGender(e: React.MouseEvent<HTMLButtonElement>) {
    setGender(e.currentTarget.value);
  }

  return (
    <GenderWrapper>
      {/* <Header /> */}
      <GenderContainer>
        <ContentWrapper>
          <GenderContent>안녕하세요</GenderContent>
          <GenderContent>성별을 선택해주세요</GenderContent>
        </ContentWrapper>
        <PhotoContainer>
          <PhotoWrapper>
            <PhotoButton onClick={handleChangeGender} value={'남성'}>
              <GenderPhoto src={MalePNG} />
            </PhotoButton>
            <PhotoContent>남성</PhotoContent>
          </PhotoWrapper>
          <PhotoWrapper>
            <PhotoButton onClick={handleChangeGender} value={'여성'}>
              <GenderPhoto src={femalePNG} />
            </PhotoButton>
            <PhotoContent>여성</PhotoContent>
          </PhotoWrapper>
        </PhotoContainer>
        <NextButtonWrapper>
          {disabled ? (
            <NextButton>
              <NextIcons size="100"></NextIcons>
            </NextButton>
          ) : (
            <NextButton disabled>
              <NextIcons size="100"></NextIcons>
            </NextButton>
          )}
        </NextButtonWrapper>
      </GenderContainer>
      <GenderFooter></GenderFooter>
    </GenderWrapper>
  );
}

export default GenderSelect;
