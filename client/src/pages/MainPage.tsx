import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import html2canvas from 'html2canvas';

import { NavigateNext } from '@styled-icons/material-outlined/NavigateNext';
import { RestartAlt } from '@styled-icons/material-twotone/RestartAlt';
import { ReactComponent as Man } from '../images/Man/Man-default.svg';
import { ReactComponent as Woman } from '../images/Woman/Woman-default.svg';

import {
  recommendColor,
  rouletteColor,
  setUserPickColor,
  saveMainResultImage,
  setMainResultImage,
} from '../redux/actions/action';
import { RecommendColor, RouletteColor } from '../redux/reducers/initialState';
import { getRecommendColor, getRouletteColor } from '../redux/selectors';

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
const SelectList = ['피부톤', '상의', '하의', '준비중'];
const recommendTab = ['톤인톤', '톤온톤', '모노톤'];

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
`;

const PalletteContainer = styled.div`
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
`;

const Pallette = styled.button<colorProps>`
  display: inline-block;
  border: 2px solid rgba(0, 0, 0);
  width: 60px;
  height: 60px;
  margin: 15px 10px;
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
`;

const SkinSelectWrapper = styled.div`
  position: absolute;
  left: 7%;
  top: 16%;
  border: 2px solid rgba(0, 0, 0);
  border-radius: 15px;
  width: 275px;
  height: 100px;
  text-align: center;
`;

const SkinSelectButton = styled.button<colorProps>`
  border: 2px solid rgba(0, 0, 0);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin: 15px 10px;
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
`;

const ImageMan = styled(Man)<imgProps>`
  width: 175px;
  height: 490px;

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
  left: 1%;
  top: 16%;
  text-align: center;
  width: 100px;
  height: 100px;
`;

const SubSelectButton = styled.button`
  border: 2px solid black;
  border-radius: 15px;
  width: 100px;
  height: 100px;
  font-style: bold;
  font-size: 24px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #eaeaea;
  }
`;

const NextButtonWrapper = styled.div`
  display: inline;
  position: absolute;
  text-align: center;
  width: 205px;
  height: 100px;

  left: 87%;
  top: 88%;
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
`;

const NextIcons = styled(NavigateNext)`
  color: white;
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
`;

const RecommendSelectTab = styled.button`
  border: 2px solid rgba(0, 0, 0);
  border-radius: 15px;
  width: 100px;
  height: 50px;
  margin: 8px;
  margin-left: 0;
  font-style: bold;
  font-size: 24px;
  color: white;
  background-color: black;
  cursor: pointer;

  &:hover {
    opacity: 50%;
  }
`;

const RecommendColorWrapper = styled.div`
  position: absolute;
  width: 550px;
  height: 150px;
  text-align: center;
  border: 2px solid rgba(0, 0, 0);
  border-radius: 15px;
  left: 1%;
  top: 74%;
`;

const RecommendTabWrapper = styled.div`
  max-width: 550px;
  height: 40px;
  padding: 5px;
  padding-left: 10px;
  text-align: left;
  background-color: black;
`;

const RecommendTabName = styled.span`
  font-size: 21px;
  font-style: bold;
  color: white;
`;

const RecommendTabButton = styled.button`
  position: absolute;
  top: -1%;
  left: 86%;
  font-size: 19px;
  font-style: bold;
  border: 1px solid rgba(0, 0, 0);
  width: 90px;
  height: 40px;
  padding: 5px;
  text-align: center;
  color: white;
  background-color: black;

  &:hover {
    opacity: 50%;
  }
`;

const RecommendContentWrapper = styled.div`
  position: absolute;
  width: 540px;
  height: 100px;
  overflow: hidden;
  overflow-x: scroll;
  left: 1%;
  top: 25%;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const RecommendContentContainer = styled.div<currRecommandProps>`
  display: flex;
  height: 90px;
  position: absolute;
  flex-direction: row;
  left: 0%;
  top: 10%;

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
`;

const RecommendContent = styled.button<recommandProps>`
  width: 60px;
  height: 80px;
  border: 1px solid rgba(0, 0, 0);
  margin: 5px;

  &:hover {
    opacity: 50%;
  }

  ${(props) => {
    return `
    background-color: ${props.color};
  `;
  }}
`;

const RouletteWrapper = styled.div<rouletteWrapperProps>`
  position: absolute;
  width: 500px;
  height: 500px;
  left: 85%;
  top: 35%;
  border-radius: 50%;

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
`;

function MainPage() {
  const dispatch = useDispatch();
  let recommendColors: RecommendColor = useSelector(getRecommendColor);
  let rouletteColors: RouletteColor = useSelector(getRouletteColor);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currSelectTap, setCurrSelectTap] = useState<string>('');
  const [isRoulette, setIsRoulette] = useState<boolean>(false);
  const [isRecommend, setIsRecommend] = useState<boolean>(false);
  const [currRecommendTap, setCurrRecommendTap] = useState<string>('');
  const [pickTopColor, setPickTopColor] = useState<string>('#FFFFFF');
  const [pickBottomColor, setPickBottomColor] = useState<string>('#FFFFFF');
  const [pickSkinColor, setPickSkinColor] = useState<string>('#FFCDB1');
  const [isNext, setIsNext] = useState<boolean>(false);

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
  function onRotateStart(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsRotate(true);
    setStartY(event.pageY);
  }

  function onRotateEnd(event: React.MouseEvent<HTMLDivElement>) {
    setIsRotate(false);
  }

  const onRotateMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isRotate) {
      if (startY <= event.pageY) {
        setDegree(degree - rotateSpeed);
        setStartY(event.pageY);
      } else if (startY >= event.pageY) {
        setDegree(degree + rotateSpeed);
        setStartY(event.pageY);
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
            <SubSelectButton>{currSelectTap}</SubSelectButton>
          </SubSelectContainer>
        ) : null}
        {isRoulette ? (
          <RouletteWrapper
            onMouseDown={onRotateStart}
            onMouseMove={onThrottleRotateMove}
            onMouseUp={onRotateEnd}
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
              <RecommendTabButton onClick={handleIsRecommendFalse}>닫기</RecommendTabButton>
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
