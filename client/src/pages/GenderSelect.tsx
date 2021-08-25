import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { NavigateNext } from '@styled-icons/material-outlined/NavigateNext';
import MalePNG from '../images/male.png';
import femalePNG from '../images/female.png';

const GenderWrapper = styled.div`
  width: 100vw;
  height: 100vh;
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

  @media (max-width: 768px) {
    padding: 50px 50px 30px 50px;
  }
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

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const PhotoWrapper = styled.div`
  padding: 30px 225px 20px 225px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const GenderPhoto = styled.img`
  width: 330px;
  height: 330px;
  margin: 10px 0 30px;

  @media (max-width: 768px) {
    width: 149px;
    height: 149px;
    margin: 0px;
  }
`;

const PhotoButton = styled.button`
  width: 350px;
  height: 380px;
  border-style: none;
  border-radius: 45px;
  background-color: white;
  text-align: center;

  &:hover {
    opacity: 80%;
  }

  &:focus {
    background-color: black;
  }

  @media (max-width: 768px) {
    width: 155px;
    height: 155px;
  }
`;

const NextButtonWrapper = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  align-items: center;
  left: 90%;
  top: 85%;

  @media (max-width: 768px) {
    position: static;
    justify-content: center;
    padding: 15px;
    width: auto;
  }
`;

const NextButton = styled.button`
  width: 110px;
  height: 110px;
  border: none;
  border-radius: 50%;
  text-align: center;
  margin: 10px;
  background-color: black;
  animation: moveArrow 0.5s infinite linear alternate;

  &:disabled {
    opacity: 70%;
    animation-play-state: paused;
  }

  &:hover {
    opacity: 50%;
    animation-play-state: paused;
  }

  @keyframes moveArrow {
    100% {
      transform: translate(10px);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NextIcons = styled(NavigateNext)`
  color: #ffffff;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SelectButton = styled.button`
  display: none;
  width: 150px;
  height: 80px;
  border: none;
  text-align: center;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 5px;
  background-color: white;
  font-size: 20px;

  &:disabled {
    opacity: 70%;
    border: 1px solid rgb(0, 0, 0, 0.7);
  }

  &:hover {
    border-style: solid;
    border-width: 1px;
    border-color: #dbdbdb;
    border-radius: 45px;
  }

  &:focus {
    border-style: solid;
    border-width: 1px;
    border-color: #dbdbdb;
    border-radius: 45px;
    background-color: #efefef;
  }

  @media (max-width: 768px) {
    display: inline;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
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
    localStorage.setItem('gender', e.currentTarget.value);
  }

  return (
    <GenderWrapper>
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
            <Link to="/mainpage">
              <NextButton>
                <NextIcons size="90"></NextIcons>
              </NextButton>
            </Link>
          ) : (
            <NextButton disabled>
              <NextIcons size="90"></NextIcons>
            </NextButton>
          )}
          {disabled ? (
            <StyledLink to="/mainpage">
              <SelectButton>선택 완료</SelectButton>
            </StyledLink>
          ) : (
            <SelectButton disabled>선택 완료</SelectButton>
          )}
        </NextButtonWrapper>
      </GenderContainer>
    </GenderWrapper>
  );
}

export default GenderSelect;
