import React from 'react';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import { getUser } from '../redux/selectors';
import { handleModal, profileEdit, profileImageChange } from '../redux/actions/action';
import { UserState } from '../redux/reducers/initialState';
import { validPassword, validEmail } from '../utils/validator';
import Text from '../components/Text/Text';

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 15px;
  margin: 15px;
`;

const InputMiddleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LabelContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
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

const ImageInput = styled.input`
  display: none;
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

export default function ProfileEdit() {
  const user: UserState = useSelector(getUser);
  const dispatch = useDispatch();
  const { realname, email, userimage, userid } = user;
  const [newRealName, setNewRealName] = useState<string>(realname);
  const [newEmail, setNewEmail] = useState<string>(email);
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
  const [newUserImage, setNewUserImage] = useState<string>(userimage);
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [realnameMsg, setRealnameMsg] = useState<string>('');
  const [emailMsg, setEmailMsg] = useState<string>('');
  const [passwordMsg, setPasswordMsg] = useState<string>('');
  const [passwordStrengthMsg, setPasswordStrengthMsg] = useState<string>('');
  const disabled =
    newRealName === '' ||
    newEmail === '' ||
    // newPassword === '' ||
    // newPasswordConfirm === '' ||
    realnameMsg !== '' ||
    emailMsg !== '' ||
    passwordMsg !== '' ||
    passwordStrengthMsg !== '';

  const submitNewUserCredentials = () => {
    const userCredentials = {
      userid: userid,
      realname: newRealName,
      email: newEmail,
      password: newPassword,
    };
    dispatch(profileEdit(userCredentials));
    dispatch(handleModal({ isOpen: false }));
  };

  const handleRealNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    const str = e.currentTarget && e.currentTarget.value;
    setNewRealName(str);
    if (e.currentTarget.value.length > 0) {
      setRealnameMsg('');
    } else {
      setRealnameMsg('이름을 입력해주세요.');
    }
  };

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    const str = e.currentTarget && e.currentTarget.value;
    setNewEmail(str);
    if (validEmail(e.currentTarget.value) || e.currentTarget.value === '') {
      setEmailMsg('');
    } else {
      setEmailMsg('@을 포함한 이메일을 입력해주세요.');
    }
  };

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

  //프로필 사진 업로드
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const inputClick = () => {
    hiddenFileInput?.current?.click();
  };

  const loadFileHandler = async (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    const fileUploaded = e.currentTarget.files[0];
    setUploadedImage(fileUploaded);
    if (!fileUploaded) return;
    const url = URL.createObjectURL(fileUploaded);
    setNewUserImage(url);
    console.log('NEW USERIMAGE', newUserImage);
  };

  const requestImageEdit = () => {
    dispatch(profileImageChange({ userid, file: uploadedImage }));
  };

  return (
    <ProfileEditWrapper>
      <ProfileEditHeader>
        <div>회원 정보 수정</div>
        <ProfilePhoto src={newUserImage} alt="user-profile-pic"></ProfilePhoto>
        <Button onClick={inputClick}>프로필 사진 업로드</Button>
        <ImageInput
          type="file"
          accept="image/*"
          ref={hiddenFileInput}
          onChange={loadFileHandler}
        ></ImageInput>
        <Button primary onClick={requestImageEdit}>
          프로필 사진 수정
        </Button>
      </ProfileEditHeader>
      <InputOuterWrapper>
        <InputMiddleWrapper>
          <LabelContainer>
            <Label>이름</Label>
            <Label>이메일</Label>
            <Label>새 비밀번호</Label>
            <Label>새 비밀번호 확인</Label>
          </LabelContainer>
          <InputWrapper>
            <Input type="text" value={newRealName} onChange={handleRealNameChange}></Input>
            <MessageWrapper>
              <Text size="small">{realnameMsg}</Text>
            </MessageWrapper>
            <Input type="text" value={newEmail} onChange={handleEmailChange}></Input>
            <MessageWrapper>
              <Text size="small">{emailMsg}</Text>
            </MessageWrapper>
            <Input type="password" onChange={handleChangeNewPassword}></Input>
            <MessageWrapper>
              <Text size="small">{passwordStrengthMsg}</Text>
            </MessageWrapper>
            <Input type="password" onChange={handleChangeNewPasswordConfirm}></Input>
            <MessageWrapper>
              <Text size="small">{passwordMsg}</Text>
            </MessageWrapper>
          </InputWrapper>
        </InputMiddleWrapper>
      </InputOuterWrapper>
      <SubmitButtonWrapper>
        <Button primary onClick={submitNewUserCredentials} disabled={disabled}>
          정보 수정 완료
        </Button>
      </SubmitButtonWrapper>
    </ProfileEditWrapper>
  );
}
