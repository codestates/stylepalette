import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { handleModal, getUserInfo } from '../redux/actions/action';
import { PrimaryButton } from '../components/Button/Button.styled';
// import Photo from '../dummyData/dummyPhoto';
import { getUser } from '../redux/selectors';

const MyPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: white;
  flex-direction: column;
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
  width: 250px;
  height: 250px;
  text-align: center;
  padding: 50px 10px 10px 50px;

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
  border-radius: 50%;
`;

const UserInfoContent = styled.span`
  padding: 10px;
  font-size: 34px;

  @media (max-width: 768px) {
    font-size: 34px;
  }
`;

const UserEditButton = styled(PrimaryButton)`
  width: 175px;
  height: 75px;
`;

function MyPage() {
  useEffect(() => {
    // get user info
    dispatch(getUserInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const handleClickPostInfo = (event: React.MouseEvent) => {
    dispatch(handleModal({ isOpen: true, type: 'postInfo' }));
  };

  const handleClickProfileEditButton = () => {
    dispatch(handleModal({ isOpen: true, type: 'passwordCheck' }));
  };

  return (
    <MyPageWrapper>
      <MyPageContainer>
        <UserInfoContainer>
          <UserPhotoWrapper>
            <UserPhoto src={user.userimage} />
          </UserPhotoWrapper>
          <UserInfoWrapper>
            <UserInfoContent>{user.username}</UserInfoContent> <br />
            <UserEditButton onClick={handleClickProfileEditButton}>정보 수정</UserEditButton>
          </UserInfoWrapper>
        </UserInfoContainer>
        <UserPostWrapper>
          {user.post.map((el: any, idx: React.Key | null | undefined) => {
            return (
              <NavIcon key={idx} onClick={handleClickPostInfo}>
                <PostPhoto src={el.image} />
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
