import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLike } from "../Store/Store";
//* ICONS
import { FaHeart, FaSave } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { GiConsoleController, GiRolledCloth } from "react-icons/gi";

export default function Detail({ watch, setWatch }) {
  let { id } = useParams();
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  //? ----- 구현하고 싶은 기능 -----
  // 1) 와 드디어 완료 ㅠㅠㅠ (3/11) ---  select 기능
  //? 2) 값 계산
  // 2-1) optPrice = option(1, 2, 3)에 따라 --> price + 1 2 3
  // 2-2) optPrice * cnt = count + -
  // 2-3) totalPrice = SUM(2-2)
  //? 3) 모달 기능
  // 4) 완료 --- like 관심 상품 기능
  //? 5) 크기/색상/옵션 선택 안할 경우, alert 창 뜨기 !
  //? 6) 장바구니 담기
  //? 7) 리뷰 기능
  //? -------------------------

  //? ------------
  //? 최근 본 상품
  //? ------------
  //* 1) Detail 페이지 접속하면 특정 코드 실행 ===> useEffect() 사용 ----- ??? 아니... 왜 굳이 써야하지 ? ㅋㅋㅋㅋㅋ
  //* 2) 해당 id 가져와서
  //* 3) local Storage에 collection 항목에 있는 [ ]에 id 추가

  //* 1) Detail 페이지 접속
  //* 2) 현재 페이지 id 가져오기
  useEffect(() => {
    //   console.log(id);
    // });

    //* 3) local Storage에 collection 항목에 있는 [ ]에 id 추가
    // local Storage 항목은 수정이 안됨.
    // ~~> [] 빼서 --- id 추가하고 --- 다시 collection에 저장
    //* 3-1) [ ] 빼기
    let 꺼낸거 = localStorage.getItem("collection");
    //* 3-2) string -> 배열로 전환
    꺼낸거 = JSON.parse(꺼낸거);
    //* 3-3) id 추가하기

    let 데이터 = {
      id: id,
      src: state.data[id].src,
      title: state.data[id].title,
    };

    꺼낸거.push(데이터);

    //* 4) 중복된 항목 제거 ! : Set으로 바꿨다가, 다시 array로 만들기
    // Set : 중복 제거해주는 array
    // new Set(array자료) = array --> Set으로 바꿀 수 있고
    // 꺼낸거 = new Set(꺼낸거);
    // Array.from(Set자료) = Set --> array로 바꿀 수 있음
    // 꺼낸거 = Array.from(꺼낸거);
    // 꺼낸거 = [...꺼낸거];

    // 밑에 코드는 실행이 안됨...ㅠㅠ
    // const 중복제거 = 꺼낸거.filter((a, i) => {
    //   return (
    //     a.findIndex((b, j) => {
    //       return a.title === b.title;
    //     }) === i
    //   );
    // });

    //* 중복된 객체를 제거
    // 두개를 꺼내서 -- 같은 index 비교 !

    const 중복제거 = 꺼낸거.filter((v, i, arr) => {
      return arr.findIndex((item) => item.title === v.title) === i;
    });

    //* 3-4) '꺼낸거' 다시 collection에 저장
    localStorage.setItem("collection", JSON.stringify(중복제거));

    //? 이걸 내가 놓쳤네 ,,,, Detail에서 setWatch 해야 하네
    // 드디어 된다. 그냥 정답 모범코드 안따라가고, 내가 머리 써서 생각해서 하니까 됨. 그게 더 재밌긴 함.
    // 아무튼 detail 페이지에서 했네 ,,,
    setWatch(중복제거);
  }, []);

  //* ----------
  //* STATE
  //* ----------
  const [totalPrice, setTotalPrice] = useState(0);
  const [count, setCount] = useState(1);

  // select 항목 담은 []
  const [selectList, setSelectList] = useState([]);
  // select 입력값
  const [select, setSelect] = useState({
    id: selectList.length,
    color: "",
    size: "",
    option: "",
    show: false,
    price: state.data[id].price,
  });

  //* -----------
  //* HANDLERS
  //* -----------

  //? 다중 select 값 가져오기 ....!

  // const { color, size, option } = select;
  const onChange = (e) => {
    const { name, value } = e.target;

    setSelect((prevState) => ({ ...prevState, [name]: value }));

    // setSelect({ ...select, [name]: value });
  };

  // const onChange1 = (e) => {
  //   const value = e.target.value;

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
  // };

  // const onChange2 = (e) => {
  //   const value = e.target.value;

  //   // let copy = [...item];
  //   // copy[0].size = value;
  //   // setItem(copy);
  // };

  // const onChange3 = (e) => {
  //   const value = e.target.value;

  //   // let copy = [...item];
  //   // copy[0].option = value;
  //   // setItem(copy);
  // };

  //? select 값 itme에 추가하기 !!!
  const addItem = () => {
    optPrice();
    setSelect((select.show = true));

    setSelectList([...selectList, { ...select }]);
    // setSelect({ id: selectList.length + 1 });
    // setSelect((prevState) => ({ ...prevState, id: selectList.length + 1 }));
    setSelect({
      ...select,
      id: selectList.length + 1,
      price: state.data[id].price,
    });

    // console.log(select.show);
    // setSelect({
    //   ...select,
    //   [name]: value,
    // });
    // let copy = [...data];
    // copy.push({
    //   id: 1,
    //   color: "",
    //   size: "",
    //   price: state.item[id].price,
    //   option: "",
    // });
    // setItem(copy);
    // console.log(copy);
  };

  //! 엇 !!! addItem 바깥에 두니까, 잘 먹네 ?
  //! addItem 안에서는 콘솔 한템포 계속 늦음... 다시 처음부터 읽고 적용되나 봄...?
  // console.log(selectList); // []

  //? 2) 값 계산
  //? 2-1) optPrice 구하기
  const optPrice = () => {
    if (select.option === "밴드") {
      select.price += 8000;
      setTotalPrice(totalPrice + select.price);
    }
    if (select.option === "링") {
      select.price += 6000;
      setTotalPrice(totalPrice + select.price);
    }
    if (select.option === "악력볼") {
      select.price += 5000;
      setTotalPrice(totalPrice + select.price);
    }
    if (select.option === "선택안함") {
      setTotalPrice(totalPrice + select.price);
    }
  };

  //? 2-2) optPrice * cnt = count + -
  // const addHandler = () => {
  //   if (count > 1) {
  //     setCount(count - 1);
  //   } else return;
  // };

  // const reduceHandler = () => {
  //   setCount(count + 1);
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
        src={state.data[id].src}
        width="450px"
        height="700px"
        style={{
          margin: "30px",
          display: "flex",
        }}
      />
      <Content>
        <Title>
          <h1>{state.data[id].title}</h1>
          <h4 style={{ color: "#ccc" }}>{state.data[id].content}</h4>
        </Title>
        <SelectWrapper>
          <div>판매가</div>
          <h3>{state.data[id].price} 원</h3>
        </SelectWrapper>
        <SelectWrapper>
          <div>색상</div>
          <select
            onChange={onChange}
            style={{ width: "500px", padding: "5px" }}
            name="color"
            value={select.color}
          >
            <option value="none" hidden>
              색상을 선택해주세요
            </option>
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
            name="size"
            value={select.size}
          >
            <option value="none" hidden>
              사이즈를 선택해주세요
            </option>
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
            name="option"
            value={select.option}
          >
            <option value="none" hidden>
              추가상품을 선택해주세요
            </option>
            <option value="선택안함">선택안함</option>
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
          onClick={addItem}
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
          {/* 추가상품 띄우기 */}
          {selectList.map((v, i) => (
            <>
              {selectList[i].show && (
                <SelectPrice>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      width: "150px",
                    }}
                  >
                    <div>{selectList[i].color}</div>
                    <div>{selectList[i].size}</div>
                    <div>{selectList[i].option}</div>
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
                      onClick={() => {
                        dispatch(addCount(selectList[i].id));
                      }}
                    >
                      -
                    </CountBtn>
                    <div>{count}</div>
                    <CountBtn
                      onClick={() => {
                        dispatch(reduceCount(selectList[i].id));
                      }}
                    >
                      +
                    </CountBtn>
                  </div>
                  <div>{selectList[i].price}원</div>
                  <IoClose size="30" className="closeBtn" />
                </SelectPrice>
              )}
            </>
          ))}

          <Total>
            <div>Total</div>
            <div>{totalPrice}원</div>
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
            {state.data[id].like ? (
              <FaHeart
                color="salmon"
                className="heart"
                onClick={() => {
                  dispatch(changeLike(state.data[id].id));
                  console.log(state.data[id].like);
                }}
              />
            ) : (
              <FaHeart
                color="#eee"
                className="heart"
                onClick={() => {
                  dispatch(changeLike(state.data[id].id));
                  console.log(state.data[id].like);
                }}
              />
            )}
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

const selectItem = styled.div``;
