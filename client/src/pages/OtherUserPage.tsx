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
  @media (max-width: 768px) {
    padding: 0px;
    margin: 0px;
  }
`;

const OtherUserPageFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const OtherUserInfoContainer = styled.div`
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

const OtherUserPhotoWrapper = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    padding: 10px 20px 10px 45px;
  }
`;

const OtherUserInfoWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OtherUserPostOuterWrapper = styled.div`
  display: table;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  min-width: 768px;
  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const OtherUserPostWrapper = styled.div`
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

const OtherUserInfoContent = styled.div`
  font-size: 25px;
  display: inline-block;
  padding: 10px 0;
  word-wrap: break-word;

  @media (min-width: 768px) {
    padding: 10px;
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

  const handleClickPostInfo = (postid: number) => {
    dispatch(
      getPost({
        postId: postid,
      }),
    );
    dispatch(handleModal({ isOpen: true, type: 'postInfo', data: postid }));
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
        <OtherUserPostOuterWrapper>
          <OtherUserPostWrapper>
            {otheruser.post
              .map((el: any, idx: React.Key | null | undefined) => {
                return (
                  <NavIcon key={idx} onClick={() => handleClickPostInfo(el.id)}>
                    <PostPhoto src={el.image} />
                  </NavIcon>
                );
              })
              .reverse()}
          </OtherUserPostWrapper>
        </OtherUserPostOuterWrapper>
      </OtherUserPageContainer>
      <OtherUserPageFooter></OtherUserPageFooter>
    </OtherUserPageWrapper>
  );
}

export default OtherUserPage;
