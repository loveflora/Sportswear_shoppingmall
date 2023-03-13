import React from "react";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Cart() {
  // * -------------
  // * State
  // * -------------
  // useSelector : store에 있던 state 가져다 쓰는 법
  // state : store 안에 있던 모든 state
  let state = useSelector((state) => state);

  // dispatch 함수 : store.js 로 요청 보내주는 함수
  let dispatch = useDispatch();

  const [num, setNum] = useState(1);

  // * -------------
  // * Render
  // * -------------
  return (
    <Main>
      <Title> 장바구니 🛒 </Title>
      <Table striped>
        <thead>
          <tr>
            <th>번호</th>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{state.data[0].id + 1}</td>
            <td>{state.data[0].title}</td>
            <td>{state.data[0].price}</td>
            <td>
              <Btn onClick={() => (num > 1 ? setNum(num - 1) : null)}>-</Btn>
              {num}
              <Btn
                onClick={() => {
                  setNum(num + 1);
                }}
              >
                +
              </Btn>
            </td>
            <td>
              <button
                style={{
                  background: "black",
                  color: "white",
                  border: "none",
                  width: "80px",
                  borderRadius: "3px",
                  padding: "5px",
                }}
              >
                삭제하기
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
      <BuyBtn>ORDER</BuyBtn>
      <BtnWrapper>
        <OptionBtn txt={"장바구니 비우기"}></OptionBtn>
        <OptionBtn txt={"선택 삭제"}></OptionBtn>
      </BtnWrapper>
    </Main>
  );
}

// * -------------
// * Handlers
// * -------------
function OptionBtn({ txt }) {
  return (
    <div>
      <button
        style={{
          border: "1px solid #ccc",
          width: "150px",
          height: "40px",
          backgroundColor: "white",
          color: "#565656",
        }}
      >
        {txt}
      </button>
    </div>
  );
}

// * -------------
// * Styles
// * -------------

const Main = styled.div`
  padding-top: 80px;
  height: 80vh;

  & .table {
    /* vertical-align: center; */
  }
`;

const Title = styled.h1`
  padding: 60px 0 50px 0;
  font-weight: bold;
`;

const BuyBtn = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  width: 320px;
  height: 50px;
  margin: 20px;
`;

// 엥 ? 이렇게는 안되나 ????
// const OptionBtn = styled.button`
//   border: black 1px solid;
//   width: 100px;
//   height: 50px;
// `;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 20px;
`;

const Btn = styled.button`
  border: none;
  background-color: white;
  margin: 0 10px;
`;
