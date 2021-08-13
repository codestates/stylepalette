import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import { getUser } from '../redux/selectors';
import { handleModal } from '../redux/actions/action';

const ProfileEditWrapper = styled.div`
  width: 400px;
  background-color: white;
  border: solid 1px #dbdbdb;
  display: flex;
  flex-direction: column;
`;

const ProfileEditHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
`;

const ProfilePhoto = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 90px;
  margin: 10px;
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

export default function ProfileEdit() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const handleClickPasswordChange = () => {
    dispatch(handleModal({ isOpen: true, type: 'passwordChange' }));
  };

  return (
    <ProfileEditWrapper>
      <ProfileEditHeader>
        <div>회원 정보 수정</div>
        <ProfilePhoto src={user.userimage} alt="user-profile-pic"></ProfilePhoto>
        <Button>프로필 사진 수정</Button>
      </ProfileEditHeader>
      <InputOuterWrapper>
        <LabelContainer>
          <Label>이름</Label>
          <Label>유저네임</Label>
          <Label>이메일</Label>
        </LabelContainer>
        <InputWrapper>
          <Input type="text" value={user.realname}></Input>
          <Input type="text" value={user.username}></Input>
          <Input type="text" value={user.email}></Input>
        </InputWrapper>
      </InputOuterWrapper>
      <SubmitButtonWrapper>
        <Button primary>정보 수정 완료</Button>
        <Button onClick={handleClickPasswordChange}>비밀 번호 변경</Button>
      </SubmitButtonWrapper>
    </ProfileEditWrapper>
  );
}
