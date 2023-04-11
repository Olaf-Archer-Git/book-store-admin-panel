import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { grey, orange } from "@mui/material/colors";

const ForgotPassword = () => {
  return (
    <section className="forgot-password">
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

            backgroundColor: grey[700],
          }}
        >
          <CardContent
            sx={{
              color: orange[400],
              padding: "50px 0",
              width: "90%",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Forgot Password
            </Typography>
            <p style={{ textAlign: "center" }}>
              Enter Email To Reset Your Password
            </p>

            <TextField
              fullWidth={true}
              color="warning"
              label="email"
              type="email"
              name="email"
              id="id-email"
            />
            <Button
              variant="contained"
              color="warning"
              sx={{
                padding: "10px 50px",
                color: "#ffff",
                display: "block",
                margin: "20px auto",
              }}
            >
              Send Link
            </Button>
          </CardContent>
        </Card>
      </Box>
    </section>
  );
};

export default ForgotPassword;
