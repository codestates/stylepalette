import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface SignUpProps {
  open?: boolean;
  close?: any;
}

const SignUpWrapper = styled.div<SignUpProps>`
  display: flex;
  z-index: 10;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  text-align: center;
`;

const SignUpContainer = styled(SignUpWrapper)`
  width: 700px;
  height: 700px;
  background-color: #fafafa;
  border-style: solid;
  border-width: 1px;
  border-color: #dbdbdb;
  border-radius: 4px;
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: #fafafa;
  padding: 20px 0 0 630px;
  border-style: none;
  font-size: 20px;
  color: #7b7b7b;
`;

const SignUpBox = styled(SignUpContainer)`
  position: relative;
  margin: auto 0 5px;
  width: 350px;
  height: 400px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: #dbdbdb;
  padding: 8px 12px;
`;

const SignUpBox2 = styled(SignUpContainer)`
  position: relative;
  margin: 5px 0 auto;
  width: 350px;
  height: 70px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: #dbdbdb;
  padding: 8px 12px;
`;

const SignUpLogo = styled.h1`
  font-size: 40px;
  width: 300px;
  height: 80px;
  margin: 5px 0;
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

const SignUpButton = styled.button`
  background-color: #0095f6;
  color: white;
  width: 266px;
  height: 36px;
  margin: 12px 0 0;
  border-width: 0px;
  border-radius: 3px;

  &:active {
    outline: none;
    background-color: #4cb4f8;
  }
`;

const SignUpP = styled.p`
  font-size: 16px;
  margin: 12px 0;
`;

const SignUpA = styled.a`
  text-decoration: none;
  font-size: 16px;
  color: #1f9ef6;
`;

function SignUp(props: SignUpProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  const { open, close } = props;

  console.log('open:', open);
  console.log('close:', close);

  function inputName(e: any) {
    setName(e.target.value);
  }

  function inputEmail(e: any) {
    setEmail(e.target.value);
  }

  function inputUsername(e: any) {
    setUsername(e.target.value);
  }

  function inputPassword(e: any) {
    setPassword(e.target.value);
  }

  return (
    <>
      {open ? (
        <SignUpWrapper>
          <SignUpContainer>
            <CloseButton onClick={close}>X</CloseButton>
            <SignUpBox>
              <SignUpLogo>회원 가입</SignUpLogo>
              <SignUpInput
                type="text"
                name="이름"
                placeholder="성명"
                autoComplete="off"
                value={name}
                onChange={inputName}
              />
              <SignUpInput
                type="text"
                name="이메일"
                placeholder="이메일"
                autoComplete="off"
                value={email}
                onChange={inputEmail}
              />
              <SignUpInput
                type="text"
                name="아이디"
                placeholder="아이디"
                autoComplete="off"
                value={username}
                onChange={inputUsername}
              />
              <SignUpInput
                type="password"
                name="비밀번호"
                placeholder="비밀번호"
                autoComplete="off"
                value={password}
                onChange={inputPassword}
              />
              {disabled ? (
                <SignUpButton type="submit">가입</SignUpButton>
              ) : (
                <SignUpButton type="submit" disabled>
                  가입
                </SignUpButton>
              )}
            </SignUpBox>
            <SignUpBox2>
              <SignUpP>
                계정이 있으신가요?
                <SignUpA href="https://www.naver.com"> 로그인</SignUpA>
              </SignUpP>
            </SignUpBox2>
          </SignUpContainer>
        </SignUpWrapper>
      ) : null}
    </>
  );
}

export default SignUp;
