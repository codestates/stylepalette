import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { handleModal, getUserInfo, getPost } from '../redux/actions/action';

import { PrimaryButton } from '../components/Button/Button.styled';
import { getUser } from '../redux/selectors';

const MyPageWrapper = styled.div`
  width: 100vw;
  display: flex;
  background-color: white;
  flex-direction: column;
  left: 0;
  top: 0;
`;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin: 0 15px 30px 15px;
  width: 70%;
  border: 2px groove black;
  border-width: 0 0 2px 0;
`;

const UserPhotoWrapper = styled.div`
  width: 355px;
  height: 355px;
  text-align: center;
  padding: 50px 0 50px 70px;

  @media (max-width: 768px) {
    padding: 50px 50px 50px 115px;
  }
`;

const UserInfoWrapper = styled.div`
  display: flex;
  height: 355px;
  flex-direction: column;
  align-items: center;
  padding: 40px 50px;
`;

const UserPostWrapper = styled.div`
  display: inline-block;
  width: 70%;
  text-align: left;
  padding: 15px;
  margin: 15px;
`;

const NavIcon = styled.button`
  margin: 0 10px 40px 0;
  width: 280px;
  height: 280px;
  background-color: white;
  border-style: none;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin: 0 60px 60px 60px;
  }
`;

const PostPhoto = styled.img`
  border: 2px solid black;
  border-radius: 5px;
  width: 275px;
  height: 275px;

  &:hover {
    opacity: 80%;
    border-color: #ababab;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const UserPhoto = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 2px solid black;
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
  height: 60px;
`;

function MyPage() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    // get user info
    dispatch(getUserInfo({ userid: user.userid }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickPostInfo = (postid: number | null) => {
    dispatch(handleModal({ isOpen: true, type: 'postInfo', data: postid }));
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
          {user.post
            .map((el: any, idx: React.Key | null | undefined) => {
              return (
                <NavIcon key={idx} onClick={() => handleClickPostInfo(el.id)}>
                  <PostPhoto src={el.image} />
                </NavIcon>
              );
            })
            .reverse()}
        </UserPostWrapper>
      </MyPageContainer>
      <MyPageFooter></MyPageFooter>
    </MyPageWrapper>
  );
}

export default MyPage;
