import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { NavigateNext } from '@styled-icons/material-outlined/NavigateNext';
import { RestartAlt } from '@styled-icons/material-twotone/RestartAlt';
import { ReactComponent as Man } from '../images/Man/Man-default.svg';
import { ReactComponent as Woman } from '../images/Woman/Woman-default.svg';
import { TShirt2 } from '@styled-icons/remix-line/TShirt2';
import { Brush } from '@styled-icons/remix-line/Brush';
import { CheckCircle } from '@styled-icons/boxicons-regular/CheckCircle';
import { ColorPalette as ColorNavIcon } from '@styled-icons/ionicons-outline/ColorPalette';
import { Close as CloseIcon } from '@styled-icons/evaicons-solid/Close';

import {
  recommendColor,
  rouletteColor,
  setUserPickColor,
  saveMainResultImage,
  setMainResultImage,
} from '../redux/actions/action';
import { RecommendColor, RouletteColor } from '../redux/reducers/initialState';
import { getRecommendColor, getRouletteColor } from '../redux/selectors';

// Mobile navigation
const NavModal = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 72px;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 769px) {
    display: none;
  }
`;

const Color = [
  '#FF0000',
  '#FFA500',
  '#FFFF00',
  '#008000',
  '#0000FF',
  '#00008B',
  '#800080',
  '#FFFFFF',
  '#000000',
];
const SkinColor = ['#FEE6D8', '#FFCDB1', '#633F1E'];
const SelectList = ['피부톤', '상의', '하의'];
const recommendTab = ['톤인톤', '톤온톤', '모노톤'];
const ClothList: any = {
  피부톤: [],
  상의: ['맨투맨', '셔츠'],
  하의: ['준비중'],
};

//Mobile
const BrushIcon = styled(Brush)`
  width: 25px;
`;
const CheckCircleFillIcon = styled(CheckCircle)`
  width: 25px;
`;
const ColorIcon = styled(ColorNavIcon)`
  width: 25px;
`;

const Tshirt = styled(TShirt2)`
  width: 25px;
`;

const NavList = ['종류선택', '색상선택', '추천색', '완료'];
const NavIconMap = {
  종류선택: Tshirt,
  색상선택: BrushIcon,
  추천색: ColorIcon,
  완료: CheckCircleFillIcon,
};

interface imgProps {
  picktopcolor?: string;
  pickbottomcolor?: string;
  pickskincolor?: string;
}

interface recommandProps {
  color?: string;
}

interface currRecommandProps {
  currrecommandtap?: string;
}

interface rouletteWrapperProps {
  degree?: number;
}

interface rouletteProps {
  color?: string;
  degree?: number;
}

interface colorProps {
  color?: string;
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  left: 0;
  top: 0;

  @media (max-width: 768px) {
    display: flex;
    position: relative;
  }
`;

const PalletteContainer = styled.div`
  display: none;
  @media (min-width: 769px) {
    display: inline;
    position: absolute;
    left: 84%;
    top: 8%;
    text-align: center;
    max-width: 270px;
    max-height: 280px;
    margin: 15px;
    border-radius: 45px;
    border: 2px solid rgba(0, 0, 0);
    background-color: white;
  }
`;
const MobilePaletteContainer = styled.div`
  white-space: nowrap;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Pallette = styled.button<colorProps>`
  display: inline-block;
  border: 1px solid #ececec;
  width: 30px;
  height: 30px;
  margin: 5px 10px;
  border-radius: 90px;
  cursor: pointer;
  background-color: ${(props) => props.color || 'white'};

  &:hover {
    animation: hoverColor 0.1s forwards linear alternate;
  }

  &:focus {
    transform: scale(1.2, 1.2);
  }

  @keyframes hoverColor {
    100% {
      transform: scale(1.2, 1.2);
    }
  }
  @media (min-width: 769px) {
    width: 60px;
    height: 60px;
    margin: 15px 10px;
    border: 2px solid rgba(0, 0, 0);
  }
`;

const SkinSelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 130px;
  width: 100%;
  height: 50px;

  @media (min-width: 769px) {
    left: 7%;
    top: 16%;
    border: 2px solid rgba(0, 0, 0);
    border-radius: 15px;
    width: 275px;
    height: 100px;
  }
`;

const SkinSelectButton = styled.button<colorProps>`
  border: 2px solid rgba(0, 0, 0);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin: 15px 10px;
  cursor: pointer;
  background-color: ${(props) => props.color || 'white'};

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    margin: 5px 10px;
    border: solid 1px #ececec;
  }
  &:hover {
    animation: hoverColor 0.1s forwards linear alternate;
  }

  &:focus {
    transform: scale(1.2, 1.2);
  }

  @keyframes hoverColor {
    100% {
      transform: scale(1.2, 1.2);
    }
  }
`;

const SelectContainer = styled.div`
  display: inline-block;
  position: absolute;
  left: 1%;
  top: 7%;
  text-align: left;
  max-width: 600px;
  margin: 15px 0;
  width: 100%;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SelectorList = styled.button`
  width: 125px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0);
  border-radius: 15px;
  background-color: black;
  color: white;
  margin: 8px;
  margin-left: 0px;

  &:hover {
    opacity: 50%;
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 33px;
    font-size: 17px;
    border-radius: 20px;
  }
`;

const ImageContainer = styled.div`
  display: inline;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -250px 0 0 -300px;
  padding: 50px 0;
  text-align: center;
  width: 600px;
  height: 600px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 100px;
    position: initial;
    margin: 0px 0px 55px 0;
  }
`;

const ImageMan = styled(Man)<imgProps>`
  width: 175px;
  height: 490px;

  @media (max-width: 481px) {
    height: 300px;
  }

  ${(props) => {
    return `
      #Skin {
        fill: ${props.pickskincolor};
      }  

      #Sweater {
        fill: ${props.picktopcolor};
      }  

      #Pants {
        fill: ${props.pickbottomcolor}
      }
     `;
  }}
`;

const ImageWoMan = styled(Woman)<imgProps>`
  width: 175px;
  height: 490px;

  @media (max-width: 481px) {
    height: 300px;
  }

  ${(props) => {
    return `
      #Skin {
        fill: ${props.pickskincolor};
      }   

      #T-shirt {
        fill: ${props.picktopcolor};
      }  

      #Skirt {
        fill: ${props.pickbottomcolor}
      }
     `;
  }}
`;

const SubSelectContainer = styled.div`
  display: inline;
  position: absolute;
  left: 20px;
  top: 25%;
  width: 50px;
  height: 50px;

  @media (min-width: 769px) {
    left: 1%;
    top: 16%;
    text-align: center;
    width: 100px;
    height: 100px;
  }
`;

const SubSelectButton = styled.button`
  width: 50px;
  height: 45px;
  font-size: 16px;
  font-style: bold;
  background-color: white;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 15px;
  &:hover {
    background-color: #eaeaea;
  }

  @media (min-width: 769px) {
    width: 100px;
    height: 100px;
    font-size: 24px;
  }
`;

const ClothContainer = styled.div`
  display: inline;
  position: absolute;
  left: 7%;
  top: 16%;
  text-align: center;
  width: 100px;
  @media (max-width: 768px) {
  }
`;

const ClothButton = styled.button`
  font-style: bold;
  font-size: 24px;
  border: 2px solid rgba(0, 0, 0);
  border-radius: 15px;
  width: 100px;
  height: 100px;
  margin: 0 0 4px 0;
  background-color: black;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 50%;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const NextButtonWrapper = styled.div`
  display: inline;
  position: absolute;
  text-align: center;
  width: 205px;
  height: 100px;
  bottom: 10px;
  right: 10px;

  @media (max-width: 768px) {
    top: 85px;
    left: 10px;
    text-align: start;
  }
`;

const NextButton = styled.button`
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  text-align: center;
  background-color: black;
  cursor: pointer;
  margin: 10px;

  &:hover {
    opacity: 50%;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const NextIcons = styled(NavigateNext)`
  color: white;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ResetButton = styled.button`
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  text-align: center;
  background-color: black;
  cursor: pointer;
  margin: 10px;

  &:hover {
    opacity: 50%;
  }
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
`;

const ResetIcons = styled(RestartAlt)`
  color: white;
`;

const RecommendSelectWrapper = styled.div`
  display: inline;
  position: absolute;
  border-radius: 15px;
  left: 1%;
  top: 90%;
  width: 350px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const RecommendSelectTab = styled.button`
  width: 80px;
  height: 33px;
  font-size: 17px;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0);
  margin: 8px;
  margin-left: 0;
  font-style: bold;
  color: white;
  background-color: black;
  cursor: pointer;

  &:hover {
    opacity: 50%;
  }
  @media (min-width: 769px) {
    border-radius: 15px;
    width: 100px;
    height: 50px;
    font-size: 24px;
  }
`;

const RecommendColorWrapper = styled.div`
  position: absolute;
  bottom: 130px;
  width: 100%;
  height: 72px;
  border: 2px solid #ececec;
  border-radius: 15px;

  @media (min-width: 481px) {
    height: 150px;
  }

  @media (min-width: 769px) {
    width: 550px;
    height: 150px;
    text-align: center;
    left: 1%;
    top: 74%;
  }
`;

const RecommendTabWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media (min-width: 769px) {
    max-width: 550px;
    height: 40px;
    padding: 5px;
    padding-left: 10px;
    text-align: left;
    background-color: black;
  }
`;

const RecommendTabName = styled.span`
  font-size: 21px;
  font-style: bold;
  color: white;
  @media (max-width: 768px) {
    display: none;
  }
`;

const RecommendTabButton = styled.button`
  margin: 5px;
  background: none;
  border: none;
  width: 20px;

  &:hover {
    opacity: 50%;
  }

  @media (min-width: 769px) {
    border: 1px solid rgba(0, 0, 0);
    width: 90px;
    height: 40px;
    padding: 5px;
    text-align: center;
    color: white;
    background-color: black;
    font-size: 19px;
    position: absolute;
    top: -1%;
    left: 86%;
  }
`;

const RecommendContentWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 40px;
  overflow: hidden;
  overflow-x: scroll;
  left: 1%;
  top: 25%;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 481px) {
    height: 100px;
  }

  @media (min-width: 769px) {
    width: 540px;
    height: 100px;
  }
`;

const RecommendContentContainer = styled.div<currRecommandProps>`
  display: flex;
  position: absolute;
  flex-direction: row;
  left: 0%;
  top: 10%;
  @media (min-width: 769px) {
    height: 90px;
    ${(props) => {
      if (props.currrecommandtap === '톤인톤') {
        return `
      width: 920px;
    `;
      } else if (props.currrecommandtap === '톤온톤') {
        return `
      width: 1480px;
    `;
      } else if (props.currrecommandtap === '모노톤') {
        return `
        width: 850px;
      `;
      }
    }}
  }
`;

const RecommendContent = styled.button<recommandProps>`
  width: 30px;
  height: 30px;
  border: none;
  margin: 5px;
  border: 1px solid #ececec;

  &:hover {
    opacity: 50%;
  }

  ${(props) => {
    return `
    background-color: ${props.color};
  `;
  }}

  @media (min-width: 481px) {
    height: 80px;
    width: 60px;
  }

  @media (min-width: 769px) {
    width: 60px;
    height: 80px;
    border: 1px solid rgba(0, 0, 0);
  }
`;

const RouletteWrapper = styled.div<rouletteWrapperProps>`
  position: absolute;
  overflow: hidden;
  left: 70%;
  width: 300px;
  height: 300px;
  top: 150px;
  border-radius: 50%;

  @media (min-width: 481px) {
    top: 320px;
    left: 80%;
  }

  @media (min-width: 769px) {
    width: 500px;
    height: 500px;
    left: 85%;
    top: 35%;
  }

  ${(props) => {
    return `
    transform: rotate(${props.degree}deg);
  `;
  }}
`;

const RouletteCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 180px;
  height: 180px;
  border: 2px solid rgba(0, 0, 0);
  border-radius: 50%;
  background-color: white;
  z-index: 5;
  margin: -90px 0 0 -90px;

  @media (max-width: 768px) {
    border: 1px solid #ececec;
  }
`;

const Roulette = styled.button<rouletteProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  margin: -150px 0 0 -150px;

  border: 2px solid rgba(0, 0, 0);
  border-radius: 50%;
  -webkit-clip-path: polygon(0% 0%, 50% 50%, 0% 50%, 0% 0%);
  clip-path: polygon(0% 0%, 50% 50%, 0% 31%, 0% 0%);

  &:hover {
    opacity: 50%;
  }

  ${(props) => {
    return `
      background-color: ${props.color};
      transform: rotate(${props.degree}deg);
    `;
  }}
  @media (max-width: 768px) {
    border: 1px solid #ececec;
  }
`;

const MobileNavigationContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-grow: 1;
  height: 72px;
  /* border-top: 1px solid black;
  border-bottom: 1px solid black; */
  overflow: hidden;
`;

const MobileMenuItem = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-decoration: none;
  &:focus,
  &:hover {
    outline: none;
    color: #dbdbdb;
  }
`;
const MobileMenuIcon = styled.span`
  display: block;
  margin-bottom: 4px;
  font-size: 26px;
  color: black
  transition: 0.25s ease;
`;

const MobileMenuItemLabel = styled.span`
  display: block;
  font-size: 13px;
  color: black
  transition: 0.25s ease;
`;

function MainPage() {
  const dispatch = useDispatch();
  let recommendColors: RecommendColor = useSelector(getRecommendColor);
  let rouletteColors: RouletteColor = useSelector(getRouletteColor);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currSelectTap, setCurrSelectTap] = useState<string>('');
  const [pickSubSelect, setPickSubSelect] = useState<boolean>(false);
  const [isRoulette, setIsRoulette] = useState<boolean>(false);
  const [isRecommend, setIsRecommend] = useState<boolean>(false);
  const [currRecommendTap, setCurrRecommendTap] = useState<string>('');
  const [pickTopColor, setPickTopColor] = useState<string>('#FFFFFF');
  const [pickBottomColor, setPickBottomColor] = useState<string>('#FFFFFF');
  const [pickSkinColor, setPickSkinColor] = useState<string>('#FFCDB1');
  const [isNext, setIsNext] = useState<boolean>(false);
  const [isNavModalOpen, setIsNavModalOpen] = useState<boolean>(false);
  const [navMobileNavState, setNavMobileNavState] = useState<string>('');
  //? 이미지 스크롤
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<any>();
  const scrollRef = useRef<any>(null);

  //? 룰렛
  const [isRotate, setIsRotate] = useState<boolean>(false);
  const [startY, setStartY] = useState<any>();
  const [degree, setDegree] = useState<number>(0);
  const rotateSpeed = 10;
  let rouletteContentDegree = 0;

  //? Recommend 컬러
  const { tonInton, tonOnton, monoton } = recommendColors;

  //? Roulette 컬러
  const { palette } = rouletteColors;

  //? 성별
  const gender = localStorage.getItem('gender');

  //! 리셋
  function handleReset(event: React.MouseEvent<HTMLButtonElement>) {
    setCurrSelectTap('');
    setPickSubSelect(false);
    setIsRoulette(false);
    setIsRecommend(false);
    setCurrRecommendTap('');
    setPickTopColor('#FFFFFF');
    setPickBottomColor('#FFFFFF');
    setPickSkinColor('#FFCDB1');
  }

  //! 상의, 하의 선택 탭
  function handleCurrSelectTap(value: string) {
    setCurrSelectTap(value);
    setPickSubSelect(false);
  }

  //! 팔레트 오리지널 색 선택
  function handleOriginColor(value: string) {
    setIsRoulette(true);

    dispatch(
      rouletteColor({
        maincolor: value,
        setIsRoulette: null,
      }),
    );
  }

  //! 룰렛 선택 색상
  function handleSelectColor(value: string) {
    const data = {
      selectedcolor: value,
    };

    dispatch(recommendColor(data));

    if (currSelectTap === '상의') {
      setPickTopColor(value);
    } else if (currSelectTap === '하의') {
      setPickBottomColor(value);
    } else if (currSelectTap === '피부톤') {
      setPickSkinColor(value);
    }
  }

  //! Recommend Color 선택시 색상 추천이 계속 안되게 만듬
  function handleSelectRecommendColor(value: string) {
    if (currSelectTap === '상의') {
      setPickTopColor(value);
    } else if (currSelectTap === '하의') {
      setPickBottomColor(value);
    } else if (currSelectTap === '피부톤') {
      setPickSkinColor(value);
    }
  }

  function handlePickSelect(value: string) {
    if (value === '상의' || value === '하의' || value === '피부톤') {
      setPickSubSelect(true);
    }
  }

  //! Recommend 관련 함수
  function handleRecommendTap(event: string) {
    setCurrRecommendTap(event);
  }

  function handleIsRecommendTrue(event: React.MouseEvent<HTMLButtonElement>) {
    setIsRecommend(true);
  }

  function handleIsRecommendFalse(event: React.MouseEvent<HTMLButtonElement>) {
    setIsRecommend(false);
  }

  //! Recommend 이미지 슬라이드 관련 함수
  function onDragStart(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDrag(true);
    setStartX(event.pageX + scrollRef.current.scrollLeft);
  }

  function onDragEnd(event: React.MouseEvent<HTMLDivElement>) {
    setIsDrag(false);
  }

  const onDragMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - event.pageX;

      if (scrollLeft === 0) {
        setStartX(event.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(event.pageX + scrollLeft);
      }
    }
  };

  //! 룰렛 관련 함수
  function onRotateStart(
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) {
    console.log('ON rotate start with touch');
    event.preventDefault();

    setIsRotate(true);
    // @ts-ignore
    const yValue = event.pageY || event.touches[0].pageY;
    setStartY(yValue);
    // setStartY(event.pageY);
  }

  function onRotateEnd(event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
    setIsRotate(false);
  }

  const onRotateMove = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (isRotate) {
      // @ts-ignore
      // @ts-ignore
      const yValue = event.pageY || event.touches[0].pageY;
      if (startY <= yValue) {
        // if (startY <= event.pageY) {
        setDegree(degree - rotateSpeed);
        // @ts-ignore
        setStartY(yValue);
        // @ts-ignore
      } else if (startY >= yValue) {
        setDegree(degree + rotateSpeed);
        // @ts-ignore
        setStartY(yValue);
      }
    }
  };

  //! 이벤트 딜레이 관련 함수
  const delay = 10;
  const throttle = (func: any, ms: number) => {
    let throttled = false;
    return (...args: any) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };

  const onThrottleDragMove = throttle(onDragMove, delay);
  const onThrottleRotateMove = throttle(onRotateMove, 15);

  //! 이미지 저장
  function handleResultImage(event: React.MouseEvent<HTMLButtonElement>) {
    const resultImage = document.getElementById('result_Image') as HTMLDivElement;

    //! 유저가 선택한 탑, 바텀 컬러
    dispatch(
      setUserPickColor({
        topcolor: pickTopColor,
        bottomcolor: pickBottomColor,
      }),
    );

    html2canvas(resultImage).then((canvas) => {
      const imgBase64 = canvas.toDataURL('image/png', 'image/octet-stream');
      const decoding = atob(imgBase64.split(',')[1]);

      let arr = [];
      for (let i = 0; i < decoding.length; i++) {
        arr.push(decoding.charCodeAt(i));
      }

      const imageBlob = new Blob([new Uint8Array(arr)], { type: 'image/png' });

      dispatch(
        saveMainResultImage({
          imageblob: imageBlob,
          setIsNext: setIsNext,
        }),
      );

      dispatch(setMainResultImage({ imageblob: imageBlob }));
    });
  }

  function handleClickScrollTo() {
    window.scrollTo(0, 0);
  }

  function handleClickNavIcon(el: string, e: React.MouseEvent<HTMLButtonElement>) {
    if (navMobileNavState === '종류선택' && el === '종류선택') {
      setIsNavModalOpen(!isNavModalOpen);
    } else if (navMobileNavState !== '종류선택' && el === '종류선택') {
      setIsNavModalOpen(true);
    } else if (el === '색상선택') {
      setIsNavModalOpen(true);
      if (currSelectTap === '피부톤') {
        setCurrSelectTap('');
      }
    } else if (el === '추천색') {
      setIsNavModalOpen(true);
      if (currSelectTap === '피부톤') {
        setCurrSelectTap('');
      }
    } else if (el === '완료') {
      handleResultImage(e);
      handleClickScrollTo();
    }
    setNavMobileNavState(el);

    return;
  }

  return (
    <>
      <MainWrapper>
        <SelectContainer>
          {SelectList.map((el, idx) => {
            return (
              <SelectorList key={idx} onClick={() => handleCurrSelectTap(el)}>
                {el}
              </SelectorList>
            );
          })}
        </SelectContainer>
        {currSelectTap.length !== 0 ? (
          <SubSelectContainer>
            <SubSelectButton onClick={() => handlePickSelect(currSelectTap)}>
              {currSelectTap}
            </SubSelectButton>
          </SubSelectContainer>
        ) : null}
        {isRoulette ? (
          <RouletteWrapper
            onMouseDown={onRotateStart}
            onTouchStart={onRotateStart}
            onMouseMove={onThrottleRotateMove}
            onTouchMove={onThrottleRotateMove}
            onMouseUp={onRotateEnd}
            onTouchEnd={onRotateEnd}
            onMouseLeave={onRotateEnd}
            degree={degree}
          >
            {palette.map((el, idx) => {
              return (
                <Roulette
                  onClick={() => handleSelectColor(el)}
                  key={idx}
                  color={el}
                  degree={(rouletteContentDegree += 24)}
                />
              );
            })}
            <RouletteCenter></RouletteCenter>
          </RouletteWrapper>
        ) : null}
        <RecommendSelectWrapper>
          {recommendTab.map((el, idx) => {
            return (
              <RecommendSelectTab
                key={idx}
                onClick={(event) => {
                  handleRecommendTap(el);
                  handleIsRecommendTrue(event);
                }}
              >
                {el}
              </RecommendSelectTab>
            );
          })}
        </RecommendSelectWrapper>
        {isRecommend ? (
          <RecommendColorWrapper>
            <RecommendTabWrapper>
              <RecommendTabName>{currRecommendTap}</RecommendTabName>
              <RecommendTabButton onClick={handleIsRecommendFalse}>
                <CloseIcon />
              </RecommendTabButton>
            </RecommendTabWrapper>
            <RecommendContentWrapper
              onMouseDown={onDragStart}
              onMouseMove={onThrottleDragMove}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              ref={scrollRef}
            >
              <RecommendContentContainer currrecommandtap={currRecommendTap}>
                {currRecommendTap === '톤인톤'
                  ? tonInton.map((el, idx) => {
                      return (
                        <RecommendContent
                          key={idx}
                          color={el}
                          onClick={() => handleSelectRecommendColor(el)}
                        ></RecommendContent>
                      );
                    })
                  : null}
                {currRecommendTap === '톤온톤'
                  ? tonOnton.map((el, idx) => {
                      return (
                        <RecommendContent
                          onClick={() => handleSelectRecommendColor(el)}
                          color={el}
                          key={idx}
                        ></RecommendContent>
                      );
                    })
                  : null}
                {currRecommendTap === '모노톤'
                  ? monoton.map((el, idx) => {
                      return (
                        <RecommendContent
                          onClick={() => handleSelectRecommendColor(el)}
                          color={el}
                          key={idx}
                        ></RecommendContent>
                      );
                    })
                  : null}
              </RecommendContentContainer>
            </RecommendContentWrapper>
          </RecommendColorWrapper>
        ) : null}
        {pickSubSelect ? (
          <ClothContainer>
            {ClothList[currSelectTap].map((el: string, idx: number) => {
              return <ClothButton key={idx}>{el}</ClothButton>;
            })}
          </ClothContainer>
        ) : null}
        {currSelectTap === '피부톤' ? (
          <SkinSelectWrapper>
            {SkinColor.map((el, idx) => {
              return (
                <SkinSelectButton
                  key={idx}
                  color={el}
                  onClick={() => handleOriginColor(el)}
                ></SkinSelectButton>
              );
            })}
          </SkinSelectWrapper>
        ) : null}
        <PalletteContainer>
          {Color.map((el, idx) => {
            return <Pallette key={idx} onClick={() => handleOriginColor(el)} color={el}></Pallette>;
          })}
        </PalletteContainer>
        <ImageContainer id="result_Image">
          {gender === '남성' ? (
            <ImageMan
              picktopcolor={pickTopColor}
              pickbottomcolor={pickBottomColor}
              pickskincolor={pickSkinColor}
            />
          ) : (
            <ImageWoMan
              picktopcolor={pickTopColor}
              pickbottomcolor={pickBottomColor}
              pickskincolor={pickSkinColor}
            />
          )}
        </ImageContainer>
        {isNavModalOpen && (
          <NavModal>
            {navMobileNavState === '종류선택' && (
              <>
                {SelectList.map((el, idx) => {
                  return (
                    <SelectorList key={idx} onClick={() => handleCurrSelectTap(el)}>
                      {el}
                    </SelectorList>
                  );
                })}
              </>
            )}
            {navMobileNavState === '색상선택' && (
              <>
                <MobilePaletteContainer>
                  {Color.map((el, idx) => {
                    return (
                      <Pallette
                        key={idx}
                        onClick={() => handleOriginColor(el)}
                        color={el}
                      ></Pallette>
                    );
                  })}
                </MobilePaletteContainer>
              </>
            )}
            {navMobileNavState === '추천색' && (
              <>
                {recommendTab.map((el, idx) => {
                  return (
                    <RecommendSelectTab
                      key={idx}
                      onClick={(event) => {
                        handleRecommendTap(el);
                        handleIsRecommendTrue(event);
                      }}
                    >
                      {el}
                    </RecommendSelectTab>
                  );
                })}
              </>
            )}
          </NavModal>
        )}
        <MobileNavigationContainer>
          <MobileMenu>
            {NavList.map((el, idx) => {
              // @ts-ignore
              const MobileNavIcon = NavIconMap[el];
              return (
                <MobileMenuItem key={idx} onClick={(e) => handleClickNavIcon(el, e)}>
                  <MobileMenuIcon>
                    <MobileNavIcon />
                  </MobileMenuIcon>
                  <MobileMenuItemLabel>{el}</MobileMenuItemLabel>
                </MobileMenuItem>
              );
            })}
          </MobileMenu>
        </MobileNavigationContainer>
        <NextButtonWrapper>
          <ResetButton title="초기화" onClick={handleReset}>
            <ResetIcons />
          </ResetButton>
          <NextButton
            title="다음"
            onClick={(el) => {
              handleResultImage(el);
              handleClickScrollTo();
            }}
          >
            {isNext ? (
              <Redirect to="/result">
                <NextIcons />
              </Redirect>
            ) : (
              <NextIcons />
            )}
          </NextButton>
        </NextButtonWrapper>
      </MainWrapper>
    </>
  );
}

export default MainPage;
