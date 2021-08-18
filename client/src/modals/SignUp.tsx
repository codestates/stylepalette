import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Button from '../components/Button/Button';
import { signup } from '../redux/actions/action';
import { handleModal } from '../redux/actions/action';

const SignUpWrapper = styled.div`
  width: 400px;
  background-color: white;
  border: solid 1px #dbdbdb;
  display: flex;
  flex-direction: column;
`;

const SignUpContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 15px;
  margin: 15px;
`;

const SignUpHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
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

const MessageWrapper = styled.div`
  color: red;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

function SignUp() {
  const [realname, setRealname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [passwordMsg, setPasswordMsg] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    enAble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realname, email, username, password]);

  function enAble() {
    if (email === '' || realname === '' || username === '' || password === '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function handleChangeName(e: React.FormEvent<HTMLInputElement>) {
    setRealname(e.currentTarget.value);
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

  function handleChangePasswordCheck(e: React.FormEvent<HTMLInputElement>) {
    setPasswordCheck(e.currentTarget.value);
    if (password !== e.currentTarget.value) {
      setPasswordMsg('비밀번호가 일치하지 않습니다.');
    }
  }

  const requestSignup = async () => {
    const userInput = {
      realname,
      email,
      username,
      password,
      userimage: '',
    };

    dispatch(signup(userInput));
  };

  const handleClickLogIn = () => {
    dispatch(handleModal({ isOpen: true, type: 'login' }));
  };
  return (
    <SignUpWrapper>
      <SignUpHeader>회원 가입</SignUpHeader>
      <SignUpContainer>
        <InputWrapper>
          <SignUpInput
            type="text"
            name="이름"
            placeholder="성명"
            autoComplete="off"
            value={realname}
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
        <MessageWrapper></MessageWrapper>
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
        <MessageWrapper></MessageWrapper>
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
        <InputWrapper>
          <SignUpInput
            type="password"
            name="비밀번호 확인"
            placeholder="비밀번호 확인"
            autoComplete="off"
            value={passwordCheck}
            onChange={handleChangePasswordCheck}
          />
        </InputWrapper>
        <MessageWrapper>{passwordMsg}</MessageWrapper>
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
        <Button primary onClick={handleClickLogIn}>
          로그인
        </Button>
      </SignUpFooter>
    </SignUpWrapper>
  );
}

export default SignUp;
