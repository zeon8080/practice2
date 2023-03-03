// import { gql, useQuery } from "@apollo/client";
// import { useRouter } from "next/router";
// import * as S from "./itemList.styles";
// import type {
//   IQuery,
//   IQueryFetchUseditemsArgs,
// } from "../../../../commons/types/generated/types";

// const FETCH_ITEMS_LIST = gql`
//   query fetchUseditems($page: Int, $search: String) {
//     fetchUseditems(page: $page, search: $search) {
//       _id
//       name
//       price
//       images
//       createdAt
//     }
//   }
// `;

// export default function ItemList() {
//   const router = useRouter();
//   const { data, fetchMore, refetch } = useQuery<
//     Pick<IQuery, "fetchUseditems">,
//     IQueryFetchUseditemsArgs
//   >(FETCH_ITEMS_LIST);

//   const onLoadMore = (): void => {
//     if (data === undefined) return;
//     void fetchMore({
//       variables: {
//         page: Math.ceil((data?.fetchUseditems.length ?? 10) / 10 + 1),
//       },
//       updateQuery: (prev, { fetchMoreResult }) => {
//         if (fetchMoreResult.fetchUseditems === undefined) {
//           return {
//             fetchUseditems: [...prev.fetchUseditems],
//           };
//         }
//         return {
//           fetchUseditems: [
//             ...prev.fetchUseditems,
//             ...fetchMoreResult.fetchUseditems,
//           ],
//         };
//       },
//     });
//   };

//   return (
//     <>
//       <S.Container>
//         <S.Wrapper>
//           <S.Scroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
//             {data?.fetchUseditems.map((el: any) => (
//               <S.ListWrapper key={el._id}>
//                 <S.ItemImage>
//                   {el.images && el.images[0] ? (
//                     <img
//                       src={`https://storage.googleapis.com/${el.images[0]}`}
//                     />
//                   ) : (
//                     <div></div>
//                   )}
//                 </S.ItemImage>
//                 <div>
//                   <span
//                     id={el._id}
//                     // onClick={onClickMoveDetail}
//                     style={{ margin: "10px" }}
//                   >
//                     {el.price}
//                   </span>
//                 </div>
//                 {/* <button onClick={onClickToday(el)}>담기</button> */}
//               </S.ListWrapper>
//             )) ?? <div></div>}
//           </S.Scroll>

//           <div></div>
//         </S.Wrapper>
//       </S.Container>
//     </>
//   );
// }
