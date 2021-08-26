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
  align-items: center;
  left: 0;
  top: 0;
  padding-top: 5rem;
`;

const FillterContainer = styled.div`
  display: grid;
  align-items: center;
  text-align: left;
`;

const ListContainer = styled.div`
  display: inline-block;
  max-width: 962px;
  margin: 80px 0 80px;
  width: 100%;
  border-top: 2px solid black;
  border-left: 2px solid black;
`;

const ColorList = styled.button`
  text-align: center;
  display: inline-block;
  width: 160px;
  height: 65px;
  padding: 12px 8px;
  border: none;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  cursor: pointer;
  background-color: white;
  color: black;
  font-weight: bold;
  font-size: 1.2rem;

  &:hover {
    opacity: 80%;
    background-color: #dbdbdb;
  }

  &:focus {
    opacity: 80%;
    background-color: #dbdbdb;
  }
`;

const GalleryContainer = styled.div`
  width: 70%;
  display: flex;
  text-align: left;
  flex-direction: column;
  justify-content: center;
  padding: 20px 10px;
  margin: 15px 15px 50px 15px;
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: 0 0px 5px 3px #333333;
`;

const PhotoWrapper = styled.div`
  padding: 20px 50px;
`;

const NavIcon = styled.button`
  margin: 30px 6px 30px 6px;
  width: 280px;
  height: 280px;
  background-color: white;
  border-style: none;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin: 0 50px 50px 50px;
  }
`;

const PostPhoto = styled.img`
  border: 2px solid #777777;
  border-radius: 5px;
  width: 275px;
  height: 275px;

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

  useEffect(() => {
    dispatchAllPosts();
  }, [filterPost]);

  const dispatchAllPosts = () => {
    dispatch(getAllPosts());
  };

  const handleClickPostInfo = async (postid: number | null) => {
    dispatch(
      getPost({
        postId: postid,
      }),
    );
  };

  if (isRoulette) {
    palette.shift();
    palette.pop();

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
              ? posts.length <= 1
                ? null
                : posts
                    .filter((el) => {
                      return el.isPublic === true;
                    })
                    .map((el, idx) => {
                      return (
                        <NavIcon key={idx} onClick={() => handleClickPostInfo(el.id)}>
                          <PostPhoto key={idx} src={el.image} />
                        </NavIcon>
                      );
                    })
                    .reverse()
              : filterPost
                  .filter((el: any) => {
                    return el.isPublic === true;
                  })
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
