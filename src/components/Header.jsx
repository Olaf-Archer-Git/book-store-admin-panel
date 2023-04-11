import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorContext, colorToken } from "../utils/theme";
import { AiOutlineNotification } from "react-icons/ai";
import { BsMoon } from "react-icons/bs";
import { TiLightbulb } from "react-icons/ti";
import { useSelector } from "react-redux";

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorContext);
  const colors = colorToken(theme.palette.mode);

  const authState = useSelector((state) => state.auth.user);

  const name = authState.firstName + " " + authState.lastName;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <h2 style={{ textTransform: "capitalize" }}>Welcome, {name}</h2>
        <p style={{ color: colors.secondary[200] }}>
          Here's what's happenning with your site today
        </p>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "21px",
          width: "auto",
        }}
      >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <TiLightbulb /> : <BsMoon />}
        </IconButton>
        <AiOutlineNotification />
        <Box
          sx={{
            fontSize: "14px",
            color: colors.neutral[200],
            marginLeft: "25px",
          }}
        >
          <span>{name}</span> <br />
          <span>{authState.email}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
