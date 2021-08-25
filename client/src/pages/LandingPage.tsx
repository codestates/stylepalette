import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { PrimaryButton } from '../components/Button/Button.styled';

import TestGif from '../images/TestGif/Test_01.gif';

const LandingPage_Section1 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 5rem 0 0 0;
  background-color: #dbdbdb;
`;

const LandingPage_Section2 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: pink;
`;

const LandingPage_Section3 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: skyblue;
`;

const LandingPage_Section4 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: blueviolet;
`;

const LandingPage_Section5 = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #dbdbdb;
  padding-top: 15rem;
  padding-bottom: 15rem;
`;

const LandingPage_Section_Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10rem 0 10rem;
`;

const LandingPage_Content_Container = styled.div`
  width: 600px;
  flex-direction: column;
`;

const LandingPage_Image_Container = styled.div`
  width: 792px;
  text-align: center;
  font-size: 5rem;
  border-radius: 15px;
`;

const LandingPage_Image_Test = styled.img`
  width: 792px;
  height: 510px;
  border: 2px solid #afafaf;
  border-radius: 15px;
`;

const LandingPage_Content_Title = styled.div`
  font-size: 4.3rem;
  font-weight: 700;
  margin-bottom: 3rem;
`;

const LandingPage_Content_SubTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 320;
  padding-left: 0.3rem;
  margin-bottom: 6rem;
`;

const LandingPage_Content_Normal_Title = styled.div`
  font-size: 2.7rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const LandingPage_Content_Normal_SubTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 320;
  margin-bottom: 0.4rem;
  padding-left: 0.2rem;
`;

const NextLink = styled(Link)`
  text-decoration: none;
  width: 325px;
  min-height: 60px;
  text-align: left;
  color: white;
`;

const NextButton = styled(PrimaryButton)`
  width: 325px;
  height: 60px;
  margin: 0.5em 1em 0.5em 0;
  font-size: 1.2rem;
`;

const Section5_Content = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 5rem;
`;

const Section5_NextLink = styled(Link)`
  text-decoration: none;
  width: 300px;
  min-height: 70px;
  color: white;
`;

const Section5_NextButton = styled(PrimaryButton)`
  width: 300px;
  height: 70px;
  margin: 0.5em 1em 0.5em 0;
  font-size: 1.2rem;
`;

function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleClickScrollTo() {
    window.scrollTo(0, 0);
  }

  return (
    <>
      <LandingPage_Section1>
        <LandingPage_Section_Container>
          <LandingPage_Content_Container>
            <LandingPage_Content_Title>
              어떤 옷을 입을지
              <br />
              고민하고 계신가요?
            </LandingPage_Content_Title>
            <LandingPage_Content_SubTitle>
              옷 색상만 잘 선택해도 옷을 잘 입을 수 있습니다,
              <br />
              옷장에 있는 옷의 색상을 미리 매치시켜보세요!
            </LandingPage_Content_SubTitle>
            <NextLink to="/genderselect">
              <NextButton onClick={handleClickScrollTo}>시작하기</NextButton>
            </NextLink>
          </LandingPage_Content_Container>
          <LandingPage_Image_Container>
            <LandingPage_Image_Test src={TestGif} />
          </LandingPage_Image_Container>
        </LandingPage_Section_Container>
      </LandingPage_Section1>
      <LandingPage_Section2>
        <LandingPage_Section_Container>
          <LandingPage_Image_Container>이미지 공간</LandingPage_Image_Container>
          <LandingPage_Content_Container>
            <LandingPage_Content_Normal_Title>
              피부톤 혹은 가지고 있는 옷의
              <br />
              색상을 선택하세요.
            </LandingPage_Content_Normal_Title>
            <LandingPage_Content_Normal_SubTitle>
              원하는 옷을 선택하고, 옷에 적용하고 싶은 색상을 선택하면
              <br />
              자신의 코디가 완성됩니다.
              <br />
            </LandingPage_Content_Normal_SubTitle>
            <LandingPage_Content_Normal_SubTitle>
              코디가 어렵다면 옷에 어울리는 색상을 추천받을 수 있습니다.
            </LandingPage_Content_Normal_SubTitle>
          </LandingPage_Content_Container>
        </LandingPage_Section_Container>
      </LandingPage_Section2>
      <LandingPage_Section3>
        <LandingPage_Section_Container>
          <LandingPage_Content_Container>
            <LandingPage_Content_Normal_Title>
              코디가 끝났나요?
              <br />
              저장과 공유 기능을 사용해보세요!
            </LandingPage_Content_Normal_Title>
            <LandingPage_Content_Normal_SubTitle>
              자신의 코디를 저장하여 마이 페이지에서 확인이 가능합니다.
            </LandingPage_Content_Normal_SubTitle>
            <LandingPage_Content_Normal_SubTitle>
              코디를 공유한다면, 다른 사람들에게 자신의 코디를
              <br />
              보여줄 수 있습니다.
            </LandingPage_Content_Normal_SubTitle>
          </LandingPage_Content_Container>
          <LandingPage_Image_Container>이미지 공간</LandingPage_Image_Container>
        </LandingPage_Section_Container>
      </LandingPage_Section3>
      <LandingPage_Section4>
        <LandingPage_Section_Container>
          <LandingPage_Image_Container>이미지 공간</LandingPage_Image_Container>
          <LandingPage_Content_Container>
            <LandingPage_Content_Normal_Title>
              모바일 환경에서도
              <br />
              간편하게 이용할 수 있습니다.
            </LandingPage_Content_Normal_Title>
            <LandingPage_Content_Normal_SubTitle>
              PC, 모바일 환경 모두 지원합니다.
              <br />
              내가 원하는 기기로 쉽고 간편하게 코디를 진행해보세요!
            </LandingPage_Content_Normal_SubTitle>
          </LandingPage_Content_Container>
        </LandingPage_Section_Container>
      </LandingPage_Section4>
      <LandingPage_Section5>
        <Section5_Content>나만의 옷들로 지금 코디를 시작해보세요!</Section5_Content>
        <Section5_NextLink to="/genderselect">
          <Section5_NextButton onClick={handleClickScrollTo}>시작하기</Section5_NextButton>
        </Section5_NextLink>
      </LandingPage_Section5>
    </>
  );
}

export default LandingPage;
