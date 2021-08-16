import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import Text from '../components/Text/Text';
import Man from '../images/TestMan/Man1.svg';
import { handleModal } from '../redux/actions/action';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ResultImage = styled.img`
  width: 100px;
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Result() {
  const dispatch = useDispatch();

  const handleClickPostSharing = () => {
    dispatch(handleModal({ isOpen: true, type: 'postSharing' }));
  };

  //TODO: 저장하기 눌렀을때 로그인이 안되어있으면 로그인 모달, 로그인이 되어있으면 자동으로 마이페이지에 저장

  return (
    <>
      <ResultContainer>
        <ResultImage src={Man}></ResultImage>
        <Text>최종결과: 멋진 코디네요!</Text>
      </ResultContainer>
      <ButtonContainer>
        <Button primary>
          <Link to="/genderselect">처음으로</Link>
        </Button>
        <Button primary>저장하기</Button>
        <Button primary onClick={handleClickPostSharing}>
          공유하기
        </Button>
        <Button primary>
          <Link to="/gallery">다른 작품 구경하기</Link>
        </Button>
      </ButtonContainer>
    </>
  );
}
