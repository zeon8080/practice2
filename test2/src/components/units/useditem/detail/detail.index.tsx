import { gql, useMutation, useQuery } from "@apollo/client";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  IMutation,
  IMutationCreatePointTransactionOfBuyingAndSellingArgs,
  IMutationDeleteUseditemArgs,
  IMutationToggleUseditemPickArgs,
  IQuery,
  IQueryFetchUseditemArgs,
  IUseditem,
} from "../../../../commons/types/generated/types";
import { LoginCheck } from "../../../commons/hocs/withAuth";
import QuestionWrite from "../comment/comment.index";
import CommentList from "../comment/recomment.index";
import * as S from "./detail.styles";

const FETCH_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      createdAt
      seller {
        name
      }
      images
      pickedCount
      # buyer
      # useditemAddress {
      #   zipcode
      #   address
      #   addressDetail
      # }
    }
  }
`;

const CREATE_BUY = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
    }
  }
`;

const CREATE_PICK = gql`
  mutation toggleUseditemPick($useditemId: ID!) {
    toggleUseditemPick(useditemId: $useditemId)
  }
`;

const DELETE_ITEM = gql`
  mutation ($useditemId: ID!) {
    deleteUseditem(useditemId: $useditemId)
  }
`;

// const FETCH_PICK = gql`
//   query fetchUseditemsCountIPicked()
// `;

export default function ItemDetail(): JSX.Element {
  const router = useRouter();
  const [toggleUseditemPick] = useMutation<
    Pick<IMutation, "toggleUseditemPick">,
    IMutationToggleUseditemPickArgs
  >(CREATE_PICK);
  const [deleteItem] = useMutation<
    Pick<IMutation, "deleteUseditem">,
    IMutationDeleteUseditemArgs
  >(DELETE_ITEM);
  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_ITEM, {
    variables: {
      useditemId: String(router.query.useditemId),
    },
  });
  const [createPoint] = useMutation<
    Pick<IMutation, "createPointTransactionOfBuyingAndSelling">,
    IMutationCreatePointTransactionOfBuyingAndSellingArgs
  >(CREATE_BUY);

  const onClickMoveEdit = () => {
    router.push(`/usedItems/${router.query.useditemId}/edit`);
  };

  // const onClickMoveList = () => {
  //   router.push("/http://localhost:3000/");
  // };

  const onClickDelete = () => {
    deleteItem({
      variables: {
        useditemId: String(router.query.useditemId),
      },
    });
    alert("삭제되었습니다.");
    router.push("http://localhost:3000");
  };

  const onClickBuy = async () => {
    await createPoint({
      variables: {
        useritemId: String(router.query.useditemId),
      },
    });
    alert("상품을 구매하였습니다.");
  };

  const onClickPick = () => {
    toggleUseditemPick({
      variables: {
        useditemId: String(router.query.useditemId),
      },
    });
  };
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

  const onClickBasket = (basket: IUseditem) => () => {
    const baskets: IUseditem[] = JSON.parse(
      localStorage.getItem("baskets") ?? "[]"
    );
    const temp = baskets.filter((el) => el._id === basket._id);
    if (temp.length >= 1) {
      alert("이미 장바구니에 있습니다.");
      return;
    }
    baskets.push(basket);
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };

  LoginCheck();

  return (
    <>
      <S.Container>
        <S.TopWrapper>
          <S.ImageBox>
            <img
              src={`https://storage.googleapis.com/${data?.fetchUseditem.images?.[0]}`}
            />
          </S.ImageBox>
          <div>
            <S.NameBox>
              <div>{data?.fetchUseditem?.name}</div>
              <div>
                <S.ImageBtn>
                  <img src="/edit.png" onClick={onClickMoveEdit} />
                </S.ImageBtn>
                <S.ImageBtn>
                  <img src="/delete.png" onClick={onClickDelete} />
                </S.ImageBtn>
              </div>
            </S.NameBox>

            <S.Price>{data?.fetchUseditem?.price}</S.Price>
            <span>원</span>
            <S.Divide1></S.Divide1>
            <S.ItemContents>
              {data?.fetchUseditem?.remarks}
              <div></div>
            </S.ItemContents>

            <S.Divide2></S.Divide2>
            <S.BtnBox>
              <S.PickBtn
                onClick={onClickPick}
                style={{
                  backgroundColor:
                    data?.fetchUseditem.pickedCount !== 0 ? "black" : "#a0a0a0",
                }}
              >
                <S.Heart src="/heart.png" /> 찜{data?.fetchUseditem.pickedCount}
              </S.PickBtn>
              <S.BasketBtn onClick={onClickBasket(data?.fetchUseditem)}>
                장바구니
              </S.BasketBtn>
              <S.BuyBtn onClick={onClickBuy}>바로구매</S.BuyBtn>
            </S.BtnBox>
          </div>
        </S.TopWrapper>
        <S.BodyWrapper>
          <S.LeftBox>
            <S.ItemInfo>상품정보</S.ItemInfo>
            <S.Divide3></S.Divide3>
            <S.ItemContents>
              {/* <S.Images>
                {data?.fetchUseditem.images
                  ?.filter((el) => el)
                  .map(
                    (el) => (
                      console.log(el),
                      (
                        <img
                          key={el}
                          src={`https://storage.googleapis.com/${el}`}
                        />
                      )
                    )
                  )}
              </S.Images> */}
              {typeof window !== "undefined" && (
                <div
                  style={{ wordBreak: "break-all" }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      String(data?.fetchUseditem?.contents)
                    ),
                  }}
                />
              )}
            </S.ItemContents>
            <S.Location>거래지역</S.Location>
          </S.LeftBox>
          <S.RightBox>
            <S.ItemInfo>상점정보</S.ItemInfo>
            <S.Divide4></S.Divide4>
            <S.Profile>
              <img src="/profile.png" />
              <S.Seller>{data?.fetchUseditem?.seller?.name}</S.Seller>
            </S.Profile>
            <S.Divide5></S.Divide5>
            <S.Comment>댓글</S.Comment>
            <S.Divide4></S.Divide4>
            <QuestionWrite />
            <CommentList />
          </S.RightBox>
        </S.BodyWrapper>
      </S.Container>
    </>
  );
}
