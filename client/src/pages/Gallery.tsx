import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { handleModal } from '../redux/actions/action';

import { serverUrl } from '../utils/constants';
import axios from 'axios';

import Photo from '../dummyData/dummyPhoto';

const Color = [
  '최신순',
  '인기순',
  '빨강',
  '주황',
  '노랑',
  '초록',
  '파랑',
  '남색',
  '보라',
  '하양',
  '검정',
];

const GalleryWrapper = styled.div`
  width: 100vw;
  display: flex;
  background-color: white;
  flex-direction: column;
  left: 0;
  top: 0;
`;

const FillterContainer = styled.div`
  display: grid;
  justify-content: center;
  text-align: left;
`;

const ListContainer = styled.div`
  display: inline-block;
  max-width: 601px;
  margin: 80px 0 40px;
  width: 100%;
  border-top: 1px solid rgb(147, 112, 98);
  border-left: 1px solid rgb(147, 112, 98);
`;

const ColorList = styled.button`
  text-align: center;
  display: inline-block;
  width: 100px;
  padding: 12px 8px;
  border: none;
  border-right: 1px solid rgb(147, 112, 98);
  border-bottom: 1px solid rgb(147, 112, 98);
  cursor: pointer;
  background-color: white;

  &:hover {
    opacity: 80%;
    background-color: #c79a00;
  }

  &:active {
    background-color: #c79a00;
  }
`;

const GalleryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  margin: 15px;
`;

const PhotoWrapper = styled.div`
  padding: 0 50px 50px 50px;
`;

const NavIcon = styled.button`
  margin: 0 50px 100px 68px;
  width: 300px;
  height: 300px;
  background-color: white;
  border-style: none;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin: 0 50px 50px 50px;
  }
`;

const PostPhoto = styled.img`
  border-style: solid;
  border-width: 2px;
  border-color: #c79a00;
  width: 295px;
  height: 295px;

  &:hover {
    opacity: 80%;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

function Gallery() {
  const dispatch = useDispatch();
  const [colorData, setColorData] = useState<string>('');

  const handleClickPostInfo = (event: React.MouseEvent) => {
    dispatch(handleModal({ isOpen: true, type: 'postInfo' }));
  };

  const handleGetCategory = (value?: string) => {
    switch (value) {
      case '인기순': {
        setColorData(value);
        break;
      }
      case '빨강': {
        setColorData('#FF0000');
        break;
      }
      case '주황': {
        setColorData('#FFA500');
        break;
      }
      case '노랑': {
        setColorData('#FFFF00');
        break;
      }
      case '초록': {
        setColorData('#008000	');
        break;
      }
      case '파랑': {
        setColorData('#0000FF');
        break;
      }
      case '남색': {
        setColorData('#00008B');
        break;
      }
      case '보라': {
        setColorData('#800080');
        break;
      }
      case '하양': {
        setColorData('#FFFFFF');
        break;
      }
      case '검정': {
        setColorData('#000000');
        break;
      }

      default:
        break;
    }
  };

  return (
    <>
      <GalleryWrapper>
        <FillterContainer>
          <ListContainer>
            {Color.map((el) => {
              return <ColorList onClick={() => handleGetCategory(el)}>{el}</ColorList>;
            })}
          </ListContainer>
        </FillterContainer>
        <GalleryContainer>
          <PhotoWrapper>
            {Photo.map((el) => {
              return (
                <NavIcon onClick={handleClickPostInfo}>
                  <PostPhoto src={el} />
                </NavIcon>
              );
            })}
          </PhotoWrapper>
        </GalleryContainer>
      </GalleryWrapper>
    </>
  );
}

export default Gallery;
