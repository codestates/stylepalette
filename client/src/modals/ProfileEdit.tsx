import React from 'react';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import { getUser } from '../redux/selectors';
import { handleModal, profileEdit, profileImageChange } from '../redux/actions/action';
import { UserState } from '../redux/reducers/initialState';
import { validEmail } from '../utils/validator';
import Text from '../components/Text/Text';
import { EmailIcon, UserIcon } from '../components/Icon/Icon';

const ProfileEditWrapper = styled.div`
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
  border: 1px solid #09214c;
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
  justify-content: center;
  align-items: center;
  padding: 0 0 10px;
`;
const EditButton = styled(Button)`
  width: auto;
`;
export default function ProfileEdit() {
  const user: UserState = useSelector(getUser);
  const dispatch = useDispatch();
  const { realname, email, userimage, userid } = user;
  const [newRealName, setNewRealName] = useState<string>(realname);
  const [newEmail, setNewEmail] = useState<string>(email);
  const [newUserImage, setNewUserImage] = useState<string>(userimage);
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [realnameMsg, setRealnameMsg] = useState<string>('');
  const [emailMsg, setEmailMsg] = useState<string>('');
  const disabled = newRealName === '' || newEmail === '' || realnameMsg !== '' || emailMsg !== '';

  const submitNewUserCredentials = () => {
    const userCredentials = {
      userid: userid,
      realname: newRealName,
      email: newEmail,
    };
    dispatch(profileEdit(userCredentials));
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

  const handleClickPasswordChange = () => {
    console.log('PASSWORD CHANGE');
    dispatch(handleModal({ isOpen: true, type: 'passwordChange' }));
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
        <Button secondary onClick={inputClick}>
          프로필 사진 업로드
        </Button>
        <ImageInput
          type="file"
          accept="image/*"
          ref={hiddenFileInput}
          onChange={loadFileHandler}
        ></ImageInput>
        <EditButton primary onClick={requestImageEdit}>
          프로필 사진 수정
        </EditButton>
      </ProfileEditHeader>
      <InputOuterWrapper>
        <InputMiddleWrapper>
          <LabelContainer>
            <Label>
              <UserIcon />
            </Label>
            <Label>
              <EmailIcon />
            </Label>
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
          </InputWrapper>
        </InputMiddleWrapper>
      </InputOuterWrapper>
      <SubmitButtonWrapper>
        <EditButton primary onClick={submitNewUserCredentials} disabled={disabled}>
          정보 수정 완료
        </EditButton>
        <EditButton secondary onClick={handleClickPasswordChange}>
          비밀 번호 수정
        </EditButton>
      </SubmitButtonWrapper>
    </ProfileEditWrapper>
  );
}
