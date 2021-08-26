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
  padding: 15px;
  margin: 0 15px 20px 15px;
  width: 70%;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.8);
  border: 2px groove black;
  border-width: 0 0 2px 0;
  border-radius: 5px;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0px;
    margin: 2px;
    width: 98%;
    justify-content: center;
  }
`;

const OtherUserPhotoWrapper = styled.div`
  padding: 10px 20px 10px 45px;

  @media (max-width: 768px) {
    padding: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 200px;
  }
`;

const OtherUserInfoWrapper = styled.div`
  display: flex;
  /* height: 355px; */
  flex-direction: column;
  align-items: center;
  /* padding: 40px 50px; */
  @media (max-width: 768px) {
    height: auto;
  }
`;

const OtherUserPostWrapper = styled.div`
  display: inline-block;
  width: 70%;
  text-align: left;
  padding: 15px;
  margin: 15px;
  box-shadow: 0 1px 5px 3px black;
  border-radius: 5px;
  @media (max-width: 768px) {
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin: 5px;
    width: 98%;
  }
`;

const NavIcon = styled.button`
  margin: 20px 12px 40px 12px;
  width: 300px;
  height: 300px;
  background-color: white;
  border-style: none;

  @media (max-width: 768px) {
    margin: 10px;
  }
`;

const PostPhoto = styled.img`
  border: 2px solid #777777;
  border-radius: 5px;
  width: 295px;
  height: 295px;

  &:hover {
    opacity: 80%;
    border-color: #ababab;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    /* width: 200px;
    height: 200px; */
  }
`;

const UserPhoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid black;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const OtherUserInfoContent = styled.span`
  padding: 10px;
  font-size: 34px;

  @media (max-width: 768px) {
    font-size: 25px;
    display: inline-block;
    padding: 10px 0;
    max-width: 120px;
    word-wrap: break-word;
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
      </OtherUserPageContainer>
      <OtherUserPageFooter></OtherUserPageFooter>
    </OtherUserPageWrapper>
  );
}

export default OtherUserPage;
