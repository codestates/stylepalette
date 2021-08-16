import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as Body } from '../images/TestMan/Body.svg';
import { ReactComponent as Top } from '../images/Top/Top_male.svg';
import { ReactComponent as Bottom } from '../images/Bottom/Bottom.svg';
import { ReactComponent as Man } from '../images/TestMan/Man1.svg';

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

const ClothList: any = {
  피부톤: [],
  상의: ['맨투맨', '라운드티', '셔츠'],
  하의: ['청바지', '반바지'],
  준비중: [],
};

interface imgProps {
  color?: string;
  tab?: string;
  cloth?: string;
  lastTopColor?: string;
  lastBottomColor?: string;
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
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
  margin: 20px 40px;
  width: 100%;
  height: 100%;
  border-radius: 45px;
  background-color: #eaeaea;
`;

const Pallette = styled.button`
  display: inline-block;
  border-style: none;
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

const SelectContainer = styled.ul`
  list-style: none;
  display: inline-block;
  text-align: center;
  max-width: 601px;
  margin: 20px 20px;
  width: 100%;
  border-left: 1px solid rgba(0, 0, 0);
  border-top: 1px solid rgba(0, 0, 0);
  background-color: #eaeaea;
`;

const SelectorList = styled.li`
  list-style: none;
  display: inline-block;
  width: 150px;
  font-size: 24px;
  border-right: 1px solid rgba(0, 0, 0);
  border-bottom: 1px solid rgba(0, 0, 0);
  cursor: pointer;

  &:hover {
    background-color: #dbdbdb;
  }

  &:focus {
    background-color: #ff0000;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -250px 0 0 -250px;
  padding: 50px;
  text-align: center;
  width: 500px;
  height: 500px;
`;

//TODO: 오늘 지금 통합된것까지만 색깔 바뀐다 내일 더해야함
const ImageMan = styled(Man)<imgProps>`
  width: 150px;
  height: 400px;
  z-index: 10;

  ${(props) => {
    if (props.tab === '상의') {
      return `
        #Sweater {
          fill: ${props.color};
        }

        #Pants {
            fill: ${props.lastBottomColor};
        }
      `;
    } else if (props.tab === '하의') {
      return `
          #Sweater {
            fill: ${props.lastTopColor};
          }

          #Pants {
            fill: ${props.color};
          }
        `;
    }
  }}
`;

const BodyImage = styled(Body)<imgProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 400px;
  margin: -200px 0 0 -75px;
`;

const TopImage = styled(Top)<imgProps>`
  position: absolute;
  width: 120px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin: -290px 0 0 -60px;
`;

const BottomImage = styled(Bottom)<imgProps>`
  position: absolute;
  width: 100px;
  height: 400px;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
`;

const SubSelectContainer = styled.div`
  display: inline;
  position: absolute;
  left: 0;
  top: 0;
  margin: 150px 0 0 20px;
  text-align: center;
  width: 100px;
  height: 100px;
`;

const SubSelectButton = styled.button`
  font-style: bold;
  font-size: 24px;
  border-style: none;
  border-radius: 15px;
  width: 100px;
  height: 100px;
  background-color: skyblue;
`;

const ClothContainer = styled.div`
  display: inline;
  position: absolute;
  left: 0%;
  top: 0%;
  margin: 150px 0 0 140px;
  text-align: center;
  width: 100px;
`;

const ClothButton = styled.button`
  font-style: bold;
  font-size: 24px;
  border-style: none;
  width: 100px;
  height: 100px;
  background-color: pink;
`;

function MainPage() {
  const [selectColor, setSelectColor] = useState<string>('');
  const [currSelectTap, setCurrSelectTap] = useState<string>('');
  const [pickSubSelect, setPickSubSelect] = useState<boolean>(false);
  const [lastPickTopColor, setLastPickTopColor] = useState<string>('#FFFFFF');
  const [lastPickBottomColor, setLastPickBottomColor] = useState<string>('#FFFFFF');

  function handleCurrSelectTap(event: string) {
    setCurrSelectTap(event);

    if (event === '상의') {
      setLastPickBottomColor(selectColor);
      setSelectColor(lastPickTopColor);
    } else if (event === '하의') {
      setLastPickTopColor(selectColor);
      setSelectColor(lastPickBottomColor);
    }
  }

  function handleSelectColor(event: string) {
    setSelectColor(event);
  }

  function handlePickSelect(event: string) {
    setPickSubSelect(false);

    if (event === '상의' || event === '하의') {
      setPickSubSelect(true);
    } else {
      setPickSubSelect(false);
    }
  }

  return (
    <>
      <MainWrapper>
        <SelectContainer>
          {SelectList.map((el) => {
            return <SelectorList onClick={() => handleCurrSelectTap(el)}>{el}</SelectorList>;
          })}
        </SelectContainer>
        {currSelectTap.length !== 0 ? (
          <SubSelectContainer>
            <SubSelectButton onClick={() => handlePickSelect(currSelectTap)}>
              {currSelectTap}
            </SubSelectButton>
          </SubSelectContainer>
        ) : null}
        {pickSubSelect ? (
          <ClothContainer>
            {ClothList[currSelectTap].map((el: string) => {
              return <ClothButton>{el}</ClothButton>;
            })}
          </ClothContainer>
        ) : null}
        <PalletteContainer>
          {Color.map((el) => {
            return <Pallette onClick={() => handleSelectColor(el)} color={el}></Pallette>;
          })}
        </PalletteContainer>
        <ImageContainer>
          {/* <BodyImage />
          {currSelectTap === '상의' ? (
            <TopImage fill={selectColor} />
          ) : (
            <TopImage fill={lastPickTopColor} />
          )}
          {currSelectTap === '하의' ? (
            <BottomImage fill={selectColor} />
          ) : (
            <BottomImage fill={lastPickBottomColor} />
          )} */}
          <ImageMan
            color={selectColor}
            tab={currSelectTap}
            lastTopColor={lastPickTopColor}
            lastBottomColor={lastPickBottomColor}
          />
        </ImageContainer>
      </MainWrapper>
    </>
  );
}

export default MainPage;
