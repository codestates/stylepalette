import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { PostsState, RouletteColor } from '../redux/reducers/initialState';
import { handleModal, getPost, rouletteColor, getAllPosts } from '../redux/actions/action';
import { getPosts, getRouletteColor } from '../redux/selectors';

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
  let posts: PostsState[] = useSelector(getPosts);
  let colorDatas: RouletteColor = useSelector(getRouletteColor);
  const { palette } = colorDatas;
  const [filterPost, setFilterPost] = useState<any>(posts.reverse());
  const [isRoulette, setIsRoulette] = useState<boolean>(false);

  console.log('filterPost:', filterPost);

  useEffect(() => {
    dispatchAllPosts();
  }, [filterPost]);

  const dispatchAllPosts = () => {
    dispatch(getAllPosts());
  };

  const handleClickPostInfo = async (postid: number | null) => {
    dispatch(handleModal({ isOpen: true, type: 'postInfo', data: postid }));
  };

  if (isRoulette) {
    const filterData = posts.filter((el) => {
      for (let i = 0; i < palette.length; i++) {
        if (el.topcolor === palette[i]) {
          return el;
        } else if (el.bottomcolor === palette[i]) {
          return el;
        }
      }
    });

    setFilterPost(filterData.reverse());
    setIsRoulette(false);
  }

  const filteredFunc = (value: string) => {
    dispatch(
      rouletteColor({
        maincolor: value,
        setIsRoulette: setIsRoulette,
      }),
    );
  };

  const handleGetCategory = async (value: string) => {
    switch (value) {
      case '최신순': {
        const reversePost = posts;
        setFilterPost(reversePost);
        break;
      }
      case '인기순': {
        const sortPost = posts.sort((a, b) => {
          return b.likeCount - a.likeCount;
        });

        setFilterPost(sortPost.reverse());
        break;
      }
      case '빨강': {
        filteredFunc('#FF0000');

        break;
      }
      case '주황': {
        filteredFunc('#FFA500');
        break;
      }
      case '노랑': {
        filteredFunc('#FFFF00');

        break;
      }
      case '초록': {
        filteredFunc('#008000');

        break;
      }
      case '파랑': {
        filteredFunc('#0000FF');

        break;
      }
      case '남색': {
        filteredFunc('#00008B');
        break;
      }
      case '보라': {
        filteredFunc('#800080');
        break;
      }
      case '하양': {
        filteredFunc('#FFFFFF');

        break;
      }
      case '검정': {
        filteredFunc('#000000');

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
            {Color.map((el, idx) => {
              return (
                <ColorList key={idx} onClick={() => handleGetCategory(el)}>
                  {el}
                </ColorList>
              );
            })}
          </ListContainer>
        </FillterContainer>
        <GalleryContainer>
          <PhotoWrapper>
            {filterPost.length <= 1
              ? posts
                  .map((el, idx) => {
                    return (
                      <NavIcon key={idx} onClick={() => handleClickPostInfo(el.id)}>
                        <PostPhoto key={idx} src={el.image} />
                      </NavIcon>
                    );
                  })
                  .reverse()
              : filterPost
                  .map((el: any, idx: any) => {
                    return (
                      <NavIcon key={idx} onClick={() => handleClickPostInfo(el.id)}>
                        <PostPhoto key={idx} src={el.image} />
                      </NavIcon>
                    );
                  })
                  .reverse()}
          </PhotoWrapper>
        </GalleryContainer>
      </GalleryWrapper>
    </>
  );
}

export default Gallery;
