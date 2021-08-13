import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import ProfilePhoto from '../images/TestPhoto.jpg';
import { handleModal } from '../redux/actions/action';
import Photo from '../dummyData/dummyPhoto';

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
`;

const UserPhoto = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 90px;
`;

const OtherUserInfoContent = styled.span`
  padding: 10px;
  font-size: 34px;
`;

function OtherUserPage() {
  const dispatch = useDispatch();

  const handleClickPostInfo = (event: React.MouseEvent) => {
    dispatch(handleModal({ isOpen: true, type: 'postInfo' }));
  };

  return (
    <OtherUserPageWrapper>
      <OtherUserPageContainer>
        <OtherUserInfoContainer>
          <OtherUserPhotoWrapper>
            <UserPhoto src={ProfilePhoto} />
          </OtherUserPhotoWrapper>
          <OtherUserInfoWrapper>
            <OtherUserInfoContent>전지호</OtherUserInfoContent> <br />
          </OtherUserInfoWrapper>
        </OtherUserInfoContainer>
        <OtherUserPostWrapper>
          {Photo.map((el, idx) => {
            return (
              <NavIcon onClick={handleClickPostInfo}>
                <PostPhoto src={el} />
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
