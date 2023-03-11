import "./App.css";
import "./nomalize.css";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//* ICONS
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { MdEmojiPeople } from "react-icons/md";

//* ROUTER
import Men from "./Components/Men";
import Woman from "./Components/Woman";
import Sale from "./Components/Sale";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Detail from "./Components/Detail";

//? ----- 구현하고 싶은 기능 -----
// 완료 --- 1) 클릭하면 상품별 Detail 페이지 이동
// 완료 --- 2) 최근 본 상품
// 완료 --- 3) 더보기 기능

function App() {
  let navigate = useNavigate();
  let state = useSelector((state) => state);

  // * -------------
  // * State
  // * -------------
  let [tab, setTab] = useState(0);

  //? ---------
  //? 상품 더보기
  //? ---------
  // cnt : 버튼 클릭횟수
  // let cnt = 1; 이라고 해버리면, 다시 위에서부터 읽기 때문에 계속 let cnt = 1; 이 됨.
  let [cnt, setCnt] = useState(1);
  let [layout, setLayout] = useState([]);
  let arr = state.data.filter((v, i) => i < 4 * cnt);
  useEffect(() => {
    setLayout(arr);
  }, []);

  let [watch, setWatch] = useState([]);

  //? ---------
  //? 최근 본 상품 : local Storage에 저장
  //? ---------
  // 추가 기능 : 새로고침 시, 초기값으로 돌아감
  // ==> 이미 watched 항목 있으면, setItem() 하지 말아주세요 ~ !
  useEffect(() => {
    let watched = JSON.parse(localStorage.getItem("collection"));

    // 1. 맨처음 한 번만 실행
    // console.log(watch); // null
    // console.log(watched); // []

    // 3. 새로고침 시 실행
    // if (watched !== null) {
    //   setWatch(watched);
    //   console.log(watch);
    // } else if (watched === null) {
    //   localStorage.setItem("collection", JSON.stringify([]));
    // }
    //? 아무것도 없으면 빈 배열
    if (watched === null) {
      localStorage.setItem("collection", JSON.stringify([]));
    } else setWatch(watched);
  }, []);

  // 2. 계속 실행
  // console.log(watch); // []

  // let 제목 = 꺼낸거[0].title;

  // console.log(꺼낸거[0].src);
  // console.log(typeof 꺼낸거[0].src);

  // let 이미지 = 꺼낸거[0].src;
  // let 제목 = 꺼낸거[0].title;
  // console.log(아이템);
  // console.log("아이템 :" + JSON.parse(JSON.stringify(아이템)));
  // console.log();
  // console.log(이미지);

  // useEffect(() => {
  // console.log(아이템);
  // setList(아이템[0].title);
  // let copy = [...list];
  // copy.push(...아이템);
  // setList(copy);
  // console.log(copy);
  // }, []);

  // 아이템 = new Set(아이템);
  // 아이템 = Array.from(아이템);

  // * -------------
  // * Handler
  // * -------------
  const moreHandler = () => {
    setCnt(++cnt);
    let copy = [...state.data.filter((v, i) => i < 4 * cnt)];
    setLayout(copy);

    // useEffect(() => {
    //   setLayout(arr);
    // }, []);
  };

  // * -------------
  // * Render
  // * -------------
  return (
    <div className="App">
      <Main>
        <Header>
          <Top>
            <AiOutlineMenu
              style={{
                width: "5%",
                height: "30px",
              }}
            />
            <img
              src="https://xexymix.jpg3.kr/xexymix/2020/main/header_logo_bk.png"
              alt="logo"
              style={{
                width: "150px",
                height: "22px",
                display: "inline",
                cursor: "pointer",
                margin: "5px 20px",
              }}
              onClick={() => {
                navigate("/");
              }}
            />
            <Ul>
              <>
                <Input placeholder="상품 검색"></Input>
              </>
              <li
                onClick={() => {
                  navigate("/men");
                }}
                style={{ cursor: "pointer" }}
              >
                MEN
              </li>
              <li
                onClick={() => {
                  navigate("/woman");
                }}
                style={{ cursor: "pointer" }}
              >
                WOMAN
              </li>
              <li
                onClick={() => {
                  navigate("/sale");
                }}
                style={{ color: "orange", cursor: "pointer" }}
              >
                SALE
              </li>
              <li
                onClick={() => {
                  navigate("/cart");
                }}
                style={{ cursor: "pointer" }}
              >
                <AiOutlineShoppingCart
                  onClick={() => {
                    navigate("/cart");
                  }}
                  style={{ width: "40px", height: "25px", cursor: "pointer" }}
                />
                CART
              </li>
              <li>
                <MdEmojiPeople
                  style={{
                    width: "45px",
                    height: "30px",
                    cursor: "pointer",
                    color: "gray",
                  }}
                  onClick={() => {
                    navigate("/login");
                  }}
                />
              </li>
            </Ul>
          </Top>
        </Header>

        {/* ---------- ROUTER ---------- */}
        {/* <RouterWrapper> */}
        <Routes>
          <Route
            path="/"
            element={
              <MiddleWrapper>
                <Middle>
                  <img
                    src="https://xexymix.jpg3.kr/xexymix/2020/sub/cate/cate_230106.jpg"
                    style={{
                      padding: "80px 0",
                    }}
                  />
                  <ContentWrapper>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h1>BEST ITEM 🏆</h1>
                      <div
                      // style={{
                      //   width: "1280px",
                      //   flexWrap: "wrap",
                      //   display: "flex",
                      // }}
                      >
                        <Content>
                          {layout.map((v, i) => (
                            <ItemWrapper>
                              <img
                                src={layout[i].src}
                                style={{
                                  width: "300px",
                                  height: "420px",
                                  padding: "30px",
                                }}
                                onClick={() => {
                                  navigate(`/detail/${state.data[i].id}`);
                                }}
                              />
                              <p style={{ fontWeight: "bold" }}>
                                {layout[i].title}
                              </p>
                              <p>{layout[i].price} Won</p>
                              <p style={{ color: "gray" }}>
                                {layout[i].content}
                              </p>
                            </ItemWrapper>
                          ))}
                        </Content>
                      </div>
                      <MoreBtn
                        onClick={() => {
                          moreHandler();
                        }}
                      >
                        MORE
                      </MoreBtn>
                    </div>
                  </ContentWrapper>
                </Middle>
                <Right>
                  <h2 style={{ padding: "30px" }}>Collection</h2>
                  <CollectionWrapper>
                    <Collection>
                      {watch &&
                        watch.map((v, i) => {
                          return (
                            <>
                              <img
                                src={watch[i].src}
                                style={{ width: "70%" }}
                              />
                              <div
                                style={{
                                  padding: "20px 20px 60px 20px",
                                  fontSize: "20px",
                                }}
                              >
                                {watch[i].title}
                              </div>
                            </>
                          );
                        })}
                    </Collection>
                  </CollectionWrapper>
                </Right>
              </MiddleWrapper>
            }
          ></Route>
          <Route path="/men" element={<Men />}></Route>
          <Route path="/woman" element={<Woman />}></Route>
          <Route path="/sale" element={<Sale />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route
            path="/detail/:id"
            element={<Detail setWatch={setWatch} />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        {/* </RouterWrapper> */}
      </Main>
      <Footer>
        <div></div>
      </Footer>
    </div>
  );
}

export default App;

const Main = styled.div`
  width: 100%;
  /* max-width: 1280px; */
`;

const Right = styled.div`
  height: 100%;
  width: 350px;
  padding-top: 90px;
`;

const CollectionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Collection = styled.div``;

const Header = styled.div`
  padding: 30px;
  position: fixed;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

const Top = styled.div`
  width: 1280px;
  display: flex;
  margin: auto;
`;

const Input = styled.input`
  width: 250px;
  outline-color: #ccc;
  border-radius: 5px;
  padding: 0 0 0 15px;
  font-size: 15px;
  border: 1px solid #ccc;
  &:hover {
    background-color: #eee;
  }

  &::-webkit-input-placeholder {
    color: rgb(217, 217, 217);
  }
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  gap: 30px;
  width: 65%;
  font-weight: bold;
`;

const MiddleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Middle = styled.div`
  width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 1280px;
  flex-wrap: wrap;
`;

const ItemWrapper = styled.div`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  padding: 10px;
`;

const MoreBtn = styled.button`
  width: 90px;
  height: 30px;
  background-color: salmon;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 50px auto;
`;

const Footer = styled.div`
  width: 100%;
  height: 500px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  border-top: 1px solid #ccc;
  z-index: 5;
  position: relative;
`;
