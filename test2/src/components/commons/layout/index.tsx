import styled from "@emotion/styled";
import { useRouter } from "next/router";

import LayoutHeader from "./header";
import LayoutRecent from "./recent";
interface ILayoutProps {
  children: JSX.Element;
}

const LayoutBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  //   const HIDDEN_HEADER = ["/main"];
  //   const HIDDEN_BANNER = [
  //     "/freeboard",
  //     "/main",
  //     `/freeboard_moved/${router.query.number}/edit`,
  //     "/join",
  //     "/log-in",
  //   ];
  //   const HIDDEN_NAVIGATION = ["/main"];
  //   const isHiddenBanner = HIDDEN_BANNER.includes(router.asPath);
  //   const isHiddenHeader = HIDDEN_HEADER.includes(router.asPath);
  //   const isHiddenNavigation = HIDDEN_NAVIGATION.includes(router.asPath);

  //   return (
  //     <div>
  //       {!isHiddenHeader && <LayoutHeader />}
  //       {/* {!isHiddenBanner && <LayoutBanner />} */}
  //       {!isHiddenNavigation && <LayoutNavigation />}
  //       <div>{props.children}</div>
  //       <LayoutFooter></LayoutFooter>
  //     </div>
  //   );

  return (
    <div>
      <LayoutHeader />
      <LayoutRecent />
      <div>{props.children}</div>
    </div>
  );
}
