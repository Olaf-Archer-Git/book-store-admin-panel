import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import ModalComponent from "../../components/ModalComponent";
import { AiFillDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { colorToken } from "../../utils/theme";
import { Link } from "react-router-dom";
import { deleteBlog, getAllBlogs } from "../../app/features/blog/blogSlice";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog.blogs);
  const [openModal, setOpenModal] = useState(false);
  const [blogId, setBlogId] = useState("");

  const theme = useTheme();
  const colors = colorToken(theme.palette.mode);

  const showModal = (e) => {
    setOpenModal(true);
    setBlogId(e);
  };

  const hideModal = () => {
    setOpenModal(false);
  };

  const deleteBlogById = (e) => {
    dispatch(deleteBlog(e));
    setOpenModal(false);

    setTimeout(() => {
      dispatch(getAllBlogs());
    }, 500);
  };

  useEffect(() => {
    dispatch(getAllBlogs());
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

  function createData(key, ID, Title, Description, Edit, Delete) {
    const afterTags = Description.replace(/(<([^>]+)>)/gi, "");

    return { key, ID, Title, afterTags, Edit, Delete };
  }

  const rows = [];
  for (let i = 0; i < blogState.length; i++) {
    rows.push(
      createData(
        blogState[i]._id,
        i + 1,
        blogState[i].title,
        blogState[i].description
      )
    );
  }

  return (
    <>
      <Typography variant="h2" sx={{ margin: "25px 0", width: "100%" }}>
        Blogs
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.key}
                sx={{ textTransform: "capitalize" }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.ID}
                </StyledTableCell>
                <StyledTableCell>{row.Title}</StyledTableCell>
                <StyledTableCell>{row.afterTags}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`/admin/blog/${row.key}`}>
                    <CiEdit
                      style={{
                        color: colors.green[100],
                        fontSize: "21px",
                      }}
                      title="Edit"
                    />
                  </Link>
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
        title="Do You Want To Delete This Blog?"
        openModal={openModal}
        hideModal={hideModal}
        performAction={() => {
          deleteBlogById(blogId);
        }}
      />
    </>
  );
};

export default BlogList;
