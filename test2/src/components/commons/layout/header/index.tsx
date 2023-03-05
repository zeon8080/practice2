import { useRouter } from "next/router";
import * as S from "./header.styles";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

declare const window: typeof globalThis & {
  IMP: any;
};

import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationCreatePointTransactionOfLoadingArgs,
  IQuery,
  IUseditem,
} from "../../../../commons/types/generated/types";

import Script from "next/script";

const CREATE_POINT = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
    }
  }
`;

const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`;

const FETCH_USER = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
      userPoint {
        amount
      }
    }
  }
`;

export default function LayoutHeader() {
  const [createPointTransactionOfLoading] = useMutation<
    Pick<IMutation, "createPointTransactionOfLoading">,
    IMutationCreatePointTransactionOfLoadingArgs
  >(CREATE_POINT);

  const [logoutUser] = useMutation<Pick<IMutation, "logoutUser">>(LOGOUT_USER);

  const { data } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER);

  const onClickCharge = async (Uid: string) => {
    await createPointTransactionOfLoading({
      variables: {
        impUid: Uid,
      },
    });
  };

  const onClickOut = async () => {
    await logoutUser();

    window.location.reload();
  };

  const [point, setPoint] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickPoints = () => {
    setShow(true);
  };
  const onClickPoint = (p: number) => () => {
    setPoint(p);
    // onClickPayment();
  };

  const onClickPayment = (): void => {
    const IMP = window.IMP;
    IMP.init("imp49910675");

    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        name: "충전",
        amount: point,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
      },
      (rsp: any) => {
        if (rsp.success === true) {
          onClickCharge(rsp.imp_uid);
          alert("결제가 완료되었습니다");
        } else {
          alert("결제에 실패하였습니다.");
        }
      }
    );
  };

  const router = useRouter();
  const [basketState, setBasketState] = useState("0");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const basketFunc = () => {
        let basketRecent = JSON.parse(localStorage.getItem("baskets"));
        setBasketState(basketRecent);
      };
      basketFunc();
    }
  }, []);

  const onClickMoveItems = () => {
    void router.push("http://localhost:3000");
  };
  const onClickMoveNew = () => {
    void router.push("/usedItems/new");
  };

  const onClickMoveLogin = () => {
    void router.push("/usedItems/login");
  };

  const onClickMoveSign = () => {
    void router.push("/usedItems/sign");
  };

  return (
    <S.Container>
      <S.Wrapper>
        {data?.fetchUserLoggedIn ? (
          <S.BtnWrapper>
            <S.UserName>{data?.fetchUserLoggedIn.name}님 </S.UserName>
            <S.UserName>포인트 </S.UserName>
            <S.Point>{data?.fetchUserLoggedIn.userPoint?.amount}</S.Point>
            <S.UserName> P </S.UserName>

            <S.Charge onClick={onClickPoints}>충전</S.Charge>

            <Modal show={show} onHide={handleClose}>
              <div
                style={{
                  width: "464px",
                  height: "579px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Modal.Header
                  style={{ border: "none" }}
                  closeButton
                ></Modal.Header>
                <Modal.Title
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    fontSize: "20px",
                    marginTop: "80px",
                    marginBottom: "41px",
                  }}
                >
                  충전하실 금액을 선택해주세요!
                </Modal.Title>
                <Modal.Body
                  style={{
                    width: "384px",
                    height: "230px",
                    border: "1px solid #C4C4C4",
                    marginLeft: "40px",
                    padding: "0",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      borderBottom: "1px solid #E0E0E0",
                      fontSize: "16px",
                      fontWeight: "700",
                      padding: "16px",
                      cursor: "pointer",
                    }}
                    onClick={onClickPoint(100)}
                  >
                    100
                  </div>
                  <div
                    style={{
                      borderBottom: "1px solid #E0E0E0",
                      fontSize: "16px",
                      fontWeight: "700",
                      padding: "16px",
                      cursor: "pointer",
                    }}
                    onClick={onClickPoint(500)}
                  >
                    500
                  </div>
                  <div
                    style={{
                      borderBottom: "1px solid #E0E0E0",
                      fontSize: "16px",
                      fontWeight: "700",
                      padding: "16px",
                      cursor: "pointer",
                    }}
                    onClick={onClickPoint(2000)}
                  >
                    2,000
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      padding: "16px",
                      marginBottom: "16px",
                      cursor: "pointer",
                    }}
                    onClick={onClickPoint(5000)}
                  >
                    5,000
                  </div>
                </Modal.Body>
                <Modal.Footer
                  style={{
                    marginLeft: "40px",
                    marginRight: "10px",
                    border: "none",
                  }}
                >
                  <button
                    style={{
                      width: "384px",
                      height: "51px",
                      border: "none",
                      backgroundColor: point === 0 ? "#bdbdbd" : "black",
                      borderRadius: "10px",
                      color: "white",
                      fontSize: "16px",
                      margin: "40px 0px 40px 0px",
                    }}
                    onClick={onClickPayment}
                  >
                    충전하기
                  </button>
                </Modal.Footer>
              </div>
            </Modal>

            <Script
              type="text/javascript"
              src="https://code.jquery.com/jquery-1.12.4.min.js"
            ></Script>
            <Script src="https://cdn.iamport.kr/v1/iamport.js"></Script>

            <S.Btns onClick={onClickOut}>로그아웃</S.Btns>
            <S.Btns>장바구니</S.Btns>
            <S.Basket>
              {basketState?.length !== undefined ? basketState?.length : "0"}
            </S.Basket>
          </S.BtnWrapper>
        ) : (
          <S.BtnWrapper>
            <S.Btns onClick={onClickMoveLogin}>로그인</S.Btns>
            <S.Btns onClick={onClickMoveSign}>회원가입</S.Btns>
            <S.Btns>장바구니</S.Btns>
          </S.BtnWrapper>
        )}
        <S.Divide></S.Divide>

        <S.LogoWrapper>
          <S.Logo onClick={onClickMoveItems}>
            <img src="/logo.png" />
          </S.Logo>
          <div>
            <img
              src="/sell.png"
              onClick={onClickMoveNew}
              style={{ cursor: "pointer" }}
            />
          </div>
        </S.LogoWrapper>
        <S.Divide2></S.Divide2>
      </S.Wrapper>
    </S.Container>
  );
}
