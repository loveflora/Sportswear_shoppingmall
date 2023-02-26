import "./App.css";
import "./nomalize.css";
import styled from "styled-components";
import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//* ICONS
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { MdEmojiPeople } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";

//* ROUTER
import Men from "./Components/Men";
import Woman from "./Components/Woman";
import Sale from "./Components/Sale";
import Cart from "./Components/Cart";
import Login from "./Components/Login";
import Detail from "./Components/Detail";

//? ----- 구현하고 싶은 기능 -----
//? 1) 최근 본 상품
//? 2) 더보기 기능
//? 3) 클릭하면 상품별 Detail 페이지 이동

//? data.js 는 추후 삭제예정

function App() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let state = useSelector((state) => state);

  // * -------------
  // * State
  // * -------------
  // let [item, setItem] = useState();
  let [tab, setTab] = useState(0);

  // * -------------
  // * Render
  // * -------------
  return (
    <div className="App">
      <Main>
        <Header>
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
            }}
            onClick={() => {
              navigate("/");
            }}
          />
          <Ul>
            <>
              <Input placeholder="상품 검색"></Input>
              <BiSearchAlt2
                style={{ position: "absolute", top: "37px", right: "674px" }}
              />
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
        </Header>
        {/* ---------- ROUTER ---------- */}
        <RouterWrapper>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <img
                    src="https://xexymix.jpg3.kr/xexymix/2020/sub/cate/cate_230106.jpg"
                    style={{ width: "1280px", paddingBottom: "80px" }}
                  />
                  <ContentWrapper>
                    {/* ??? 안줄어들게 하고 싶어요 ㅠㅠㅠㅠ */}
                    <h1 style={{ width: "1079px", height: "50px" }}>
                      BEST ITEM 🏆
                    </h1>
                  </ContentWrapper>
                  <Content>
                    {state.item.map((v, i) => (
                      <ItemWrapper>
                        <img
                          src={state.item[i].src}
                          style={{ width: "300px", padding: "30px" }}
                          onClick={() => {
                            navigate(`/detail/${state.item[i].id}`);
                          }}
                        />
                        <p style={{ fontWeight: "bold" }}>
                          {state.item[i].title}
                        </p>
                        <p>{state.item[i].price} Won</p>
                        <p style={{ color: "gray" }}>{state.item[i].content}</p>
                      </ItemWrapper>
                    ))}
                  </Content>
                  <MoreBtn onClick={() => {}}>MORE</MoreBtn>
                </div>
              }
            ></Route>
            <Route path="/men" element={<Men />}></Route>
            <Route path="/woman" element={<Woman />}></Route>
            <Route path="/sale" element={<Sale />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </RouterWrapper>
      </Main>
      <Footer>
        <div></div>
      </Footer>
    </div>
  );
}

export default App;

const Main = styled.div`
  max-width: 1280px;
  margin: 0px 30px;
`;

const Header = styled.div`
  padding: 30px;
  position: fixed;
  background-color: white;
  width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

const Input = styled.input`
  width: 250px;
  outline-color: #ccc;
  border-radius: 5px;
  padding: 0 0 0 30px;
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
  width: 70%;
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  width: 1279px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;

const ItemWrapper = styled.div`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  padding: 30px;
`;

const MoreBtn = styled.button`
  width: 70px;
  height: 30px;
  background-color: salmon;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 50px auto;
`;

const RouterWrapper = styled.div`
  padding: 90px 0;
`;

const Footer = styled.div`
  width: 100%;
  height: 500px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  border-top: 1px solid #ccc;
`;
