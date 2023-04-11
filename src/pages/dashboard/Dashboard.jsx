import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Icon,
  useTheme,
} from "@mui/material";
import { colorToken } from "../../utils/theme";
import { MdOutlinePointOfSale } from "react-icons/md";
import { BsPeopleFill, BsStarFill, BsArrowUpRight } from "react-icons/bs";
import Charts from "../../components/Charts";

const Dashboard = () => {
  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);
  return (
    <section className="dashboard">
      <Typography variant="h3" sx={{ padding: "25px 0" }}>
        Dashboard
      </Typography>
      <Box className="dashboard-container">
        <Card sx={{ width: "100%", height: 150 }}>
          <CardContent>
            <Icon>
              <MdOutlinePointOfSale style={{ color: colors.green[100] }} />
            </Icon>
            <span style={{ marginLeft: "10px" }}>Total Sales</span>
            <Box
              sx={{
                color: colors.green[100],
                fontSize: "35px",
                margin: "10px 0",
              }}
            >
              $ 100 000
            </Box>
            <BsArrowUpRight style={{ marginRight: "5px" }} /> 20%
          </CardContent>
        </Card>
        <Card sx={{ width: "100%", height: 150 }}>
          <CardContent>
            <Icon>
              <BsPeopleFill style={{ color: colors.green[100] }} />
            </Icon>
            <span style={{ marginLeft: "10px" }}>Visitors</span>
            <Box
              sx={{
                color: colors.green[100],
                fontSize: "35px",
                margin: "10px 0",
              }}
            >
              2300
            </Box>
            <BsArrowUpRight style={{ marginRight: "5px" }} /> 20%
          </CardContent>
        </Card>
        <Card sx={{ width: "100%", height: 150 }}>
          <CardContent>
            <Icon>
              <BsStarFill style={{ color: colors.green[100] }} />
            </Icon>
            <span style={{ marginLeft: "10px" }}>Orders</span>
            <Box
              sx={{
                color: colors.green[100],
                fontSize: "35px",
                margin: "10px 0",
              }}
            >
              250
            </Box>
            <BsArrowUpRight style={{ marginRight: "5px" }} /> 20%
          </CardContent>
        </Card>
      </Box>
      <Charts />
    </section>
  );
};

export default Dashboard;
