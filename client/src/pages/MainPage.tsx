import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ArrowLongRight } from '@styled-icons/entypo/ArrowLongRight';
import { ReactComponent as Man } from '../images/Man/Man-default.svg';
import { ReactComponent as Woman } from '../images/Woman/Woman-default.svg';

import { recommendColor } from '../redux/actions/action';
import { RecommendColor } from '../redux/reducers/initialState';
import { getRecommendColor } from '../redux/selectors';

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

const SelectList = ['피부톤', '상의', '하의', '준비중'];
const recommendTab = ['톤인톤', '톤온톤', '모노'];

const ClothList: any = {
  피부톤: [],
  상의: ['맨투맨', '라운드티', '셔츠'],
  하의: ['청바지', '반바지'],
  준비중: [],
};

interface MainProps {
  gender?: string;
}

interface imgProps {
  color?: string;
  picktopcolor?: string;
  pickbottomcolor?: string;
}

interface recommandProps {
  color?: string;
}

interface currRecommandProps {
  currrecommandtap?: string;
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: white;
  left: 0;
  top: 0;
`;

const PalletteContainer = styled.ul`
  list-style: none;
  display: inline;
  float: right;
  text-align: center;
  max-width: 270px;
  max-height: 280px;
  margin: 20px 30px;
  width: 100%;
  height: 100%;
  border-radius: 45px;
  border: 2px solid rgba(0, 0, 0);
  background-color: white;
`;

const Pallette = styled.button`
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
    width: 70px;
    height: 70px;
  }

  @keyframes hoverColor {
    100% {
      width: 70px;
      height: 70px;
    }
  }
`;

const SelectContainer = styled.div`
  display: inline-block;
  position: absolute;
  left: 1%;
  top: 6%;
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
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -250px 0 0 -250px;
  text-align: center;
  width: 500px;
  height: 500px;
`;

const ImageMan = styled(Man)<imgProps>`
  width: 175px;
  height: 500px;

  ${(props) => {
    return `
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
  height: 500px;

  ${(props) => {
    return `
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
  top: 15%;
  text-align: center;
  width: 100px;
  height: 100px;
`;

const SubSelectButton = styled.button`
  border: 2px solid rgba(0, 0, 0);
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

const ClothContainer = styled.div`
  display: inline;
  position: absolute;
  left: 7%;
  top: 15%;
  text-align: center;
  width: 100px;
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
`;

const NextButtonWrapper = styled.div`
  display: inline;
  position: absolute;
  text-align: center;
  width: 125px;
  height: 125px;

  left: 92%;
  top: 85%;
`;

const NextButton = styled.button`
  width: 125px;
  height: 125px;
  border: none;
  text-align: center;
  background-color: white;
  cursor: pointer;

  &:hover {
    opacity: 50%;
  }
`;

const NextIcons = styled(ArrowLongRight)`
  color: black;
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
  height: 130px;
  text-align: center;
  border: 2px solid rgba(0, 0, 0);
  border-radius: 15px;
  left: 1%;
  top: 76%;
`;

const RecommendTabWrapper = styled.div`
  max-width: 550px;
  text-align: left;
`;

const RecommendTabName = styled.span`
  font-size: 21px;
  font-style: bold;
  padding: 5px;
  padding-left: 10px;
  padding-top: 0;
`;

const RecommendContentWrapper = styled.div`
  position: absolute;
  width: 540px;
  height: 90px;
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
  position: absolute;
  flex-direction: row;
  left: 0%;

  ${(props) => {
    if (props.currrecommandtap === '톤인톤') {
      return `
      width: 920px;
    `;
    } else if (props.currrecommandtap === '톤온톤') {
      return `
      width: 1480px;
    `;
    } else if (props.currrecommandtap === '모노') {
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

function MainPage(props: MainProps) {
  const dispatch = useDispatch();
  const recommendColors: RecommendColor = useSelector(getRecommendColor);
  const [selectColor, setSelectColor] = useState<string>('');
  const [currSelectTap, setCurrSelectTap] = useState<string>('');
  const [pickSubSelect, setPickSubSelect] = useState<boolean>(false);
  const [currRecommendTap, setCurrRecommendTap] = useState<string>('');
  const [pickTopColor, setPickTopColor] = useState<string>('#FFFFFF');
  const [pickBottomColor, setPickBottomColor] = useState<string>('#FFFFFF');

  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [startX, setStartX] = useState<any>();

  const scrollRef = useRef<any>(null);
  const { tonInton, tonOnton, monoton } = recommendColors;

  function handleCurrSelectTap(value: string) {
    setCurrSelectTap(value);
  }

  function handleSelectColor(value: string) {
    const currentColor = {
      selectedcolor: value,
    };
    dispatch(recommendColor(currentColor));

    console.log('recommendColors:', recommendColors);

    setSelectColor(value);
    if (currSelectTap === '상의') {
      setPickTopColor(value);
    } else if (currSelectTap === '하의') {
      setPickBottomColor(value);
    }
  }

  function handlePickSelect(value: string) {
    setPickSubSelect(false);

    if (value === '상의' || value === '하의') {
      setPickSubSelect(true);
    } else {
      setPickSubSelect(false);
    }
  }

  function handleRecommendTap(event: string) {
    setCurrRecommendTap(event);
  }

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

  //TODO: 내일은 룰렛 만들고 div 범위 이미지로 저장해야함

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
        <RecommendSelectWrapper>
          {recommendTab.map((el, idx) => {
            return (
              <RecommendSelectTab key={idx} onClick={() => handleRecommendTap(el)}>
                {el}
              </RecommendSelectTab>
            );
          })}
        </RecommendSelectWrapper>
        <RecommendColorWrapper>
          <RecommendTabWrapper>
            <RecommendTabName>{currRecommendTap}</RecommendTabName>
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
                        onClick={() => handleSelectColor(el)}
                      ></RecommendContent>
                    );
                  })
                : null}
              {currRecommendTap === '톤온톤'
                ? tonOnton.map((el, idx) => {
                    return (
                      <RecommendContent
                        onClick={() => handleSelectColor(el)}
                        color={el}
                        key={idx}
                      ></RecommendContent>
                    );
                  })
                : null}
              {currRecommendTap === '모노'
                ? monoton.map((el, idx) => {
                    return (
                      <RecommendContent
                        onClick={() => handleSelectColor(el)}
                        color={el}
                        key={idx}
                      ></RecommendContent>
                    );
                  })
                : null}
            </RecommendContentContainer>
          </RecommendContentWrapper>
        </RecommendColorWrapper>
        {pickSubSelect ? (
          <ClothContainer>
            {ClothList[currSelectTap].map((el: string) => {
              return <ClothButton>{el}</ClothButton>;
            })}
          </ClothContainer>
        ) : null}
        <PalletteContainer>
          {Color.map((el, idx) => {
            return <Pallette key={idx} onClick={() => handleSelectColor(el)} color={el}></Pallette>;
          })}
        </PalletteContainer>
        <ImageContainer>
          {props.gender === '남성' ? (
            <ImageMan
              color={selectColor}
              picktopcolor={pickTopColor}
              pickbottomcolor={pickBottomColor}
            />
          ) : (
            <ImageWoMan
              color={selectColor}
              picktopcolor={pickTopColor}
              pickbottomcolor={pickBottomColor}
            />
          )}
        </ImageContainer>
        <NextButtonWrapper>
          <NextButton>
            <NextIcons />
          </NextButton>
        </NextButtonWrapper>
      </MainWrapper>
    </>
  );
}

export default MainPage;
