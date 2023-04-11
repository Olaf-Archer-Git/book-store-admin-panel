import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { blue, grey } from "@mui/material/colors";

const ResetPassword = () => {
  return (
    <section className="reset-password">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            maxWidth: 500,
            width: "100%",
            backgroundColor: grey[800],
          }}
        >
          <CardContent
            sx={{
              color: blue[400],
              padding: "50px 0",
              width: "90%",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Reset Password
            </Typography>
            <p style={{ textAlign: "center" }}>Enter Your New Password</p>

            <Box sx={{ marginBottom: "20px" }}>
              <TextField fullWidth={true} label="password" color="info" />
            </Box>
            <Box>
              <TextField
                fullWidth={true}
                label="confirm password"
                color="info"
              />
            </Box>

            <Button
              variant="contained"
              color="info"
              sx={{
                padding: "10px 50px",
                color: "#ffff",
                display: "block",
                margin: "20px auto",
              }}
            >
              Reset Password
            </Button>
          </CardContent>
        </Card>
      </Box>
    </section>
  );
};

export default ResetPassword;
