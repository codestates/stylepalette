import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import { logIn, googleLogin, kakaoLogin } from '../redux/actions/action';
import { handleModal } from '../redux/actions/action';
import Text from '../components/Text/Text';
import { getMessage } from '../redux/selectors';

const LoginWrapper = styled.div`
  width: 400px;
  background-color: white;
  border: solid 1px #dbdbdb;
  display: flex;
  flex-direction: column;
`;

const LoginHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 15px;
  margin: 15px;
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

const LoginFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const disabled = username === '' || password === '';
  const dispatch = useDispatch();

  const loginMsg = useSelector(getMessage);

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

  const social = () => {
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const GOOGLE_LOGIN_URL = 
    `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https://localhost:3000&client_id=${GOOGLE_CLIENT_ID}`
    window.location.assign(GOOGLE_LOGIN_URL);
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    const scope = url.searchParams.get("scope")

    if (authorizationCode) {
      dispatch(googleLogin(authorizationCode))
    }
  
    
  }

  return (
    <LoginWrapper>
      <LoginHeader>로그인</LoginHeader>
      <LoginContainer>
        <InputWrapper>
          <Label>유저네임</Label>
          <input
            type="text"
            value={username}
            placeholder="아이디"
            onChange={handleChangeUsername}
          ></input>
        </InputWrapper>
        <InputWrapper>
          <Label>비밀번호</Label>
          <input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={handleChangePassword}
          ></input>
        </InputWrapper>
        <MessageWrapper>
          <Text size="small">{loginMsg}</Text>
        </MessageWrapper>
        <SocialButtonContainer>
          <Button primary onClick={requestSignin} disabled={disabled}>
            로그인
          </Button>
          <Button primary onClick={kakaoLogin}>카카오로그인</Button>
          <Button primary onClick={social}>구글로그인</Button>
        </SocialButtonContainer>
      </LoginContainer>
      <LoginFooter>
        <span>아직 회원이 아니신가요?</span>
        <Button primary onClick={handleClickSignUp}>
          회원가입
        </Button>
      </LoginFooter>
    </LoginWrapper>
  );
}
