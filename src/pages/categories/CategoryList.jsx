import React, { useEffect, useState } from "react";
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
  tableCellClasses,
  styled,
} from "@mui/material";

import { colorToken } from "../../utils/theme";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategories,
  deleteCategory,
} from "../../app/features/categories/categorySlice";
import ModalComponent from "../../components/ModalComponent";
import { AiFillDelete } from "react-icons/ai";

const CategoryList = () => {
  const [categoryId, setCategoryId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.category.categories);

  const showModal = (e) => {
    setOpenModal(true);
    setCategoryId(e);
  };

  const hideModal = () => {
    setOpenModal(false);
  };

  const deleteCategoryById = (e) => {
    dispatch(deleteCategory(e));
    setOpenModal(false);

    setTimeout(() => {
      dispatch(getAllCategories());
    }, 500);
  };

  useEffect(() => {
    dispatch(getAllCategories());
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

  function createData(key, ID, Category, Action) {
    return { key, ID, Category, Action };
  }

  const rows = [];
  for (let i = 0; i < categoryState.length; i++) {
    rows.push(createData(categoryState[i]._id, i + 1, categoryState[i].title));
  }

  return (
    <>
      <Typography variant="h2" sx={{ margin: "25px 0", width: "100%" }}>
        Categories
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.key}>
                <StyledTableCell component="th" scope="row">
                  {row.ID}
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  sx={{ textTransform: "capitalize" }}
                >
                  {row.Category}
                </StyledTableCell>
                <StyledTableCell align="center">
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
        title="Do You Want To Delete This Category?"
        openModal={openModal}
        hideModal={hideModal}
        performAction={() => {
          deleteCategoryById(categoryId);
        }}
      />
    </>
  );
};

export default CategoryList;
