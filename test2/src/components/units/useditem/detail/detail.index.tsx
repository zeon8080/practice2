import { gql, useMutation, useQuery } from "@apollo/client";
import DOMPurify from "dompurify";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationDeleteUseditemArgs,
  IMutationToggleUseditemPickArgs,
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../commons/types/generated/types";
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
      # pickedCount
      # buyer
      # useditemAddress {
      #   zipcode
      #   address
      #   addressDetail
      # }
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
    router.push("/http://localhost:3000/");
  };

  const onClickPick = () => {
    toggleUseditemPick({
      variables: {
        useditemId: String(router.query.useditemId),
      },
    });
  };

  return (
    <>
      <S.Container>
        <S.TopWrapper>
          <S.ImageBox>
            {data?.fetchUseditem.images
              ?.filter((el) => el)
              .map((el) => (
                <img key={el} src={`https://storage.googleapis.com/${el}`} />
              ))}
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
            <S.Divid1></S.Divid1>
            <S.ItemContents>
              {data?.fetchUseditem?.remarks}
              <div>태그</div>
            </S.ItemContents>

            <S.Divid2></S.Divid2>
            <S.BtnBox>
              <S.PickBtn onClick={onClickPick}>찜</S.PickBtn>
              <S.BasketBtn>장바구니</S.BasketBtn>
              <S.BuyBtn>바로구매</S.BuyBtn>
            </S.BtnBox>
          </div>
        </S.TopWrapper>
        <S.BodyWrapper>
          <S.LeftBox>
            <S.ItemInfo>상품정보</S.ItemInfo>
            <S.Divid3></S.Divid3>
            <S.ItemContents>
              {typeof window !== "undefined" && (
                <div
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
            <S.Divid4></S.Divid4>
            <S.Profile>
              <img src="/profile.png" />
              <S.Seller>{data?.fetchUseditem?.seller?.name}</S.Seller>
            </S.Profile>
            <S.Divid5></S.Divid5>
            <S.Comment>댓글</S.Comment>
            <S.Divid4></S.Divid4>
            <QuestionWrite />
            <CommentList />
          </S.RightBox>
        </S.BodyWrapper>
      </S.Container>
    </>
  );
}
