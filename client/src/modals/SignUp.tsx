import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button/Button';
import { signup } from '../redux/actions/action';
import { handleModal } from '../redux/actions/action';
import { getMessage } from '../redux/selectors';
import { validId, validPassword, validEmail } from '../utils/validator';
import Text from '../components/Text/Text';

const SignUpWrapper = styled.div`
  width: 400px;
  background-color: white;
  border-radius: 10px;
  border: solid 1px #dbdbdb;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 320px;
  }
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 15px;
`;

const SignUpHeader = styled.h1`
  display: flex;
  justify-content: center;
  padding-top: 2em;
  color: #ff7e67;
  font-family: 'Lobster', cursive;
`;

const SignUpSubHeader = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 5px;
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
  border-width: 1px;
  border-color: #09214c;
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
  word-wrap: auto;
  width: 266px;
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
  const [realnameMsg, setRealnameMsg] = useState<string>('');
  const [usernameMsg, setUsernameMsg] = useState<string>('');
  const [emailMsg, setEmailMsg] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [passwordMsg, setPasswordMsg] = useState<string>('');
  const [passwordStrengthMsg, setPasswordStrengthMsg] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    enAble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realname, email, username, password, passwordCheck]);

  function enAble() {
    if (
      email === '' ||
      realname === '' ||
      username === '' ||
      password === '' ||
      passwordCheck === '' ||
      realnameMsg !== '' ||
      usernameMsg !== '' ||
      emailMsg !== '' ||
      passwordMsg !== '' ||
      passwordStrengthMsg !== ''
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const signupMessage = useSelector(getMessage).signupMessage;

  function handleChangeName(e: React.FormEvent<HTMLInputElement>) {
    setRealname(e.currentTarget.value);
    if (e.currentTarget.value.length > 0) {
      setRealnameMsg('');
    } else {
      setRealnameMsg('이름을 입력해주세요.');
    }
  }

  function handleChangeEmail(e: React.FormEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value);
    if (validEmail(e.currentTarget.value) || e.currentTarget.value === '') {
      setEmailMsg('');
    } else {
      setEmailMsg('@을 포함한 이메일을 입력해주세요.');
    }
  }

  function handleChangeUsername(e: React.FormEvent<HTMLInputElement>) {
    setUsername(e.currentTarget.value);
    if (validId(e.currentTarget.value) || e.currentTarget.value === '') {
      setUsernameMsg('');
    } else if (e.currentTarget.value.length < 4 || e.currentTarget.value.length > 15) {
      setUsernameMsg('길이가 4자 이상 15이하여야 합니다.');
    } else {
      setUsernameMsg('알파벳 혹은 숫자만 가능합니다.');
    }
  }

  function handleChangePassword(e: React.FormEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
    if (validPassword(e.currentTarget.value) || e.currentTarget.value === '') {
      setPasswordStrengthMsg('');
    } else if (e.currentTarget.value.length < 8 || e.currentTarget.value.length > 15) {
      setPasswordStrengthMsg('길이가 8자 이상 15자 이하여야 합니다.');
    } else {
      setPasswordStrengthMsg('알파벳, 숫자, 특수문자 조합이어야 합니다.');
    }
  }

  function handleChangePasswordCheck(e: React.FormEvent<HTMLInputElement>) {
    const passwordCheckInput = e.currentTarget.value;
    setPasswordCheck(passwordCheckInput);
    if (password === passwordCheckInput) {
      setPasswordMsg('');
    } else {
      setPasswordMsg('비밀번호가 일치하지 않습니다.');
    }
  }

  const requestSignup = () => {
    const userInput = {
      realname,
      email,
      username,
      password,
    };

    dispatch(signup(userInput));
  };

  const handleClickLogIn = () => {
    dispatch(handleModal({ isOpen: true, type: 'login' }));
  };

  return (
    <SignUpWrapper>
      <SignUpHeader>StylePalette</SignUpHeader>
      <SignUpSubHeader>회원가입</SignUpSubHeader>
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
        <MessageWrapper>
          <Text size="small" color="red">
            {realnameMsg}
          </Text>
        </MessageWrapper>
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
        <MessageWrapper>
          <Text size="small" color="red">
            {emailMsg}
          </Text>
        </MessageWrapper>
        <InputWrapper>
          <SignUpInput
            type="text"
            name="유저네임"
            placeholder="유저네임"
            autoComplete="off"
            value={username}
            onChange={handleChangeUsername}
          />
        </InputWrapper>
        <MessageWrapper>
          <Text size="small" color="red">
            {usernameMsg}
          </Text>
        </MessageWrapper>
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
        <MessageWrapper>
          <Text size="small" color="red">
            {passwordStrengthMsg}
          </Text>
        </MessageWrapper>
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
        <MessageWrapper>
          <Text size="small" color="red">
            {passwordMsg}
          </Text>
        </MessageWrapper>
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
        <MessageWrapper>{signupMessage}</MessageWrapper>
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
