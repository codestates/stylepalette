export const getPosts = (state: any) => {
  return state.postsState;
};

export const getPostState = (state: any) => {
  return state.postState;
};

export const getLikeState = (state: any) => {
  return state.likeState;
};

export const getUser = (state: any) => {
  return state.userState;
};

export const getOtherUser = (state: any) => {
  return state.otherUserState;
};

export const getIsLoggedIn = (state: any): boolean => {
  return state.userState.token !== '';
};

export const getMessage = (state: any) => {
  return state.userState.apiMessage;
};

export const getIsModalOpen = (state: any): boolean => {
  return state.modalState.isOpen;
};

export const getModalType = (state: any) => {
  return state.modalState.type;
};

export const getModalData = (state: any) => {
  return state.modalState.data;
};

export const getRecommendColor = (state: any) => {
  return state.recommendcolorState;
};

export const getRouletteColor = (state: any) => {
  return state.roulettecolorState;
};

export const getUserPickColor = (state: any) => {
  return state.userpickcolorState;
};

export const getMainResultImage = (state: any) => {
  return state.mainresultimageState;
};
