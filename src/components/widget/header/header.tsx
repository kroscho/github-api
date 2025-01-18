import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";

import LogoImg from "@/assets/images/logo.webp";

const HeaderContainer = styled(AppBar)({
  height: "60px",
  backgroundColor: "#f6f8fa",
  color: "#1f2328",
  display: "flex",
  justifyContent: "center",
  position: "sticky",
  top: 0,
  zIndex: 1,
});

const Logo = styled("img")({
  width: "137px",
  height: "40px",
  marginRight: "8px",
});

export const Header: React.FC = () => {
  return (
    <HeaderContainer position="static">
      <Toolbar>
        <Logo src={LogoImg} alt="Logo" />
      </Toolbar>
    </HeaderContainer>
  );
};
