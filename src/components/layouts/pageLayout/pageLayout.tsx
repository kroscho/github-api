import { FC, ReactNode } from "react";
import { Header } from "@/components/widget/header";

import { styled } from "@mui/system";

const MainContainer = styled("main")({
  maxWidth: "1280px",
  margin: "8px auto 0",
  padding: "0 32px",
  width: "100%",
  height: "100%",
});

export const PageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <MainContainer>{children}</MainContainer>
    </>
  );
};
