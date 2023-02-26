import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//* ICONS
import { FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { GiRolledCloth } from "react-icons/gi";

export default function Detail() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let state = useSelector((state) => state);

  //? 위 화면으로 포커스 되기 -- 뭔말이지...?
  //? 아이템 선택하면 정보 띄우기

  //* ----------
  //* STATE
  //* ----------
  const [color, setColor] = useState("#eee");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [item, setItem] = useState([
    {
      id: 0,
      color: "블랙",
      size: "S",
      price: 0,
    },
  ]);

  //* -----------
  //* HANDLERS
  //* -----------
  const onChangeColor = () => {
    color === "#eee" ? setColor("salmon") : setColor("#eee");
  };

  //? alert 기능 추가 : "최소 1개 구매하셔야 합니다."
  // const onReduceCount = () => {
  //   count === 0 ? setCount(1) : setCount(count - 1);
  // };

  //? 다중 select 값 가져오기 ....!
  const onChange = (e) => {
    //   setItem(...item);
    //   console.log(item);
  };

  //? 나에게 맞는 사이즈는 ? : 모달창 띄우기 !
  const Modal = () => {
    return (
      <div style={{ width: "100%", height: "900px" }}>
        <div
          style={{ width: "600px", height: "800px", backgroundColor: "gray" }}
        >
          나와 맞는 사이즈는 ?
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      <img
        src={state.item[id].src}
        width="450px"
        height="700px"
        style={{
          margin: "30px",
          display: "flex",
        }}
      />
      <Content>
        <Title>
          <h1>{state.item[id].title}</h1>
          <h4 style={{ color: "#ccc" }}>{state.item[id].content}</h4>
        </Title>
        <SelectWrapper>
          <div>판매가</div>
          <h3>{state.item[id].price} 원</h3>
        </SelectWrapper>
        <SelectWrapper>
          <div>색상</div>
          <select
            onChange={onChange}
            style={{ width: "500px", padding: "5px" }}
          >
            <option value="블랙">블랙</option>
            <option value="카키">카키</option>
            <option value="화이트">화이트</option>
          </select>
        </SelectWrapper>
        <SelectWrapper>
          <div>사이즈</div>
          <select
            onChange={onChange}
            style={{ width: "500px", padding: "5px" }}
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
          </select>
        </SelectWrapper>
        <SelectWrapper>
          <div>추가상품</div>
          <select
            onChange={onChange}
            style={{ width: "500px", padding: "5px" }}
          >
            <option value="밴드">밴드 (+8,000)</option>
            <option value="링">링 (+6,000)</option>
            <option value="악력볼">악력볼 (+5,000)</option>
          </select>
        </SelectWrapper>
        <Size
          // onClick={() => {
          //   <Modal />;
          // }}
          style={{ cursor: "pointer" }}
        >
          <GiRolledCloth size="28" />
          <div style={{ padding: "0 20px" }}>나에게 맞는 사이즈는 ?</div>
        </Size>
        <Price>
          <SelectPrice>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ padding: "0 10px" }}>{item[0].color}</div>
              <div>{item[0].size}</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              {/* ---- count === 0 일시, alert("최소 구매수량은 1개 입니다.") ---- */}
              <CountBtn
                onClick={() => (count > 1 ? setCount(count - 1) : null)}
              >
                -
              </CountBtn>
              <div>{count}</div>
              <CountBtn
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                +
              </CountBtn>
            </div>

            <div>{item[0].price}원</div>
            <IoClose size="30" className="closeBtn" />
          </SelectPrice>
          <Total>
            <div>Total</div>
            <div>{price}원</div>
          </Total>
        </Price>

        <BtnWrapper>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              className="btn btn-danger"
              style={{
                width: "550px",
                height: "50px",
                backgroundColor: "white",
                border: "1px solid black",
                color: "black",
              }}
            >
              장바구니
            </button>
            <FaHeart color={color} className="heart" onClick={onChangeColor} />
          </div>
          <button
            className="btn btn-danger"
            style={{
              width: "100%",
              height: "50px",
              margin: "20px",
              backgroundColor: "black",
            }}
          >
            바로 구매하기
          </button>
        </BtnWrapper>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  margin: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  border-bottom: 3px solid #eee;
  margin-right: auto;
  width: 100%;
  padding: 40px 0;
`;

const SelectWrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  align-items: center;
`;

const Size = styled.div`
  background-color: #eee;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

const CountBtn = styled.div`
  border: 1px solid gray;
  width: 30px;
  height: 30px;
`;

const Price = styled.div``;

const Total = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 23px;
  font-weight: bold;
  border-top: 3px solid black;
  padding: 30px 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 20px;

  .heart {
    width: 40px;
    height: 40px;
    justify-content: center;
    color: ${(props) => props.color};
    margin: 10px;
  }
`;
