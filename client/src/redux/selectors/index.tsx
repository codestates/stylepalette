export const getPosts = (state: any) => {
  return state.postState;
};

export const getUser = (state: any) => {
  return state.userState;
};

export const getIsLoggedIn = (state: any): boolean => {
  return state.userState.userid !== null;
};

export const getIsModalOpen = (state: any): boolean => {
  return state.modalState.isOpen;
};

export const getModalType = (state: any) => {
  return state.modalState.type;
};
