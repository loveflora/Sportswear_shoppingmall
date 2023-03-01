import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//* ICONS
import { FaHeart, FaSave } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { GiRolledCloth } from "react-icons/gi";

export default function Detail() {
  let { id } = useParams();
  let state = useSelector((state) => state);

  //? ------------
  //? 최근 본 상품
  //? ------------
  //? 1) Detail 페이지 접속하면 특정 코드 실행 ===> useEffect() 사용 ----- ??? 아니... 왜 굳이 써야하지 ? ㅋㅋㅋㅋㅋ
  //? 2) 해당 id 가져와서
  //? 3) local Storage에 collection 항목에 있는 [ ]에 id 추가

  //? 1) Detail 페이지 접속
  //? 2) 현재 페이지 id 가져오기
  useEffect(() => {
    //   console.log(id);
    // });

    //? 3) local Storage에 collection 항목에 있는 [ ]에 id 추가
    //? local Storage 항목은 수정이 안됨.
    //? ~~> [] 빼서 --- id 추가하고 --- 다시 collection에 저장
    // 3-1) [ ] 빼기
    let 꺼낸거 = localStorage.getItem("collection");
    // 3-2) string -> 배열로 전환
    꺼낸거 = JSON.parse(꺼낸거);
    // 3-3) id 추가하기

    let data = {
      id: id,
      src: state.item[id].src,
      title: state.item[id].title,
    };

    꺼낸거.push(data);

    //? 4) 중복된 항목 제거 ! : Set으로 바꿨다가, 다시 array로 만들기
    // Set : 중복 제거해주는 array
    // new Set(array자료) = array --> Set으로 바꿀 수 있고
    // 꺼낸거 = new Set(꺼낸거);
    // Array.from(Set자료) = Set --> array로 바꿀 수 있음
    // 꺼낸거 = Array.from(꺼낸거);
    // 꺼낸거 = [...꺼낸거];

    //? 중복된 객체를 제거
    // 두개를 꺼내서 -- 같은 index 비교 !
    //? 밑에 코드는 실행이 안됨...ㅠㅠ
    // const 중복제거 = 꺼낸거.filter((a, i) => {
    //   return (
    //     a.findIndex((b, j) => {
    //       return a.title === b.title;
    //     }) === i
    //   );
    // });

    const 중복제거 = 꺼낸거.filter((v, i, arr) => {
      return arr.findIndex((item) => item.title === v.title) === i;
    });

    // 3-4) '꺼낸거' 다시 collection에 저장
    localStorage.setItem("collection", JSON.stringify(중복제거));
  }, []);

  //* ----------
  //* STATE
  //* ----------
  const [color, setColor] = useState("#eee");
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [item, setItem] = useState([
    {
      id: 1,
      color: "",
      size: "",
      price: state.item[id].price,
      option: "",
    },
  ]);

  console.log();

  //* -----------
  //* HANDLERS
  //* -----------
  const onChangeColor = () => {
    color === "#eee" ? setColor("salmon") : setColor("#eee");
  };

  //? 다중 select 값 가져오기 ....!
  const onChange1 = (e) => {
    const value = e.target.value;

    // setItem((prev) => {
    //   const copy = [...prev];
    //   return copy.map((item) => {
    //     return {
    //       ...item,
    //       color: value,
    //     };
    //   });
    // });

    // const toggleHandler = () => {
    //   setList((prevState) => {
    //     const copy = [...prevState];
    //     return copy.map((item) => {
    //       return {
    //         ...item,
    //         like: !item.like,
    //       };
    //     });
    //   });
    // };

    // let copy = [...item];
    // copy[0].color = value;
    // setItem(copy);

    // setItem((prev) => [{ ...prev, color: value }]);
    // return prev.map((item) => {
    // if (item.id === value) {
    //       return { ...item, color: value };
    //     } else {
    //       return item;
    //     }
    //   });
    // });

    // console.log(e.target.value);

    console.log(item);
  };

  const onChange2 = (e) => {
    const value = e.target.value;

    // let copy = [...item];
    // copy[0].size = value;
    // setItem(copy);

    console.log(item);
  };

  const onChange3 = (e) => {
    const value = e.target.value;

    // let copy = [...item];
    // copy[0].option = value;
    // setItem(copy);

    console.log(item);
  };

  //? select 값 itme에 추가하기 ....!!!!
  const addItme = () => {
    let copy = [...item];
    // copy.push({
    //   id: 1,
    //   color: "",
    //   size: "",
    //   price: state.item[id].price,
    //   option: "",
    // });
    // setItem(copy);
    console.log(copy);
  };

  //? alert 기능 추가 : "최소 1개 구매하셔야 합니다."
  // const onReduceCount = () => {
  //   count === 0 ? setCount(1) : setCount(count - 1);
  // };

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
            onChange={onChange1}
            style={{ width: "500px", padding: "5px" }}
            value={item[0].color}
          >
            <option value="블랙">블랙</option>
            <option value="카키">카키</option>
            <option value="화이트">화이트</option>
          </select>
        </SelectWrapper>
        <SelectWrapper>
          <div>사이즈</div>
          <select
            onChange={onChange2}
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
            onChange={onChange3}
            style={{ width: "500px", padding: "5px" }}
          >
            <option value="밴드">밴드 (+8,000)</option>
            <option value="링">링 (+6,000)</option>
            <option value="악력볼">악력볼 (+5,000)</option>
          </select>
        </SelectWrapper>
        <button
          className="btn btn-danger"
          style={{
            width: "630px",
            height: "50px",
            margin: "20px auto",
            backgroundColor: "rgb(124 95 66)",
            color: "white",
            fontSize: "18px",
            border: "none",
          }}
          onClick={addItme}
        >
          추가하기
        </button>
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <div>{item[0].color}</div>
              <div>{item[0].size}</div>
              <div>{item[0].option}</div>
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
                width: "260px",
                height: "50px",
                margin: "10px",
                backgroundColor: "black",
              }}
            >
              바로 구매하기
            </button>
            <button
              className="btn btn-danger"
              style={{
                width: "260px",
                height: "50px",
                backgroundColor: "white",
                border: "1px solid black",
                color: "black",
                margin: "10px",
              }}
            >
              장바구니
            </button>
            <FaHeart color={color} className="heart" onClick={onChangeColor} />
          </div>
        </BtnWrapper>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1280px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 80px 0;
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
  margin: 0px 20px;

  .heart {
    width: 40px;
    height: 40px;
    justify-content: center;
    color: ${(props) => props.color};
    margin: 10px;
  }
`;
