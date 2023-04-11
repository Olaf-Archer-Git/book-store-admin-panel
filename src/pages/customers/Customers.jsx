import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { colorToken } from "../../utils/theme";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../app/features/customer/customerSlice";

const Customers = () => {
  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer.customers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: colors.neutral[100],
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(key, ID, Name, Email, Mobile) {
    return { key, ID, Name, Email, Mobile };
  }

  const rows = [];
  for (let i = 0; i < customerState.length; i++) {
    rows.push(
      createData(
        customerState[i]._id,
        i + 1,
        `${customerState[i].firstName} ${customerState[i].lastName}`,
        customerState[i].email,
        customerState[i].mobile
      )
    );
  }

  return (
    <TableContainer component={Paper} sx={{ margin: "50px 0", width: "100%" }}>
      <Table sx={{ minWidth: 450 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Mobile</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.key}>
              <StyledTableCell component="th" scope="row">
                {row.ID}
              </StyledTableCell>
              <StyledTableCell align="left">{row.Name}</StyledTableCell>
              <StyledTableCell align="left">{row.Email}</StyledTableCell>
              <StyledTableCell align="left">{row.Mobile}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Customers;
