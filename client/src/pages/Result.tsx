import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import { PrimaryButton } from '../components/Button/Button.styled';
import Text from '../components/Text/Text';

import { handleModal } from '../redux/actions/action';
import { MainResultImage } from '../redux/reducers/initialState';
import { getIsLoggedIn, getMainResultImage } from '../redux/selectors';

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
  // const imgSrc = localStorage.getItem('imageSrc');
  const isLoggedIn = useSelector(getIsLoggedIn);

  const handleClickPostSharing = () => {
    dispatch(handleModal({ isOpen: true, type: 'postSharing' }));
  };

  const handleClickLogin = () => {
    dispatch(handleModal({ isOpen: true, type: 'login' }));
  };

  //TODO: 저장하기 눌렀을때 로그인이 안되어있으면 로그인 모달, 로그인이 되어있으면 자동으로 마이페이지에 저장
  //? 1. 저장하기 눌렀을때 post 로 필요한 데이터, isPublic 에 해당하는 boolean, 사진 데이터
  //? 2. 현재 메인 페이지에서 받아와야하는, 탑, 바텀 컬러

  return (
    <>
      <ResultContainer>
        {/* <ResultImage src={imgSrc}></ResultImage> */}
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
      <ButtonContainer>
        <Button primary>
          <Link to="/genderselect">처음으로</Link>
        </Button>
        <Button primary onClick={handleClickPostSharing}>
          저장하기
        </Button>
        <Button primary>공유하기</Button>
        <Button primary>
          <Link to="/gallery">다른 작품 구경하기</Link>
        </Button>
      </ButtonContainer>
    </>
  );
}
