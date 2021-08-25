import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import Text from '../components/Text/Text';
import { validPassword } from '../utils/validator';
import { passwordChange, handleModal } from '../redux/actions/action';
import { getUser } from '../redux/selectors';
import { UserState } from '../redux/reducers/initialState';

const PasswordWrapper = styled.div`
  width: 400px;
  background-color: white;
  border: solid 1px #dbdbdb;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 320px;
  }
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
  const user: UserState = useSelector(getUser);
  const { userid } = user;
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
  const [passwordMsg, setPasswordMsg] = useState<string>('');
  const [passwordStrengthMsg, setPasswordStrengthMsg] = useState<string>('');
  const disabled =
    newPassword === '' ||
    newPasswordConfirm === '' ||
    passwordMsg !== '' ||
    passwordStrengthMsg !== '' ||
    (newPassword !== '' && newPasswordConfirm === '') ||
    (newPassword === '' && newPasswordConfirm !== '');

  const handleChangeNewPassword = (event: React.FormEvent<HTMLInputElement>) => {
    const str = event.currentTarget && event.currentTarget.value;
    setNewPassword(str);
    if (validPassword(event.currentTarget.value) || event.currentTarget.value === '') {
      setPasswordStrengthMsg('');
    } else if (event.currentTarget.value.length < 8 || event.currentTarget.value.length > 15) {
      setPasswordStrengthMsg('길이가 8자 이상 15자 이하여야 합니다.');
    } else {
      setPasswordStrengthMsg('알파벳, 숫자, 특수문자 조합이어야 합니다.');
    }
  };

  const handleChangeNewPasswordConfirm = (event: React.FormEvent<HTMLInputElement>) => {
    const str = event.currentTarget && event.currentTarget.value;
    setNewPasswordConfirm(str);
    if (newPassword === event.currentTarget.value) {
      setPasswordMsg('');
    } else {
      setPasswordMsg('비밀번호가 일치하지 않습니다.');
    }
  };
  const requestPasswordChange = () => {
    const userNewPassword = {
      userid: userid,
      password: newPassword,
    };
    dispatch(passwordChange(userNewPassword));
  };

  const handleClickProfileEdit = () => {
    dispatch(handleModal({ isOpen: true, type: 'profileEdit' }));
  };

  return (
    <PasswordWrapper>
      <PasswordChangeHeader>비밀번호 변경</PasswordChangeHeader>
      <InputOuterWrapper>
        <LabelContainer>
          <Label>새 비밀번호</Label>
          <Label>새 비밀번호 확인</Label>
        </LabelContainer>
        <InputWrapper>
          <Input type="password" onChange={handleChangeNewPassword}></Input>
          <MessageWrapper>
            <Text size="small">{passwordStrengthMsg}</Text>
          </MessageWrapper>
          <Input type="password" onChange={handleChangeNewPasswordConfirm}></Input>
          {newPassword !== '' && newPasswordConfirm !== '' ? (
            <MessageWrapper>
              <Text size="small">{passwordMsg}</Text>
            </MessageWrapper>
          ) : (
            <MessageWrapper></MessageWrapper>
          )}
        </InputWrapper>
      </InputOuterWrapper>
      <SubmitButtonWrapper>
        <Button primary onClick={requestPasswordChange} disabled={disabled}>
          변경 완료
        </Button>
        <Button onClick={handleClickProfileEdit}>회원 정보 수정</Button>
      </SubmitButtonWrapper>
    </PasswordWrapper>
  );
}
