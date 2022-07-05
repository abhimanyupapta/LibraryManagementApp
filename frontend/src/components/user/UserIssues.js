import React from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";

const UserIssues = () => {
  const { userIssues, isLoading } = useSelector((state) => state.user);

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
  ];

  const rows = [];

  userIssues &&
    userIssues.forEach((item) => {
      rows.push({
        id: item._id,
        dueDate: item.issuedTill,
        status: item.status,
      });
    });

  return (
    <>
      {isLoading ? (
        <p>isLoading...</p>
      ) : (
        <div className="main-user-issues">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default UserIssues;
