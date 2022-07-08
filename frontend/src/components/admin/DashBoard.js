import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllIssues, getAllBooks } from "../../features/admin/adminSlice";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteBook } from "../../features/admin/adminSlice";
import "./dashboard.css";

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allIssues, allBooks, isIssuesLoading } = useSelector(
    (state) => state.admin
  );



  const deleteBookHandler = (id) => {
    dispatch(deleteBook({ id}));
  };

  const onClickHandler = (e) => {
    e.preventDefault(e);
    navigate("/admin/book/new");
  };

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "returned"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "dueDate",
      headerName: "Due-Date",
      type: "date",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/issue/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  allIssues &&
    allIssues.forEach((item) => {
      rows.push({
        id: item._id,
        dueDate: item.issuedTill,
        status: item.status,
      });
    });

  const columns1 = [
    { field: "id", headerName: "Book ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() =>
                deleteBookHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </button>
          </>
        );
      },
    },
  ];

  const rows1 = [];

  allBooks &&
    allBooks.forEach((item) => {
      rows1.push({
        id: item._id,
        stock: item.stock,
        name: item.name,
      });
    });

  useEffect(() => {
    dispatch(getAllIssues());
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <>
      {isIssuesLoading ? (
        <p>isLoading...</p>
      ) : (
        <div className="main-user-issues">
          <h1 className="title">All Issues</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
          <h1 className="title">All Books</h1>
          <DataGrid
            rows={rows1}
            columns={columns1}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />

          <button onClick={onClickHandler} className="issue-btn">Add Book</button>
        </div>
      )}
    </>
  );
};

export default DashBoard;
