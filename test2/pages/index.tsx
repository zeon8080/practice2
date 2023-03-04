import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDate } from "../src/commons/libraries/util";
import type {
  IQuery,
  IQueryFetchUseditemsArgs,
  IUseditem,
} from "../src/commons/types/generated/types";
import * as S from "./indexStyles";

export const FETCH_ITEMS_LIST = gql`
  query fetchUseditems($page: Int, $search: String) {
    fetchUseditems(page: $page, search: $search) {
      _id
      name
      price
      images
      createdAt
    }
  }
`;

export default function ItemList() {
  const [todayList, setTodayList] = useState();
  const router = useRouter();
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditems">,
    IQueryFetchUseditemsArgs
  >(FETCH_ITEMS_LIST);

  const onLoadMore = (): void => {
    if (data === undefined) return;
    void fetchMore({
      variables: {
        page: Math.ceil((data?.fetchUseditems.length ?? 10) / 10 + 1),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchUseditems === undefined) {
          return {
            fetchUseditems: [...prev.fetchUseditems],
          };
        }
        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
        };
      },
    });
  };

  const onClickMoveDetail = (el) => (event) => {
    onClickToday(el);
    void router.push(`/usedItems/${event?.currentTarget.id}`);
  };

  const onClickToday = (today: IUseditem) => {
    const todays: IUseditem[] = JSON.parse(
      sessionStorage.getItem("todays") ?? "[]"
    );
    // console.log(todays);
    // const temp = todays.filter((el) => el._id === today._id);
    // if (temp.length >= 1) {
    //   alert("이미 장바구니에 있습니다.");
    //   return;
    // }

    todays.unshift(today);

    sessionStorage.setItem("todays", JSON.stringify(todays));
  };

  return (
    <>
      <S.Container>
        <S.Wrapper>
          <S.Scroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
            {data?.fetchUseditems.map((el: any) => (
              <S.ListWrapper
                key={el._id}
                id={el._id}
                onClick={onClickMoveDetail(el)}
              >
                <S.ItemImage>
                  {el.images && el.images[0] ? (
                    <img
                      src={`https://storage.googleapis.com/${el.images[0]}`}
                    />
                  ) : (
                    <div></div>
                  )}
                </S.ItemImage>
                <S.ContentsBox>
                  <S.Fonts id={el._id}>{el.name}</S.Fonts>
                  <S.DateBox>
                    <S.Fonts id={el._id}>
                      {el.price}
                      <span>원</span>
                    </S.Fonts>
                    <S.Date id={el._id}>{getDate(el.createdAt)}</S.Date>
                  </S.DateBox>
                </S.ContentsBox>
              </S.ListWrapper>
            )) ?? <div></div>}
          </S.Scroll>

          <div></div>
        </S.Wrapper>
      </S.Container>
    </>
  );
}
