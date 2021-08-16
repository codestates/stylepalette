import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { handleModal } from '../redux/actions/action';
import ProfilePhoto from '../images/TestPhoto.jpg';
import { PrimaryButton } from '../components/Button/Button.styled';
import Photo from '../dummyData/dummyPhoto';

const MyPageWrapper = styled.div`
  width: 100%;
  /* height: 100vw; */
  display: flex;
  background-color: white;
  flex-direction: column;
  left: 0;
  top: 0;
`;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  margin: 15px;
`;

const MyPageFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const UserInfoContainer = styled.div`
  display: flex;
  padding: 0 15px 15px 15px;
  margin: 0 15px 15px 15px;
  width: 95%;
  border-style: groove;
  border-width: 0 0 2px 0;
  border-color: #dbdbdb;
`;

const UserPhotoWrapper = styled.div`
  padding: 50px;

  @media (max-width: 768px) {
    padding: 50px 50px 50px 115px;
  }
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 30px;
`;

const UserPostWrapper = styled.div`
  display: inline-block;
  width: 95%;
  text-align: left;
  padding: 15px;
  margin: 15px;
`;

const NavIcon = styled.button`
  margin: 0 50px 100px 60px;
  width: 300px;
  height: 300px;
  background-color: white;
  border-style: none;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin: 0 60px 60px 60px;
  }
`;

const PostPhoto = styled.img`
  border-style: solid;
  border-width: 2px;
  border-color: #c79a00;
  width: 300px;
  height: 300px;

  &:hover {
    opacity: 80%;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const UserPhoto = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 90px;
`;

const UserInfoContent = styled.span`
  padding: 10px;
  font-size: 34px;

  @media (max-width: 768px) {
    font-size: 34px;
  }
`;

const UserEditButton = styled(PrimaryButton)`
  width: 150px;
  height: 50px;
  padding: 10px;
`;

function MyPage() {
  const dispatch = useDispatch();

  const handleClickPostInfo = (event: React.MouseEvent) => {
    dispatch(handleModal({ isOpen: true, type: 'postInfo' }));
  };

  const handleClickProfileEditButton = () => {
    dispatch(handleModal({ isOpen: true, type: 'profileEdit' }));
  };
  return (
    <MyPageWrapper>
      <MyPageContainer>
        <UserInfoContainer>
          <UserPhotoWrapper>
            <UserPhoto src={ProfilePhoto} />
          </UserPhotoWrapper>
          <UserInfoWrapper>
            <UserInfoContent>전지호</UserInfoContent> <br />
            <UserEditButton onClick={handleClickProfileEditButton}>정보 수정</UserEditButton>
          </UserInfoWrapper>
        </UserInfoContainer>
        <UserPostWrapper>
          {Photo.map((el, idx) => {
            return (
              <NavIcon onClick={handleClickPostInfo}>
                <PostPhoto src={el} />
              </NavIcon>
            );
          })}
        </UserPostWrapper>
      </MyPageContainer>
      <MyPageFooter></MyPageFooter>
    </MyPageWrapper>
  );
}

export default MyPage;
