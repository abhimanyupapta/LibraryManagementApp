import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { editIssue } from "../../features/admin/adminSlice";
import { useParams } from "react-router";
import "./editIssue.css";

const EditIssue = () => {
  const { id } = useParams();

  const { allIssues, isLoading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const issue = allIssues.find((i) => i._id.toString() === id.toString());

  const editIssueHandler = (e) => {
    e.preventDefault();
    dispatch(editIssue({id, status}));
  };

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="edit-issue-main">
          <form className="update-issue-form" onSubmit={editIssueHandler}>
            <h1 className="title">Process Order</h1>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setStatus(e.target.value)}>
                <option value="">Choose Category</option>
                {issue.status === "issued" && (
                  <option value="returned">Returned</option>
                )}

                {issue.status === "returned" && (
                  <option value="issued">Issued</option>
                )}
              </select>
            </div>

            <button
              className="issue-btn"
              type="submit"
              disabled={
                isLoading ? true : false || status === "" ? true : false
              }
            >
              Process
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditIssue;
