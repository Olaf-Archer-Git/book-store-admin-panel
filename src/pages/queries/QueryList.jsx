import React, { useEffect, useState } from "react";
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
  Typography,
  IconButton,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { colorToken } from "../../utils/theme";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllQueries,
  updateQuery,
  deleteQuery,
} from "../../app/features/query/querySlice";
import ModalComponent from "../../components/ModalComponent";
import { AiFillDelete } from "react-icons/ai";

const QueryList = () => {
  const dispatch = useDispatch();
  const queryState = useSelector((state) => state.query.queries);

  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);
  const [queryId, setQueryId] = useState("");

  const setQueryStatus = (e, id) => {
    const data = { id, queryData: e };
    dispatch(updateQuery(data));
  };

  const showModal = (e) => {
    setOpenModal(true);
    setQueryId(e);
  };

  const hideModal = () => {
    setOpenModal(false);
  };

  const deleteQueryById = (e) => {
    dispatch(deleteQuery(e));
    setOpenModal(false);

    setTimeout(() => {
      dispatch(getAllQueries());
    }, 500);
  };

  useEffect(() => {
    dispatch(getAllQueries());
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

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(key, ID, Name, Email, Comment, Status, Action) {
    return { key, ID, Name, Email, Comment, Status, Action };
  }

  const rows = [];
  for (let i = 0; i < queryState.length; i++) {
    rows.push(
      createData(
        queryState[i]._id,
        i + 1,
        queryState[i].name,
        queryState[i].email,
        queryState[i].comment,
        <select
          className="query-select"
          defaultValue={
            queryState[i].status ? queryState[i].status : "Submitted"
          }
          onChange={(e) => setQueryStatus(e.target.value, queryState[i]._id)}
        >
          <option value="Submitted">Submitted</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      )
    );
  }

  return (
    <>
      <Typography variant="h2" sx={{ margin: "25px 0", width: "100%" }}>
        Queries
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Comment</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
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
                <StyledTableCell align="left">{row.Comment}</StyledTableCell>
                <StyledTableCell align="left">{row.Status}</StyledTableCell>
                <StyledTableCell align="left" sx={{ display: "flex" }}>
                  <IconButton
                    onClick={() => showModal(row.key)}
                    style={{ color: "#f35232" }}
                  >
                    <AiFillDelete style={{ fontSize: "21px" }} title="Delete" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalComponent
        title="Do You Want To Delete This Query?"
        openModal={openModal}
        hideModal={hideModal}
        performAction={() => {
          deleteQueryById(queryId);
        }}
      />
    </>
  );
};

export default QueryList;
