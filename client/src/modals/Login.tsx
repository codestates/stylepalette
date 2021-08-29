import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import { PrimaryButton, SecondaryButton } from '../components/Button/Button.styled';
import { logIn, googleLogin, kakaoLogin } from '../redux/actions/action';
import { handleModal } from '../redux/actions/action';
import Text from '../components/Text/Text';
import { getMessage } from '../redux/selectors';
import { clientUrl } from '../utils/constants';
import { UserIcon, KeyIcon } from '../components/Icon/Icon';

import dotenv from 'dotenv';
dotenv.config();

const LoginWrapper = styled.div`
  width: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 10px;
  border: solid 1px #dbdbdb;

  @media (max-width: 768px) {
    width: 320px;
  }
`;

const LoginHeader = styled.h1`
  display: flex;
  justify-content: center;
  padding-top: 2em;
  color: #ff7e67;
  font-family: 'Lobster', cursive;
`;

const LoginSubHeader = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 0 20px;
`;

const InputWrapper = styled.div`
  padding: 10px 0;
`;

const Label = styled.label`
  padding-right: 5px;
`;

const MessageWrapper = styled.div`
  color: red;
`;

const SocialButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const LoginButton = styled(PrimaryButton)`
  width: 120px;
  text-align: center;
`;

const SocialLoginButton = styled(SecondaryButton)`
  width: 120px;
  text-align: center;
`;

const LoginFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const Dot = styled.div`
  position: absolute;
  border-radius: 100%;
  z-index: 11;
  background-color: #ff7e67;
  top: -65px;
  right: -80px;
  width: 160px;
  height: 160px;
`;

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const disabled = username === '' || password === '';
  const dispatch = useDispatch();

  const loginMessage = useSelector(getMessage).loginMessage;

  const handleChangeUsername = (event: React.FormEvent<HTMLInputElement>) => {
    const str = event.currentTarget && event.currentTarget.value;
    setUsername(str);
  };

  const handleChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    const str = event.currentTarget && event.currentTarget.value;
    setPassword(str);
  };

  const requestSignin = () => {
    const userCredentials = {
      username,
      password,
    };
    dispatch(logIn(userCredentials));
  };

  const handleClickSignUp = () => {
    dispatch(handleModal({ isOpen: true, type: 'signup' }));
  };

  const handleClickGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${clientUrl}&client_id=${GOOGLE_CLIENT_ID}`;

    window.location.assign(GOOGLE_LOGIN_URL);
  };
  const handleClickKakaoLogin = () => {
    const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${clientUrl}&response_type=code&state`;

    window.location.assign(KAKAO_LOGIN_URL);
  };

  return (
    <LoginWrapper>
      <LoginHeader>StylePalette</LoginHeader>
      <LoginSubHeader>로그인</LoginSubHeader>
      <LoginContainer>
        <InputWrapper>
          <Label>
            <UserIcon />
          </Label>
          <input
            type="text"
            value={username}
            placeholder="유저네임"
            onChange={handleChangeUsername}
          ></input>
        </InputWrapper>
        <InputWrapper>
          <Label>
            <KeyIcon />
          </Label>
          <input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={handleChangePassword}
          ></input>
        </InputWrapper>
        <MessageWrapper>
          <Text size="small" color="red">
            {loginMessage}
          </Text>
        </MessageWrapper>
        <SocialButtonContainer>
          <LoginButton onClick={requestSignin} disabled={disabled}>
            로그인
          </LoginButton>
          <SocialLoginButton onClick={handleClickKakaoLogin}>카카오로그인</SocialLoginButton>
          <SocialLoginButton onClick={handleClickGoogleLogin}>구글로그인</SocialLoginButton>
        </SocialButtonContainer>
      </LoginContainer>
      <LoginFooter>
        <span>아직 회원이 아니신가요?</span>
        <Button secondary onClick={handleClickSignUp}>
          회원가입
        </Button>
      </LoginFooter>
    </LoginWrapper>
  );
}
