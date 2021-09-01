export const dummyState = {
  user: {
    userid: 1,
    realname: 'kimcoding',
    username: 'kcoding',
    email: 'kimcoding@gmail.com',
    userimage: 'https://pbs.twimg.com/profile_images/970625933160857601/R8RSJs1w.jpg',
  },
  posts: [
    {
      id: 1,
      title: '첫 포스트',
      image:
        'https://www.themodestman.com/wp-content/uploads/2019/09/NYC_April_2010_Brock_Eric_Khoi-32-650x880.jpg',
      topcolor: '0,0,0',
      bottomcolor: '250,250,250',
      userid: 1,
      likeCount: 14,
      isPublic: true,
      createdAt: '2021-06-23T16:17:47.000Z',
    },
  ],
  modal: {
    isOpen: false,
    type: '',
  },
};
