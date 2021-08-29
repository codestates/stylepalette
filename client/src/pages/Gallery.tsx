import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { PostsState, RouletteColor } from '../redux/reducers/initialState';
import { handleModal, getPost, rouletteColor, getAllPosts } from '../redux/actions/action';
import { getPosts, getRouletteColor } from '../redux/selectors';
import { ReactComponent as FilterIcon } from '../images/filter.svg';
import { ReactComponent as CloseIcon } from '../images/close.svg';

interface DotProps {
  color: string;
}

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

const GalleryPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
  left: 0;
  top: 0;
  padding-top: 5rem;
`;

const GalleryWrapper = styled.div`
  padding: 15px;
  @media (max-width: 768px) {
    padding: 2px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 767px) {
    display: none;
  }
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 962px;
  margin: 20px;
  width: 100%;
  @media (max-width: 767px) {
    display: none;
  }
`;

const ListContainerMobile = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 10px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ColorList = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 40px;
  border: 1px solid #efefef;
  background: #fff;
  margin: 0 4px 4px 0;
  font-size: 12px;
  height: 40px;
  width: 60px;
  cursor: pointer;
  &:focus {
    opacity: 80%;
    background-color: #dbdbdb;
  }
`;

const GalleryContainer = styled.div`
  display: table;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  min-width: 768px;
  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const PhotoWrapper = styled.div`
  padding: 1rem;
  display: table-cell;
  width: 100%;
  /* padding: 20px 50px; */
`;

const NavIcon = styled.button`
  display: inline-block;
  width: 31%;
  background-color: white;
  border-style: none;
  margin: 1%;
  @media (max-width: 768px) {
    width: 48%;
  }
`;

const PostPhoto = styled.img`
  border: 2px solid #efefef;
  border-radius: 5px;
  width: 100%;
  height: auto;
  object-fit: cover;

  &:hover {
    opacity: 80%;
    cursor: pointer;
  }
`;

const Modal = styled.div`
  display: block;
  width: 100%;
  padding: 20px;
  background: rgba(250, 250, 250, 0.95);
  border-radius: 20px;
`;

const MobileColorList = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 40px;
  border: 1px solid #efefef;
  background: #fff;
  margin: 0 4px 4px 0;
  font-size: 12px;
  height: 34px;
  width: 50px;
  cursor: pointer;
  &:focus {
    opacity: 80%;
    background-color: #efefef;
  }
`;

const Dot = styled.span<DotProps>`
  height: 10px;
  width: 10px;
  border: 1px solid #efefef;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
  ${(props) => {
    if (props.color === '빨강') {
      return `
        background:#FF0000;
    `;
    } else if (props.color === '주황') {
      return `
        background: #FFA500;
    `;
    } else if (props.color === '노랑') {
      return `
        background: #FFFF00;
    `;
    } else if (props.color === '초록') {
      return `
        background: #008000;
    `;
    } else if (props.color === '파랑') {
      return `
        background: #0000FF;
    `;
    } else if (props.color === '남색') {
      return `
        background: #00008B;
    `;
    } else if (props.color === '보라') {
      return `
        background: #800080;
    `;
    } else if (props.color === '하양') {
      return `
        background: #FFFFFF;
    `;
    } else if (props.color === '검정') {
      return `
        background: #000000;
    `;
    } else {
      return `display:none`;
    }
  }}
`;

function Gallery() {
  const dispatch = useDispatch();
  let posts: PostsState[] = useSelector(getPosts);
  let colorDatas: RouletteColor = useSelector(getRouletteColor);
  const { palette } = colorDatas;
  const [filterPost, setFilterPost] = useState<any>(posts.reverse());
  const [isRoulette, setIsRoulette] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleClickFilterIcon = (event: React.MouseEvent) => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <GalleryPageWrapper>
        <GalleryWrapper>
          <FilterContainer>
            <ListContainer>
              {Color.map((el, idx) => {
                return (
                  <ColorList key={idx} onClick={() => handleGetCategory(el)}>
                    <Dot color={el} />
                    {el}
                  </ColorList>
                );
              })}
            </ListContainer>
          </FilterContainer>
          <ListContainerMobile onClick={handleClickFilterIcon}>
            {isModalOpen ? <CloseIcon /> : <FilterIcon />}
          </ListContainerMobile>
          {isModalOpen && (
            <Modal>
              {Color.map((el, idx) => {
                return (
                  <MobileColorList key={idx} onClick={() => handleGetCategory(el)}>
                    <Dot color={el} />
                    {el}
                  </MobileColorList>
                );
              })}
            </Modal>
          )}
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
      </GalleryPageWrapper>
    </>
  );
}

export default Gallery;
