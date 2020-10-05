const dummy =
  //사용자가 추가할 category
  {
    category: [
      {
        생필품: [
          {
            title: "생수",
            link: "생수 링크",
            price: "생수 가격",
            크롤링데이터: {
              크롤링제목: "생수크롤링제목",
              크롤링링크: "크롤링 링크",
              크롤링가격: "크롤링가격",
            },
          },
          {
            title: "탄산수",
            link: "탄산수 링크",
            price: "탄산수  가격",
            크롤링데이터: {
              크롤링제목: "탄산수 크롤링제목",
              크롤링링크: "탄산수 크롤링 링크",
              크롤링가격: "탄산수 크롤링가격",
            },
          },
        ],
      },
      {
        옷: [
          {
            title: "후드티",
            link: "후드티 링크",
            price: "후드티 가격",
            크롤링데이터: {
              크롤링제목: "후드티 크롤링제목",
              크롤링링크: "후드티 크롤링 링크",
              크롤링가격: "후드티 크롤링가격",
            },
          },
          {
            title: "자켓",
            link: "자켓 링크",
            price: "자켓  가격",
            크롤링데이터: {
              크롤링제목: "자켓 크롤링제목",
              크롤링링크: "자켓 크롤링 링크",
              크롤링가격: "자켓 크롤링가격",
            },
          },
        ],
      },
    ],
  };

function findCategory() {
  dummy.category.map((cate, idx) =>
    cate[Object.keys(cate)].map((element) => console.log(element.title))
  );
}

findCategory();
