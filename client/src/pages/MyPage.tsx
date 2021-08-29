import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { handleModal, getUserInfo, getPost } from '../redux/actions/action';

import { PrimaryButton } from '../components/Button/Button.styled';
import { getUser } from '../redux/selectors';

const MyPageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  background-color: white;
  flex-direction: column;
  left: 0;
  top: 0;
  padding-top: 5rem;
`;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin: 15px;
  @media (max-width: 768px) {
    padding: 0px;
    margin: 0px;
  }
`;

const MyPageFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #efefef;
  padding: 0px;
  margin: 2px;
  width: 98%;
  min-width: 98%;
  justify-content: flex-start;
  padding: 1rem 0 1rem 1rem;
  @media (min-width: 768px) {
    padding: 15px;
    width: 100%;
    max-width: 1200px;
    min-width: 768px;
  }
`;

const UserPhotoWrapper = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    padding: 10px 20px 10px 45px;
  }
`;

const UserInfoWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserPostOuterWrapper = styled.div`
  display: table;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  min-width: 768px;
  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const UserPostWrapper = styled.div`
  padding: 1rem;
  display: table-cell;
  width: 100%;
`;

const NavIcon = styled.button`
  display: inline-block;
  width: 31%;
  background-color: white;
  border-style: none;
  margin: 1%;
  @media (max-width: 768px) {
    width: 48%;
  }
`;

const PostPhoto = styled.img`
  border: 2px solid #efefef;
  border-radius: 5px;
  width: 100%;
  height: auto;
  object-fit: cover;

  &:hover {
    opacity: 80%;
    border-color: #ababab;
    cursor: pointer;
  }
`;

const UserPhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #efefef;

  @media (min-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const UserInfoContent = styled.div`
  font-size: 25px;
  display: inline-block;
  padding: 10px 0;
  word-wrap: break-word;

  @media (min-width: 768px) {
    padding: 10px;
    font-size: 34px;
  }
`;

const UserEditButton = styled(PrimaryButton)`
  width: 85px;
  height: 45px;
  @media (min-width: 768px) {
    width: 175px;
    height: 60px;
  }
`;

function MyPage() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    // get user info
    dispatch(getUserInfo({ userid: user.userid }));
  }, [dispatch, user.userid]);

  const handleClickPostInfo = (postid: number | null) => {
    dispatch(
      getPost({
        postId: postid,
      }),
    );
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
            <UserInfoContent>{user.username}</UserInfoContent>
            <UserEditButton onClick={handleClickProfileEditButton}>정보 수정</UserEditButton>
          </UserInfoWrapper>
        </UserInfoContainer>
        <UserPostOuterWrapper>
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
        </UserPostOuterWrapper>
      </MyPageContainer>
      <MyPageFooter></MyPageFooter>
    </MyPageWrapper>
  );
}

export default MyPage;
