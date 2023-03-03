import { css } from "@emotion/react";

export const globalStyles = css`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: "myfont";
  }

  @font-face {
    font-family: "myfont"; //아래 폰트의 이름을 임의로 만들어서 CCS로 적용할 수 있습니다..
    src: url("/fonts/scifibit.ttf"); //다운받은 경로
  }
`;
