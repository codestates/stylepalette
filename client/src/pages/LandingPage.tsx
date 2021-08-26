import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { PrimaryButton } from '../components/Button/Button.styled';

import TestGif_01 from '../images/TestGif/Test_01.gif';
import TestGif_02 from '../images/TestGif/Test_02.gif';
import TestGif_03 from '../images/TestGif/Test_03.gif';
import BackGround from '../images/BackGround/Test_Section_BackGround.png';

import Slide_01 from '../images/Slide/Slide_01.png';
import Slide_02 from '../images/Slide/Slide_02.png';
import Slide_03 from '../images/Slide/Slide_03.png';
import Slide_04 from '../images/Slide/Slide_04.png';
import Slide_05 from '../images/Slide/Slide_05.png';

const bannerList = ['성별 선택', '메인 페이지', '결과 페이지', '마이 페이지', '갤러리'];
const imageList = [Slide_01, Slide_02, Slide_03, Slide_04, Slide_05];

interface section03_imageProps {
  isChanged: boolean;
  setIsChanged: any;
}

const TutorialLabel = styled.div`
  width: auto;
  height: 50px;
  padding: 10px 0 0 0;
`;

const TutorialSpan = styled.span`
  border-radius: 5rem;
  padding: 10px 25px;
  font-size: 15px;
  background-color: #ccc9ff;
  text-align: center;
  color: #725fd8;
  font-weight: 600;
`;

const LandingPage_Section1 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  border-bottom: 2px solid #dbdbdb;
`;

const LandingPage_Section1_Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 17rem 10rem 0 10rem;
`;

const LandingPage_Section1_Content_Container = styled.div`
  width: 640px;
  flex-direction: column;
  align-items: center;
  text-align: left;
`;

const LandingPage_Section1_Image = styled.img`
  display: inline;
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  opacity: 85%;
`;

const LandingPage_Section1_Content_Title = styled.div`
  font-size: 4.9rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fbfbfb;
  text-shadow: 3px 3px 5px #333333;
`;

const LandingPage_Section1_Content_SubTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  padding-left: 0.1rem;
  margin-bottom: 0.4rem;
  color: #fbfbfb;
  text-shadow: 2px 2px 5px #333333;
`;

const LandingPage_Section2 = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  background-color: #e9e9e9;
  padding: 10rem 0;
`;

const LandingPage_Section2_Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10rem 0 10rem;
`;

const LandingPage_Section2_Content_Container = styled.div`
  width: 640px;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding-left: 50px;
`;

const LandingPage_Section2_Image_Container = styled.div`
  width: 792px;
  text-align: center;
  margin-right: 20px;
`;

const LandingPage_Section2_Image = styled.img`
  width: 100%;
  height: 500px;
  border: 4px solid #dbdbdb;
  border-radius: 5px;
`;

const LandingPage_Section2_Content_Normal_Title = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
  color: #444444;
`;

const LandingPage_Section2_Content_Normal_SubTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.4rem;
  padding-left: 0.2rem;
  color: #999999;
`;

const LandingPage_Section3 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: white;
`;

const LandingPage_Section3_Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10rem 0 10rem;
`;

const LandingPage_Section3_Content_Container = styled.div`
  width: 640px;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding-left: 50px;
`;

const LandingPage_Section3_Image_Container = styled.div`
  width: 750px;
  text-align: center;
  position: relative;
`;

const LandingPage_Section3_Image_Banner_Container = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  background-color: black;
  opacity: 50%;
  top: 90%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const LandingPage_Section3_Image_Banner = styled.button`
  width: 150px;
  height: 50px;
  padding: 10px 0;
  text-align: center;
  opacity: 50%;
  cursor: pointer;
  border: none;
  color: white;
  background-color: transparent !important;
  font-weight: 500;
  font-size: 1.1rem;

  &:focus {
    opacity: 100%;
  }
`;

const LandingPage_Section3_Image = styled.img<section03_imageProps>`
  width: 100%;
  height: 500px;
  border-radius: 5px;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  ${(props) => {
    if (props.isChanged) {
      console.log('Hello!');

      return `animation: fadein .5s linear`;
    }
  }}
`;

const LandingPage_Section3_Content_Normal_Title = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
  color: #444444;
`;

const LandingPage_Section3_Content_Normal_SubTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.4rem;
  padding-left: 0.2rem;
  color: #999999;
`;

const LandingPage_Section4 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #e9e9e9;
`;

const LandingPage_Section4_Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10rem 0 10rem;
`;

const LandingPage_Section4_Content_Container = styled.div`
  width: 640px;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding-left: 50px;
`;

const LandingPage_Section4_Image_Container = styled.div`
  width: 792px;
  text-align: center;
  margin-right: 20px;
`;

const LandingPage_Section4_Image = styled.img`
  width: 100%;
  height: 500px;
  border: 4px solid #dbdbdb;
  border-radius: 5px;
`;

const LandingPage_Section4_Content_Normal_Title = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
  color: #444444;
`;

const LandingPage_Section4_Content_Normal_SubTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.4rem;
  padding-left: 0.2rem;
  color: #999999;
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

const NextLink = styled(Link)`
  text-decoration: none;
  position: absolute;
  top: 68%;
  left: 50%;
  margin: 0 0 0 -162px;
  width: 325px;
  min-height: 60px;
  text-align: center;
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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    // window.scrollTo(0, 0);
    setTimeout(() => {
      let index = currentImageIndex;
      index += 1;

      if (index > 4) {
        index = 0;
      }

      setIsChanged(true);
      setCurrentImageIndex(index);
    }, 2000);
    // setTimeout(() => {
    //   setIsChanged(false);
    // }, 2500);
  });

  function handleClickScrollTo() {
    // window.scrollTo(0, 0);
  }

  function handleClickSetCurrentImageIndex(value: string) {
    switch (value) {
      case '성별 선택': {
        setIsChanged(true);
        setCurrentImageIndex(0);
        setTimeout(() => {
          setIsChanged(false);
        }, 500);
        break;
      }
      case '메인 페이지': {
        setIsChanged(true);
        setCurrentImageIndex(1);
        setTimeout(() => {
          setIsChanged(false);
        }, 500);
        break;
      }

      case '결과 페이지': {
        setIsChanged(true);
        setCurrentImageIndex(2);
        setTimeout(() => {
          setIsChanged(false);
        }, 500);
        break;
      }

      case '마이 페이지': {
        setIsChanged(true);
        setCurrentImageIndex(3);
        setTimeout(() => {
          setIsChanged(false);
        }, 500);
        break;
      }

      case '갤러리': {
        setIsChanged(true);
        setCurrentImageIndex(4);
        setTimeout(() => {
          setIsChanged(false);
        }, 500);
        break;
      }

      default: {
        break;
      }
    }
  }

  return (
    <>
      <LandingPage_Section1>
        <LandingPage_Section1_Image src={BackGround} />
        <NextLink to="/genderselect">
          <NextButton onClick={handleClickScrollTo}>시작하기</NextButton>
        </NextLink>
        <LandingPage_Section1_Container>
          <LandingPage_Section1_Content_Container>
            <LandingPage_Section1_Content_Title>
              어떤 옷을 입을지
              <br />
              고민하고 계신가요?
            </LandingPage_Section1_Content_Title>
            <LandingPage_Section1_Content_SubTitle>
              옷 색상만 잘 선택해도 옷을 잘 입을 수 있습니다,
            </LandingPage_Section1_Content_SubTitle>
            <LandingPage_Section1_Content_SubTitle>
              옷장에 있는 옷의 색상을 미리 매치시켜보세요!
            </LandingPage_Section1_Content_SubTitle>
          </LandingPage_Section1_Content_Container>
        </LandingPage_Section1_Container>
      </LandingPage_Section1>
      <LandingPage_Section2>
        <LandingPage_Section2_Container>
          <LandingPage_Section2_Image_Container>
            <LandingPage_Section2_Image src={TestGif_03}></LandingPage_Section2_Image>
          </LandingPage_Section2_Image_Container>
          <LandingPage_Section2_Content_Container>
            <TutorialLabel>
              <TutorialSpan>어떻게 사용하나요?</TutorialSpan>
            </TutorialLabel>
            <LandingPage_Section2_Content_Normal_Title>
              피부톤 혹은
              <br />
              가지고 있는 옷의
              <br />
              색상을 선택하세요.
            </LandingPage_Section2_Content_Normal_Title>
            <LandingPage_Section2_Content_Normal_SubTitle>
              원하는 옷을 선택하고, 옷에 적용하고 싶은 색상을 선택하면
              <br />
              자신의 코디가 완성됩니다.
            </LandingPage_Section2_Content_Normal_SubTitle>
            <LandingPage_Section2_Content_Normal_SubTitle>
              코디가 어렵다면 옷에 어울리는 색상을 추천받을 수 있습니다.
            </LandingPage_Section2_Content_Normal_SubTitle>
          </LandingPage_Section2_Content_Container>
        </LandingPage_Section2_Container>
      </LandingPage_Section2>
      <LandingPage_Section3>
        <LandingPage_Section3_Container>
          <LandingPage_Section3_Content_Container>
            <TutorialLabel>
              <TutorialSpan>어떤 것들이 있나요?</TutorialSpan>
            </TutorialLabel>
            <LandingPage_Section3_Content_Normal_Title>
              코디가 끝났나요?
              <br />
              저장과 공유 기능을 사용해보세요!
            </LandingPage_Section3_Content_Normal_Title>
            <LandingPage_Section3_Content_Normal_SubTitle>
              자신의 코디를 저장하여 마이 페이지에서 확인이 가능합니다.
            </LandingPage_Section3_Content_Normal_SubTitle>
            <LandingPage_Section3_Content_Normal_SubTitle>
              코디를 공유한다면, 다른 사람들에게 자신의 코디를
              <br />
              보여줄 수 있습니다.
            </LandingPage_Section3_Content_Normal_SubTitle>
          </LandingPage_Section3_Content_Container>
          <LandingPage_Section3_Image_Container>
            <LandingPage_Section3_Image
              src={imageList[currentImageIndex]}
              isChanged={isChanged}
              setIsChanged={setIsChanged}
            />
            <LandingPage_Section3_Image_Banner_Container>
              {bannerList.map((el, idx) => {
                return (
                  <LandingPage_Section3_Image_Banner
                    key={idx}
                    onClick={() => handleClickSetCurrentImageIndex(el)}
                  >
                    {el}
                  </LandingPage_Section3_Image_Banner>
                );
              })}
            </LandingPage_Section3_Image_Banner_Container>
          </LandingPage_Section3_Image_Container>
        </LandingPage_Section3_Container>
      </LandingPage_Section3>
      <LandingPage_Section4>
        <LandingPage_Section4_Container>
          <LandingPage_Section4_Image_Container>이미지 공간</LandingPage_Section4_Image_Container>
          <LandingPage_Section4_Content_Container>
            <LandingPage_Section4_Content_Normal_Title>
              모바일 환경에서도
              <br />
              간편하게 이용할 수 있습니다.
            </LandingPage_Section4_Content_Normal_Title>
            <LandingPage_Section4_Content_Normal_SubTitle>
              PC, 모바일 환경 모두 지원합니다.
              <br />
              내가 원하는 기기로 쉽고 간편하게 코디를 진행해보세요!
            </LandingPage_Section4_Content_Normal_SubTitle>
          </LandingPage_Section4_Content_Container>
        </LandingPage_Section4_Container>
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
