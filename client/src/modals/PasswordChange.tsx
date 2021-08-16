import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import { passwordChange } from '../redux/actions/action';

const PasswordWrapper = styled.div`
  width: 400px;
  background-color: white;
  border: solid 1px #dbdbdb;
  display: flex;
  flex-direction: column;
`;

const PasswordChangeHeader = styled.div`
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
  border: 1px solid palevioletred;
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
  const [newPassword, setNewPassword] = useState<string>('');

  const handleChangeNewPassword = (event: React.FormEvent<HTMLInputElement>) => {
    const str = event.currentTarget && event.currentTarget.value;
    setNewPassword(str);
  };
  const requestPasswordChange = () => {
    const userNewPassword = {
      password: newPassword,
    };
    dispatch(passwordChange(userNewPassword));
  };
  return (
    <PasswordWrapper>
      <PasswordChangeHeader>비밀번호 변경</PasswordChangeHeader>
      <InputOuterWrapper>
        <LabelContainer>
          <Label>현재 비밀번호</Label>
          <Label>새 비밀번호</Label>
          <Label>새 비밀번호 확인</Label>
        </LabelContainer>
        <InputWrapper>
          <Input type="password"></Input>
          <Input type="password"></Input>
          <Input type="password" onChange={handleChangeNewPassword}></Input>
        </InputWrapper>
      </InputOuterWrapper>
      <SubmitButtonWrapper>
        <Button primary onClick={requestPasswordChange}>
          변경 완료
        </Button>
      </SubmitButtonWrapper>
    </PasswordWrapper>
  );
}
