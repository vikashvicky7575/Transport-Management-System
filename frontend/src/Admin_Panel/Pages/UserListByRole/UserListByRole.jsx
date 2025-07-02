import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersByRoleRequest } from "../../../Redux/Slice/userListSlice";

const UserListByRole = () => {
  const { role } = useParams();
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.userListstore);
  console.log("the auth", users);

  useEffect(() => {
    if (role) {
      dispatch(fetchUsersByRoleRequest(role));
    }
  }, [role, dispatch]);

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <h2 className="mb-4 text-capitalized">{role} List</h2>
          <div>
            <Link to="/admin/authProfile" className="btn btn-danger btn-sm">
              {" "}
              <i class="fa-solid fa-arrow-left mx-2"></i>Back
            </Link>
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {users.length === 0 ? (
          <p>No Data Found for {role}</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default UserListByRole;
