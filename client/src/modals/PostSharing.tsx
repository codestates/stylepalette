import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { serverUrl } from '../utils/constants';
import Modal from './Modal';
import Button from '../components/Button/Button';
import axios from 'axios';

const PostWrapper = styled.div`
  width: 400px;
  background-color: white;
  border: solid 1px #dbdbdb;
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid palevioletred;
  padding: 15px;
  margin: 15px;
`;

const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.div`
  padding: 10px 0;
`;

const PostImage = styled.img`
  width: 300px;
  height: 300px;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const PostInput = styled.input`
  width: 300px;
  height: 36px;
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;
  border-color: #dbdbdb;
  padding: 10px;
  margin: 3px;
  background-color: #fafafa;
  text-align: center;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px #a8a8a8;
    background-color: #fafafa;
  }
`;

function PostSharing() {
  const [postTitle, setPostTitle] = useState<string>('');
  const [img, setImg] = useState<string>(
    'https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png',
  );

  function handleChangePostName(e: React.FormEvent<HTMLInputElement>) {
    setPostTitle(e.currentTarget.value);
  }

  const requestSignup = async (isPublic: boolean) => {
    const result = await axios.post(`${serverUrl}/post`, {
      isPublic,
      title: postTitle,
      image: img,
    });
  };

  return (
    <Modal>
      <PostWrapper>
        <CloseButtonWrapper>
          <Button close>X</Button>
        </CloseButtonWrapper>
        <PostHeader>게시물 공유</PostHeader>
        <PostContainer>
          <InputWrapper>
            <PostInput
              type="text"
              name="게시물 제목"
              placeholder="게시물 제목을 입력해주세요"
              autoComplete="off"
              value={postTitle}
              onChange={handleChangePostName}
            ></PostInput>
          </InputWrapper>
          <InputWrapper>
            <PostImage src={img} />
          </InputWrapper>
        </PostContainer>
        <PostFooter>
          <Button primary onClick={() => requestSignup(true)}>
            공유하기
          </Button>
          <Button primary onClick={() => requestSignup(false)}>
            저장하기
          </Button>
        </PostFooter>
      </PostWrapper>
    </Modal>
  );
}

export default PostSharing;
