import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { handleModal, getOtherUserInfo, getPost } from '../redux/actions/action';
import { getOtherUser, getPostState } from '../redux/selectors';

const OtherUserPageWrapper = styled.div`
  width: 100vw;
  display: flex;
  background-color: white;
  flex-direction: column;
  left: 0;
  top: 0;
  margin-top: 5rem;
`;

const OtherUserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin: 0 15px 30px 15px;
  width: 70%;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.8);
  border: 2px groove black;
  border-width: 0 0 2px 0;
  border-radius: 5px;
`;

const OtherUserPhotoWrapper = styled.div`
  width: 355px;
  height: 355px;
  text-align: center;
  padding: 50px 0 50px 70px;

  @media (max-width: 768px) {
    padding: 50px 50px 50px 125px;
  }
`;

const OtherUserInfoWrapper = styled.div`
  display: flex;
  height: 355px;
  flex-direction: column;
  align-items: center;
  padding: 40px 50px;
`;

const OtherUserPostWrapper = styled.div`
  display: inline-block;
  width: 70%;
  text-align: left;
  padding: 15px;
  margin: 15px;
  box-shadow: 0 1px 5px 3px black;
  border-radius: 5px;
`;

const NavIcon = styled.button`
  margin: 20px 12px 40px 12px;
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
  border: 2px solid #777777;
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

const OtherUserInfoContent = styled.span`
  padding: 10px;
  font-size: 34px;

  @media (max-width: 768px) {
    font-size: 34px;
  }
`;

function OtherUserPage() {
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
    window.scrollTo(0, 0);
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
          {otheruser.post
            .map((el: any, idx: React.Key | null | undefined) => {
              return (
                <NavIcon key={idx} onClick={handleClickPostInfo}>
                  <PostPhoto src={el.image} />
                </NavIcon>
              );
            })
            .reverse()}
        </OtherUserPostWrapper>
      </OtherUserPageContainer>
      <OtherUserPageFooter></OtherUserPageFooter>
    </OtherUserPageWrapper>
  );
}

export default OtherUserPage;
