import { useRouter } from "next/router";
import * as S from "./header.styles";

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
import { FETCH_ITEMS_LIST } from "../../../../../pages";
import { useEffect, useState } from "react";

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

  const onClickPayment = (): void => {
    const IMP = window.IMP;
    IMP.init("imp49910675");

    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        name: "충전",
        amount: 999999,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
      },
      (rsp: any) => {
        if (rsp.success === true) {
          onClickCharge(rsp.imp_uid);
        } else {
          alert("결제에 실패하였습니다.");
        }
      }
    );
  };

  const router = useRouter();
  const [basketState, setBasketState] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const basketFunc = () => {
        let basketRecent = JSON.parse(localStorage.getItem("todays"));
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
            <S.Charge onClick={onClickPayment}>충전</S.Charge>
            <script
              type="text/javascript"
              src="https://code.jquery.com/jquery-1.12.4.min.js"
            ></script>
            <script src="https://cdn.iamport.kr/v1/iamport.js"></script>

            <S.Btns onClick={onClickOut}>로그아웃</S.Btns>
            <S.Btns>장바구니</S.Btns>
            <span>{basketState}</span>
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
