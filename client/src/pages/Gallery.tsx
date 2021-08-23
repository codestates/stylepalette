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
  const [filterPost, setFilterPost] = useState<any>(posts.reverse());
  const { palette } = colorDatas;

  useEffect(() => {
    dispatchAllPosts();
  }, []);

  const dispatchAllPosts = async () => {
    await dispatch(getAllPosts());
  };

  const handleClickPostInfo = async (postid: number | null) => {
    await dispatch(
      getPost({
        postId: postid,
      }),
    );
    dispatch(handleModal({ isOpen: true, type: 'postInfo' }));
  };

  const filteredFunc = (value: string) => {
    const colorData = {
      maincolor: value,
    };

    dispatch(rouletteColor(colorData));

    const filterData = posts.filter((el) => {
      for (let i = 0; i < palette.length; i++) {
        if (el.topcolor === palette[i]) {
          return el;
        } else if (el.bottomcolor === palette[i]) {
          return el;
        }
      }
    });

    const reverseData = filterData.reverse();

    return reverseData;
  };

  const handleGetCategory = async (value: string) => {
    switch (value) {
      case '최신순': {
        const reversePost = posts.reverse();

        setFilterPost(reversePost);
        break;
      }
      case '인기순': {
        const sortPost = posts.sort((a, b) => {
          return b.likeCount - a.likeCount;
        });

        setFilterPost(sortPost);
        break;
      }
      case '빨강': {
        const filterCategory = filteredFunc('#FF0000');
        setFilterPost(filterCategory);

        break;
      }
      case '주황': {
        const filterCategory = await filteredFunc('#FFA500');
        setFilterPost(filterCategory);

        break;
      }
      case '노랑': {
        const filterCategory = await filteredFunc('#FFFF00');
        setFilterPost(filterCategory);

        break;
      }
      case '초록': {
        const filterCategory = await filteredFunc('#008000');
        setFilterPost(filterCategory);

        break;
      }
      case '파랑': {
        const filterCategory = await filteredFunc('#0000FF');
        setFilterPost(filterCategory);

        break;
      }
      case '남색': {
        const filterCategory = await filteredFunc('#00008B');
        setFilterPost(filterCategory);

        break;
      }
      case '보라': {
        const filterCategory = await filteredFunc('#800080');
        setFilterPost(filterCategory);

        break;
      }
      case '하양': {
        const filterCategory = await filteredFunc('#FFFFFF');
        setFilterPost(filterCategory);

        break;
      }
      case '검정': {
        const filterCategory = await filteredFunc('#000000');
        setFilterPost(filterCategory);

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
              ? posts.map((el, idx) => {
                  return (
                    <NavIcon key={idx} onClick={() => handleClickPostInfo(el.id)}>
                      <PostPhoto key={idx} src={el.image} />
                    </NavIcon>
                  );
                })
              : filterPost.map((el: any, idx: any) => {
                  return (
                    <NavIcon key={idx} onClick={() => handleClickPostInfo(el.id)}>
                      <PostPhoto key={idx} src={el.image} />
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
