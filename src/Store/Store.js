import { createSlice, configureStore } from "@reduxjs/toolkit";

let item = createSlice({
  name: "item",
  initialState: [
    {
      id: 0,
      src: "https://cdn1-aka.makeshop.co.kr/shopimages/xexymix/0060020006193.jpg?1653532098",
      title: "VUP 3D Plus Leggings",
      price: 32800,
      content: "#20colors #누적500만장 #국민레깅스 1위",
    },
    {
      id: 1,
      src: "https://cdn1-aka.makeshop.co.kr/shopimages/xexymix/0060020006443.jpg?1658119209",
      title: "SIGNATURE 360N Leggings",
      price: 49000,
      content: "#편안함끝판왕 #찰떡레깅스",
    },
    {
      id: 2,
      src: "https://cdn1-aka.makeshop.co.kr/shopimages/xexymix/0050020010083.jpg?1655367297",
      title: "ROUND CROP TOP",
      price: 34800,
      content: "#기본템 #인생크롭티",
    },
    {
      id: 3,
      src: "https://cdn1-aka.makeshop.co.kr/shopimages/xexymix/0060020005223.jpg?1655961159",
      title: "UPTENSION Leggings",
      price: 37000,
      content: "#누적판매500만장 #퍼펙트핏",
    },
    // {
    //   id: 4,
    //   src: "https://www.xexymix.com/shopimages/xexymix/0050020007997.jpg?1631772099",
    //   title: "ICE FEATHER Leggings",
    //   price: 32000,
    //   content: "#아이스페더 #시원함",
    // },
    // {
    //   id: 5,
    //   src: "https://www.xexymix.com/shopimages/xexymix/0060030001603.jpg?1646622504",
    //   title: "INTENSION Leggings",
    //   price: 32800,
    //   content: "#크롭레깅스 #하이웨스트",
    // },
    // {
    //   id: 6,
    //   src: "https://www.xexymix.com/shopimages/xexymix/0060020008043.jpg?1643164209",
    //   title: "BLACK LABEL Leggings",
    //   price: 39900,
    //   content: "#블랙라벨 #시니컬",
    // },
    // {
    //   id: 7,
    //   src: "	https://www.xexymix.com/shopimages/xexymix/0060020008163.jpg?1654132620",
    //   title: "LINE Leggings",
    //   price: 59800,
    //   content: "#라인포켓 #실용성",
    // },
  ],
  reducers: {
    changeCount(state, action) {
      // action: parameter
      let num = state.findIndex((v) => {
        return v.id === action.payload;
      });
      state[num].count++;
    },
  },
});

//? 재고 + 1
// + 버튼 누르면, id 와 동일한 id 가진 상품을 + 1

export default configureStore({
  reducer: {
    // (중요) 여기에 등록해야 사용가능
    item: item.reducer,
  },
});

export let { changeCount } = item.actions;

//? 2. 주문하기 버튼 누르면, 장바구니에 상품 추가
