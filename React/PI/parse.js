
const linkList = [
  {
    생필품: [
      {
        id: 1,
        title: "음료수",
        link: "naver.com",
        price: "3000",
        info: "그냥 추가정보",
      },
      {
        id: 2,
        title: "탄산수",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 3,
        title: "쌀",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 4,
        title: "샴푸",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 5,
        title: "고기",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 6,
        title: "햇반",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
      {
        id: 7,
        title: "고무",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
    ],
  },
  {
    옷가지: [
      {
        id: 1,
        title: "옷",
        link: "naver.com",
        price: "3000",
        info: "그냥 추가정보",
      },
      {
        id: 2,
        title: "후드티",
        link: "coupang.com",
        price: "90000",
        info: "그냥 추가정보",
      },
    ],
  },
];


linkList.map((obj, idx) => { 
  obj[Object.keys(obj)].map((element, id) => { 
    console.log(Object.keys(obj));
    
  })
  
})