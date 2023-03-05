import { useRouter } from "next/router";

import LayoutHeader from "./header";
import LayoutRecent from "./recent";
interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  const HIDDEN_HEADER = ["/usedItems/login", "/usedItems/sign"];
  const HIDDEN_TODAY = ["/usedItems/login", "/usedItems/sign"];

  const isHiddenHeader = HIDDEN_HEADER.includes(router.asPath);
  const isHiddenToday = HIDDEN_TODAY.includes(router.asPath);

  return (
    <div>
      {!isHiddenHeader && <LayoutHeader />}
      {!isHiddenToday && <LayoutRecent />}
      <div>{props.children}</div>
    </div>
  );
}
