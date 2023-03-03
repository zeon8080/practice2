import { useRouter } from "next/router";

import LayoutHeader from "./header";
interface ILayoutProps {
  children: JSX.Element;
}

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
      <div>{props.children}</div>
    </div>
  );
}
