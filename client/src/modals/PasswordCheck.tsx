import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import { passwordCheck } from '../redux/actions/action';
import { getUser } from '../redux/selectors';

const PasswordCheckWrapper = styled.div`
  width: 400px;
  background-color: white;
  border: solid 1px #dbdbdb;
  display: flex;
  flex-direction: column;
`;

const PasswordCheckHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
`;

const InputOuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 15px;
  margin: 15px;
`;
const LabelContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Label = styled.label`
  padding: 5px;
`;

const InputWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  margin: 5px;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0 10px;
`;

export default function PasswordChange() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState<string>('');

  const handleCheckPassword = (event: React.FormEvent<HTMLInputElement>) => {
    const str = event.currentTarget && event.currentTarget.value;
    setPassword(str);
  };

  const user = useSelector(getUser);

  const requestPasswordCheck = () => {
    const userInfo = {
      username: user.username,
      password: password,
    };
    dispatch(passwordCheck(userInfo));
  };
  return (
    <PasswordCheckWrapper>
      <PasswordCheckHeader>현재 비밀번호를 입력해주세요</PasswordCheckHeader>
      <InputOuterWrapper>
        <LabelContainer>
          <Label>비밀번호</Label>
        </LabelContainer>
        <InputWrapper>
          <Input type="password" onChange={handleCheckPassword}></Input>
        </InputWrapper>
      </InputOuterWrapper>
      <SubmitButtonWrapper>
        <Button primary onClick={requestPasswordCheck}>
          확인
        </Button>
      </SubmitButtonWrapper>
    </PasswordCheckWrapper>
  );
}
