import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import { passwordCheck } from '../redux/actions/action';
import { getUser, getMessage } from '../redux/selectors';
import Text from '../components/Text/Text';
import { KeyIcon } from '../components/Icon/Icon';

const PasswordCheckWrapper = styled.div`
  width: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: solid 1px #dbdbdb;

  @media (max-width: 768px) {
    width: 320px;
  }
`;

const PasswordCheckHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em 1em 1em 1em;
`;

const InputOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  padding: 5px;
`;

const InputWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  margin: 5px;
`;

const MessageWrapper = styled.div`
  color: red;
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
  const passwordMessage = useSelector(getMessage).passwordMessage;

  const requestPasswordCheck = () => {
    // console.log('PASSWORDCHECK', user.username);
    // console.log('PASSWORDCHECK', password);

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
        <InputWrapper>
          <Label>
            <KeyIcon />
          </Label>
          <Input type="password" onChange={handleCheckPassword}></Input>
        </InputWrapper>
        {passwordMessage.length > 0 && (
          <MessageWrapper>
            <Text size="small" color="red">
              {passwordMessage}
            </Text>
          </MessageWrapper>
        )}
      </InputOuterWrapper>

      <SubmitButtonWrapper>
        <Button onClick={requestPasswordCheck}>확인</Button>
      </SubmitButtonWrapper>
    </PasswordCheckWrapper>
  );
}
