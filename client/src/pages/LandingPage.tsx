import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';

import { PrimaryButton } from '../components/Button/Button.styled';

import MainGif from '../images/Gif/Main_Gif.gif';
import BackGround from '../images/BackGround/Test_Section_BackGround.png';

import Slide_01 from '../images/Slide/Slide_01.png';
import Slide_02 from '../images/Slide/Slide_02.png';
import Slide_03 from '../images/Slide/Slide_03.png';
import Slide_04 from '../images/Slide/Slide_04.png';
import Slide_05 from '../images/Slide/Slide_05.png';
import MobileImg from '../images/Mobile.png';

const bannerList = ['성별 선택', '메인 페이지', '결과 페이지', '마이 페이지', '갤러리'];
const imageList = [Slide_01, Slide_02, Slide_03, Slide_04, Slide_05];
let imageIndex = 0;

const TutorialLabel = styled.div`
  width: auto;
  height: 50px;
  padding: 10px 0 0 0;

  @media (max-width: 768px) {
    width: 640px;
  }
`;

const TutorialSpan = styled.span`
  border-radius: 5rem;
  padding: 10px 25px;
  font-size: 15px;
  background-color: #a2d5f2;
  text-align: center;
  color: #07689f;
  font-weight: 600;

  @media (max-width: 768px) {
    width: 640px;
  }
`;

const Section1_NextButton_Container = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const Section1_NextLink = styled(Link)`
  text-decoration: none;
  width: 300px;
  min-height: 70px;
  color: white;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 540px) {
    width: 150px;
  }
`;

const Section1_NextButton = styled(PrimaryButton)`
  width: 300px;
  height: 70px;
  margin: 0.5em 1em 0.5em 0;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 540px) {
    width: 150px;
  }
`;

const LandingPage_Section1 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  border-bottom: 1px solid #a2d5f2;

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
  }

  @media (max-width: 540px) {
    width: 100vw;
    height: 80vh;
  }
`;

const LandingPage_Section1_Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10em 0 20em;

  @media (max-width: 768px) {
    padding-left: 5rem;
  }

  @media (max-width: 540px) {
    padding: 0;
    padding-left: 2rem;
  }
`;

const LandingPage_Section1_Content_Container = styled.div`
  width: 45em;
  flex-direction: column;
  align-items: center;
  text-align: left;

  @media (max-width: 540px) {
    padding-top: 8rem;
  }
`;

const LandingPage_Section1_Image = styled.img`
  display: inline;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  opacity: 90%;
`;

const LandingPage_Section1_Content_Title = styled.div`
  font-size: 4.9rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #fafafa;
  text-shadow: 3px 3px 5px #333333;

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 540px) {
    font-size: 2.4rem;
  }
`;

const LandingPage_Section1_Content_SubTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  padding-left: 0.1rem;
  margin-bottom: 0.4rem;
  color: #fafafa;
  text-shadow: 2px 2px 5px #333333;

  @media (max-width: 540px) {
    font-size: 16px;
  }
`;

const LandingPage_Section2 = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  background-color: #fafafa;
  padding: 10rem 0;
  border-bottom: 1px solid #a2d5f2;

  @media (max-width: 540px) {
    padding: 5rem 0;
  }
`;

const LandingPage_Section2_Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 15rem;

  @media (max-width: 768px) {
    padding: 0 10rem;
    flex-direction: column;
  }

  @media (max-width: 540px) {
    padding: 0 1rem;
  }
`;

const LandingPage_Section2_Content_Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-right: 5rem;

  @media (max-width: 768px) {
    padding-right: 0;
    flex-direction: row;
  }

  @media (max-width: 540px) {
    padding-right: 0;
    flex-direction: column;
  }
`;

const LandingPage_Section2_Image_Container = styled.div`
  width: 800px;
  text-align: center;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 640px;
    height: 365px;
    margin-top: 20px;
    margin-right: 0;
  }

  @media (max-width: 540px) {
    width: 352px;
    height: 212px;
  }
`;

const LandingPage_Section2_Image = styled.img`
  width: 100%;
  height: 100%;
  border: 2px solid #a2d5f2;
  border-radius: 5px;

  @media (max-width: 768px) {
    height: 360px;
  }

  @media (max-width: 540px) {
    height: 207px;
  }
`;

const LandingPage_Section2_Content_Title_Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

const LandingPage_Section2_Content_Normal_Title = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
  color: #ff7e67;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 540px) {
    margin-bottom: 0;
  }
`;

const LandingPage_Section2_Content_SubTitle_Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 300px;
    padding: 50px 0 0 0;
  }

  @media (max-width: 540px) {
    padding-top: 10px;
  }
`;

const LandingPage_Section2_Content_Normal_SubTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 0.4rem;
  padding-left: 0.2rem;
  color: #ee6d56;

  @media (max-width: 768px) {
    padding-top: 0.3rem;
    font-size: 1.1rem;
  }
`;

const LandingPage_Section3 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #ff7e67;
  border-bottom: 1px solid #a2d5f2;

  @media (max-width: 768px) {
    height: 115vh;
  }
`;

const LandingPage_Section3_Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10rem 0 10rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 540px) {
    padding: 0 2rem;
  }
`;

const LandingPage_Section3_Image_Wrapper = styled.div`
  width: 800px;
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    width: 640px;
  }

  @media (max-width: 540px) {
    width: 352px;
  }
`;

const LandingPage_Section3_Image_Container = styled.div`
  width: 800px;
  height: 500px;
  text-align: center;

  @media (max-width: 768px) {
    width: 640px;
    height: 360px;
  }

  @media (max-width: 540px) {
    width: 352px;
    height: 207px;
  }
`;

const LandingPage_Section3_Image_Slide_Container = styled.div`
  position: absolute;

  @media (max-width: 768px) {
    width: 640px;
    height: 370px;
  }

  @media (max-width: 540px) {
    width: 352px;
    height: 212px;
  }
`;

const LandingPage_Section3_Image_Banner_Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #a2d5f2;
  top: 90%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const LandingPage_Section3_Image_Banner = styled.button`
  width: 160px;
  height: 50px;
  padding: 10px 0;
  text-align: center;
  opacity: 50%;
  border: none;
  color: #07689f;
  background-color: transparent !important;
  font-weight: 500;
  font-size: 1.1rem;

  @media (max-width: 540px) {
    font-size: 0.5rem;
    width: 70px;
    height: 40px;
  }
`;

const LandingPage_Section3_Other_Image_Banner = styled.button`
  width: 160px;
  height: 50px;
  padding: 10px 0;
  text-align: center;
  border: none;
  color: #07689f;
  background-color: transparent !important;
  font-weight: 500;
  font-size: 1.1rem;

  @media (max-width: 540px) {
    font-size: 0.5rem;
    width: 70px;
    height: 40px;
  }
`;

const LandingPage_Section3_Image = styled.img`
  width: 100%;
  height: 500px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 2px solid #a2d5f2;

  @media (max-width: 768px) {
    width: 640px;
    height: 360px;
  }

  @media (max-width: 540px) {
    width: 352px;
    height: 207px;
  }
`;

const LandingPage_Section3_Content_Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-right: 5rem;

  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 2rem;
    flex-direction: row;
  }

  @media (max-width: 540px) {
    flex-direction: column;
  }
`;

const LandingPage_Section3_Content_Normal_Title_Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding-left: 5rem;
    width: 350px;
    margin-right: 1rem;
  }

  @media (max-width: 540px) {
    padding-left: 1rem;
    margin-right: 0;
  }
`;

const LandingPage_Section3_Content_Normal_Title = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
  color: #fafafa;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LandingPage_Section3_Content_Normal_Title_Mobile = styled.div`
  display: none;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
  color: #fafafa;

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 540px) {
    margin-bottom: 0.5rem;
  }
`;

const LandingPage_Section3_Content_Normal_SubTitle_Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 360px;
    padding-top: 3.5rem;
  }

  @media (max-width: 540px) {
    padding-left: 1rem;
    padding-top: 1.5rem;
  }
`;

const LandingPage_Section3_Content_Normal_SubTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 0.4rem;
  padding-left: 0.2rem;
  color: #f1f1f1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LandingPage_Section3_Content_Normal_SubTitle_Mobile = styled.div`
  display: none;
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 0.4rem;
  color: #f1f1f1;

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 1.5rem;
  }
`;

const LandingPage_Section4 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #fafafa;
  border-bottom: 1px solid #a2d5f2;

  @media (max-width: 768px) {
    height: 115vh;
  }

  @media (max-width: 540px) {
    height: 100vh;
  }
`;

const LandingPage_Section4_Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 1rem 0 10rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 10rem 0 10rem;
  }
`;

const LandingPage_Section4_Content_Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 50px;

  @media (max-width: 768px) {
    flex-direction: row;
    margin-bottom: 3rem;
  }

  @media (max-width: 540px) {
    flex-direction: column;
  }
`;

const LandingPage_Section4_Image_Container = styled.div`
  width: 1024px;
  text-align: center;
  margin-left: 3rem;

  @media (max-width: 768px) {
    width: 650px;
    margin-left: 0;
  }

  @media (max-width: 540px) {
    width: 352px;
  }
`;

const LandingPage_Section4_Image = styled.img`
  width: 100%;
  height: 700px;
  border-radius: 5px;

  @media (max-width: 768px) {
    height: 360px;
  }

  @media (max-width: 540px) {
    height: 207px;
  }
`;

const LandingPage_Section4_Content_Normal_Title_Container = styled.div`
  @media (max-width: 768px) {
    width: 320px;
  }
`;

const LandingPage_Section4_Content_Normal_Title = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
  color: #ff7e67;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 540px) {
    margin-bottom: 0;
  }
`;

const LandingPage_Section4_Content_Normal_SubTitle_Container = styled.div`
  @media (max-width: 768px) {
    width: 300px;
  }
`;

const LandingPage_Section4_Content_Normal_SubTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 0.4rem;
  padding-left: 0.2rem;
  color: #ee6d56;

  @media (max-width: 768px) {
    padding-left: 1rem;
    padding-top: 3.6rem;
    font-size: 1.1rem;
  }

  @media (max-width: 540px) {
    padding-left: 0;
    padding-top: 1.5rem;
  }
`;

const LandingPage_Section5 = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ff7e67;
  padding: 15rem 0;
  border-bottom: 1px solid #a2d5f2;

  @media (max-width: 768px) {
    height: 80vh;
    padding: 0;
  }

  @media (max-width: 540px) {
    height: 60vh;
  }
`;

const Section5_Content = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 5rem;
  color: #fafafa;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 540px) {
    display: none;
  }
`;

const Section5_Content_Mobile = styled.div`
  display: none;
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 5rem;
  color: #fafafa;

  @media (max-width: 540px) {
    display: block;
  }
`;

const Section5_NextLink = styled(Link)`
  text-decoration: none;
  width: 300px;
  min-height: 70px;
  color: white;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 540px) {
    width: 150px;
  }
`;

const Section5_NextButton = styled(PrimaryButton)`
  width: 300px;
  height: 70px;
  margin: 0.5em 1em 0.5em 0;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 540px) {
    width: 150px;
  }
`;

function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    $('.slide > div:gt(0)').hide();

    setTimeout(function () {
      imageIndex += 1;

      if (imageIndex >= imageList.length) {
        imageIndex = 0;
      }

      setCurrentImageIndex(imageIndex);
    }, 3000);

    setTimeout(function () {
      $('.slide > div:first').fadeOut(1000).next().fadeIn(500).end().appendTo('.slide');
    }, 3000);
  });

  function handleClickScrollTo() {
    // window.scrollTo(0, 0);
  }

  return (
    <>
      <LandingPage_Section1>
        <LandingPage_Section1_Image src={BackGround} />
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
          <Section1_NextButton_Container>
            <Section1_NextLink to="/genderselect">
              <Section1_NextButton onClick={handleClickScrollTo}>시작하기</Section1_NextButton>
            </Section1_NextLink>
          </Section1_NextButton_Container>
        </LandingPage_Section1_Container>
      </LandingPage_Section1>
      <LandingPage_Section2>
        <LandingPage_Section2_Container>
          <LandingPage_Section2_Content_Container>
            <LandingPage_Section2_Content_Title_Container>
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
            </LandingPage_Section2_Content_Title_Container>
            <LandingPage_Section2_Content_SubTitle_Container>
              <LandingPage_Section2_Content_Normal_SubTitle>
                원하는 옷을 선택하고,
                <br />
                옷에 적용하고 싶은 색상을 선택하면
                <br />
                자신의 코디가 완성됩니다.
              </LandingPage_Section2_Content_Normal_SubTitle>
              <LandingPage_Section2_Content_Normal_SubTitle>
                코디를 하면서 옷에 어울리는 색상을
                <br />
                추천받을 수 있습니다.
              </LandingPage_Section2_Content_Normal_SubTitle>
            </LandingPage_Section2_Content_SubTitle_Container>
          </LandingPage_Section2_Content_Container>
          <LandingPage_Section2_Image_Container>
            <LandingPage_Section2_Image src={MainGif}></LandingPage_Section2_Image>
          </LandingPage_Section2_Image_Container>
        </LandingPage_Section2_Container>
      </LandingPage_Section2>
      <LandingPage_Section3>
        <LandingPage_Section3_Container>
          <LandingPage_Section3_Content_Container>
            <LandingPage_Section3_Content_Normal_Title_Container>
              <TutorialLabel>
                <TutorialSpan>다른 것도 있나요?</TutorialSpan>
              </TutorialLabel>
              <LandingPage_Section3_Content_Normal_Title>
                코디 뿐만 아니라
                <br />
                갤러리도 살펴보세요.
                <br />
                다른 유저들의
                <br />
                다양한 코디도 볼 수 있습니다!
              </LandingPage_Section3_Content_Normal_Title>
              <LandingPage_Section3_Content_Normal_Title_Mobile>
                코디 뿐만 아니라
                <br />
                갤러리도 살펴보세요.
                <br />
                다른 유저들의 다양한
                <br />
                코디도 볼 수 있습니다!
              </LandingPage_Section3_Content_Normal_Title_Mobile>
            </LandingPage_Section3_Content_Normal_Title_Container>
            <LandingPage_Section3_Content_Normal_SubTitle_Container>
              <LandingPage_Section3_Content_Normal_SubTitle>
                자신의 코디를 저장하면
                <br />
                마이 페이지에서 확인이 가능합니다.
              </LandingPage_Section3_Content_Normal_SubTitle>
              <LandingPage_Section3_Content_Normal_SubTitle>
                코디를 공유한다면, 다른 사람들에게 <br />
                자신의 코디를 보일 수 있습니다.
              </LandingPage_Section3_Content_Normal_SubTitle>
              <LandingPage_Section3_Content_Normal_SubTitle_Mobile>
                자신의 코디를 저장하면
                <br />
                마이 페이지에서 확인이 가능합니다.
              </LandingPage_Section3_Content_Normal_SubTitle_Mobile>
              <LandingPage_Section3_Content_Normal_SubTitle_Mobile>
                코디를 공유한다면, 다른 사람들에게 <br />
                자신의 코디를 보일 수 있습니다.
              </LandingPage_Section3_Content_Normal_SubTitle_Mobile>
            </LandingPage_Section3_Content_Normal_SubTitle_Container>
          </LandingPage_Section3_Content_Container>
          <LandingPage_Section3_Image_Wrapper>
            <LandingPage_Section3_Image_Container className="slide">
              {imageList.map((el, idx) => {
                return (
                  <LandingPage_Section3_Image_Slide_Container key={idx}>
                    <LandingPage_Section3_Image src={el} />
                  </LandingPage_Section3_Image_Slide_Container>
                );
              })}
            </LandingPage_Section3_Image_Container>
            <LandingPage_Section3_Image_Banner_Container>
              {bannerList.map((el, idx) => {
                return currentImageIndex === idx ? (
                  <LandingPage_Section3_Other_Image_Banner key={idx}>
                    {el}
                  </LandingPage_Section3_Other_Image_Banner>
                ) : (
                  <LandingPage_Section3_Image_Banner key={idx}>
                    {el}
                  </LandingPage_Section3_Image_Banner>
                );
              })}
            </LandingPage_Section3_Image_Banner_Container>
          </LandingPage_Section3_Image_Wrapper>
        </LandingPage_Section3_Container>
      </LandingPage_Section3>
      <LandingPage_Section4>
        <LandingPage_Section4_Container>
          <LandingPage_Section4_Content_Container>
            <LandingPage_Section4_Content_Normal_Title_Container>
              <TutorialLabel>
                <TutorialSpan>모바일도 되나요?</TutorialSpan>
              </TutorialLabel>
              <LandingPage_Section4_Content_Normal_Title>
                모바일 환경에서도
                <br />
                간편하게 이용할 수
                <br />
                있습니다.
              </LandingPage_Section4_Content_Normal_Title>
            </LandingPage_Section4_Content_Normal_Title_Container>
            <LandingPage_Section4_Content_Normal_SubTitle_Container>
              <LandingPage_Section4_Content_Normal_SubTitle>
                PC, 모바일 환경 모두 지원합니다.
                <br />
                내가 원하는 기기로 쉽고 간편하게
                <br />
                코디를 진행해보세요!
              </LandingPage_Section4_Content_Normal_SubTitle>
            </LandingPage_Section4_Content_Normal_SubTitle_Container>
          </LandingPage_Section4_Content_Container>
          <LandingPage_Section4_Image_Container>
            <LandingPage_Section4_Image src={MobileImg} />
          </LandingPage_Section4_Image_Container>
        </LandingPage_Section4_Container>
      </LandingPage_Section4>
      <LandingPage_Section5>
        <Section5_Content>나만의 옷들로 코디를 시작해보세요!</Section5_Content>
        <Section5_Content_Mobile>
          나만의 옷들로
          <br />
          코디를 시작해보세요!
        </Section5_Content_Mobile>
        <Section5_NextLink to="/genderselect">
          <Section5_NextButton onClick={handleClickScrollTo}>시작하기</Section5_NextButton>
        </Section5_NextLink>
      </LandingPage_Section5>
    </>
  );
}

export default LandingPage;
