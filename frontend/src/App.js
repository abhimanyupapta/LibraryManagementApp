import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCsrfToken } from "./features/csrfTokenSlice";
import LoginSignUp from "./components/login-signup/LoginSignUp";
import Books from "./components/books/Books.js";
import { loadUser } from "./features/user/userSlice";
import Header from "./components/header/Header";
import BookDetail from "./components/books/BookDetail";
import Cart from "./components/cart/Cart.js";
import ConfirmIssue from "./components/issue/ConfirmIssue.js";
import UserProfile from "./components/user/Profile.js";
import UserIssues from "./components/user/UserIssues.js";
import DashBoard from "./components/admin/DashBoard.js"
import EditIssue from "./components/admin/EditIssue.js"
import AddBook from "./components/admin/AddBook.js"

function App() {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);

  //for protected route
  function ProtectedRoute({ children, redirectTo, isAdmin }) {
    if (isAuth === false) {
      return <Navigate to={redirectTo} />;
    }
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to={redirectTo} />;
    }

    return children;
  }

  useEffect(() => {
    dispatch(getCsrfToken());
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {isAuth && <Header />}
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route
          exact
          path="/books"
          element={
            <ProtectedRoute redirectTo="/">
              <Books />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/books/:id"
          element={
            <ProtectedRoute redirectTo="/">
              <BookDetail />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <ProtectedRoute redirectTo="/">
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/issue/confirm"
          element={
            <ProtectedRoute redirectTo="/">
              <ConfirmIssue />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute redirectTo="/">
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/my/issues"
          element={
            <ProtectedRoute redirectTo="/">
              <UserIssues />
            </ProtectedRoute>
          }
        />

        {/* admin routes */}
        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedRoute redirectTo="/" isAdmin={true}>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/issue/:id"
          element={
            <ProtectedRoute redirectTo="/" isAdmin={true}>
              <EditIssue />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/book/new"
          element={
            <ProtectedRoute redirectTo="/" isAdmin={true}>
              <AddBook />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
