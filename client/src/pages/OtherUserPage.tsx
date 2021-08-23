import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { handleModal, getOtherUserInfo, getPost } from '../redux/actions/action';
import { getOtherUser, getPostState } from '../redux/selectors';


const OtherUserPageWrapper = styled.div`
  width: 100%;
  height: 100vw;
  display: flex;
  background-color: white;
  flex-direction: column;
  left: 0;
  top: 0;
`;

const OtherUserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  margin: 15px;
`;

const OtherUserPageFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const OtherUserInfoContainer = styled.div`
  display: flex;
  padding: 0 15px 15px 15px;
  margin: 0 15px 15px 15px;
  width: 95%;
  border-style: groove;
  border-width: 0 0 2px 0;
  border-color: #dbdbdb;
`;

const OtherUserPhotoWrapper = styled.div`
  padding: 50px;

  @media (max-width: 768px) {
    padding: 50px 50px 50px 125px;
  }
`;

const OtherUserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 30px;
`;

const OtherUserPostWrapper = styled.div`
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
  width: 290px;
  height: 290px;

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

const OtherUserInfoContent = styled.span`
  padding: 10px;
  font-size: 34px;

  @media (max-width: 768px) {
    font-size: 34px;
  }
`;

function OtherUserPage() {
  useEffect(() => {
    // get user info
    dispatch(getUserInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  // const post = useSelector(getPostState);
  // const user = post.user;
  // const userid = post.userid;
  // @ts-ignore
  const { userId } = useParams();

  useEffect(() => {
    // get user info
    dispatch(getOtherUserInfo({ userid: userId }));
    dispatch(handleModal({ isOpen: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const otheruser = useSelector(getOtherUser);

  const handleClickPostInfo = (event: React.MouseEvent) => {
    dispatch(handleModal({ isOpen: true, type: 'postInfo' }));
    // dispatch(getPost());

  };

  return (
    <OtherUserPageWrapper>
      <OtherUserPageContainer>
        <OtherUserInfoContainer>
          <OtherUserPhotoWrapper>
            <UserPhoto src={otheruser.userimage} />
          </OtherUserPhotoWrapper>
          <OtherUserInfoWrapper>
            <OtherUserInfoContent>{otheruser.username}</OtherUserInfoContent> <br />
          </OtherUserInfoWrapper>
        </OtherUserInfoContainer>
        <OtherUserPostWrapper>
          {otheruser.post.map((el: any, idx: React.Key | null | undefined) => {

            return (
              <NavIcon key={idx} onClick={handleClickPostInfo}>
                <PostPhoto src={el.image} />
              </NavIcon>
            );
          })}
        </OtherUserPostWrapper>
      </OtherUserPageContainer>
      <OtherUserPageFooter></OtherUserPageFooter>
    </OtherUserPageWrapper>
  );
}

export default OtherUserPage;
