import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { serverUrl } from '../utils/constants';
import Modal from './Modal';
import { PrimaryButton, CloseButton } from '../components/Button/Button.styled';
import Button from '../components/Button/Button';
import axios from 'axios';

const SignUpWrapper = styled.div`
  width: 400px;
  background-color: white;
  border: solid 1px #dbdbdb;
  display: flex;
  flex-direction: column;
`;

const SignUpContainer = styled.div`
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

const SignUpHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.div`
  padding: 10px 0;
`;

const SignUpFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const SignUpInput = styled.input`
  width: 266px;
  height: 36px;
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;
  border-color: #dbdbdb;
  padding: 10px;
  margin: 3px;
  background-color: #fafafa;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px #a8a8a8;
    background-color: #fafafa;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

function SignUp() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    enAble();
  }, [name, email, username, password]);

  function enAble() {
    if (email === '' || name === '' || username === '' || password === '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function handleChangeName(e: React.FormEvent<HTMLInputElement>) {
    setName(e.currentTarget.value);
  }

  function handleChangeEmail(e: React.FormEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value);
  }

  function handleChangeUsername(e: React.FormEvent<HTMLInputElement>) {
    setUsername(e.currentTarget.value);
  }

  function handleChangePassword(e: React.FormEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  const requestSignup = async () => {
    const result = await axios.post(`${serverUrl}/signin`, {
      name: name,
      username: username,
      email: email,
      password: password,
    });

    console.log(result);
  };

  return (
    <Modal>
      <SignUpWrapper>
        <CloseButtonWrapper>
          <Button close>X</Button>
        </CloseButtonWrapper>
        <SignUpHeader>회원 가입</SignUpHeader>
        <SignUpContainer>
          <InputWrapper>
            <SignUpInput
              type="text"
              name="이름"
              placeholder="성명"
              autoComplete="off"
              value={name}
              onChange={handleChangeName}
            />
          </InputWrapper>
          <InputWrapper>
            <SignUpInput
              type="text"
              name="이메일"
              placeholder="이메일"
              autoComplete="off"
              value={email}
              onChange={handleChangeEmail}
            />
          </InputWrapper>
          <InputWrapper>
            <SignUpInput
              type="text"
              name="아이디"
              placeholder="아이디"
              autoComplete="off"
              value={username}
              onChange={handleChangeUsername}
            />
          </InputWrapper>
          <InputWrapper>
            <SignUpInput
              type="password"
              name="비밀번호"
              placeholder="비밀번호"
              autoComplete="off"
              value={password}
              onChange={handleChangePassword}
            />
          </InputWrapper>
          <ButtonContainer>
            {disabled ? (
              <Button primary onClick={requestSignup}>
                회원가입
              </Button>
            ) : (
              <Button primary disabled>
                회원가입
              </Button>
            )}
          </ButtonContainer>
        </SignUpContainer>
        <SignUpFooter>
          <span>계정이 있으신가요?</span>
          <Button primary>로그인</Button>
        </SignUpFooter>
      </SignUpWrapper>
    </Modal>
  );
}

export default SignUp;
