import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "../redux/actions/userActions";

function ManageUser() {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const userDetails = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [Edit, setEdit] = useState(false);
  const [EditIndex, setEditIndex] = useState(false);

  const [addModalShow, setAddModal] = useState(false);
  const handleCloseModal = () => setAddModal(false);
  const [addUsers, setAddUsers] = useState({
    email: "",
    contact: "",
    name: "",
  });

  const [addUsersError, setAddUsersError] = useState({
    email: false,
    contact: false,
    name: false,
  });

  function AddUser() {
    if (addUsers?.name.trim() === "") {
      setAddUsersError((p) => ({ ...p, name: true }));

      return false;
    } else if (
      addUsers?.email.trim() === "" ||
      regex.test(addUsers.email) === false
    ) {
      setAddUsersError((p) => ({ ...p, email: true }));
      return false;
    } else if (
      addUsers?.contact.trim() === "" ||
      addUsers?.contact?.length != 10
    ) {
      setAddUsersError((p) => ({ ...p, contact: true }));
      return false;
    } else {
      dispatch(addUser(addUsers));
      handleCloseModal();
      setAddUsers({ email: "", contact: "", name: "" });
    }
  }
  function DeleteUer(index) {
    var data = userDetails?.userData;
    var deleted = data.splice(index, 1);
    dispatch(deleteUser(deleted[0]));
  }
  function Restore(index) {
    var data = userDetails?.deleteUser;
    var deleted = data.splice(index, 1);
    dispatch(addUser(deleted[0]));
  }
  function EditUserDetails() {
    var data = userDetails?.userData;
    data[EditIndex] = addUsers;
    console.log("dataadadada", data);

    if (addUsers?.name.trim() === "") {
      setAddUsersError((p) => ({ ...p, name: true }));

      return false;
    } else if (
      addUsers?.email.trim() === "" ||
      regex.test(addUsers.email) === false
    ) {
      setAddUsersError((p) => ({ ...p, email: true }));
      return false;
    } else if (
      addUsers?.contact.trim() === "" ||
      addUsers?.contact?.length != 10
    ) {
      setAddUsersError((p) => ({ ...p, contact: true }));
      return false;
    } else {
      setEdit(false);
      // dispatch(addUser(addUsers));
      handleCloseModal();
    }
  }
  console.log(userDetails);
  return (
    <>
      <div
        className="text-center align-items-center "
        style={{ "min-height": "100vh" }}
      >
        <h1> User Management</h1>
        <div className="container ">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                User
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Delete User
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <button
                type="button"
                class="btn btn-primary m-3"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={(e) => {
                  e.preventDefault();
                  setAddModal(true);
                }}
              >
                Add New User
              </button>
              <table className="table" border={"2"}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>actions</th>
                  </tr>
                </thead>

                <tbody>
                  {userDetails?.userData?.length > 0 &&
                    userDetails?.userData.map((item, index) => {
                      return (
                        <>
                          <tr>
                            <td>{item?.name}</td>
                            <td>{item?.email}</td>
                            <td>{item?.contact}</td>
                            <td>
                              <button
                                className="btn btn-primary m-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setAddUsers(item);
                                  setAddModal(true);
                                  setEdit(true);
                                  setEditIndex(index);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-secondary m-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  DeleteUer(index);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
                {userDetails?.userData.length === 0 ? (
                  <div className="text-center">No User Found </div>
                ) : (
                  ""
                )}
              </table>
            </div>
            <div
              class="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <table className="table" border={"2"}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>actions</th>
                  </tr>
                </thead>

                {userDetails?.deleteUser?.length > 0 &&
                  userDetails?.deleteUser.map((item, index) => {
                    return (
                      <>
                        <tr>
                          <td>{item?.name}</td>
                          <td>{item?.email}</td>
                          <td>{item?.contact}</td>
                          <td>
                            <button
                              className="btn btn-primary m-2"
                              onClick={(e) => {
                                e.preventDefault();
                                Restore();
                              }}
                              style={{ background: "#0d6efd" }}
                            >
                              Restore
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}

                {userDetails?.deleteUser.length === 0 ? (
                  <div className="text-center">No Deleted User Found </div>
                ) : (
                  ""
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal size="lg" show={addModalShow}>
        <Modal.Header>
          <Modal.Title>Add User Data </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Name </label>
              <input
                value={addUsers?.name}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Name"
                onChange={(e) => {
                  e.preventDefault();
                  setAddUsers((p) => ({ ...p, name: e.target.value }));
                  setAddUsersError((p) => ({ ...p, name: false }));
                }}
              />

              {addUsersError?.name === true && (
                <span style={{ color: "red" }}>Please Enter Valid Name</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                value={addUsers?.email}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => {
                  e.preventDefault();
                  setAddUsers((p) => ({ ...p, email: e.target.value }));
                  setAddUsersError((p) => ({ ...p, email: false }));
                }}
              />
              {addUsersError?.email === true && (
                <span style={{ color: "red" }}>Please Enter Valid Email</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Contact Number </label>
              <input
                value={addUsers?.contact}
                type="tel"
                className="form-control"
                maxLength={10}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Contact Number "
                onChange={(e) => {
                  e.preventDefault();
                  setAddUsers((p) => ({ ...p, contact: e.target.value }));
                  setAddUsersError((p) => ({ ...p, contact: false }));
                }}
              />
              {addUsersError?.contact === true && (
                <span style={{ color: "red" }}>
                  Please Enter Valid Contact Number{" "}
                </span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="button button-primary"
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              if (Edit === true) {
                EditUserDetails();
              } else {
                AddUser();
              }
            }}
          >
            Save User
          </Button>
          <Button
            className="button button-secondary"
            variant="secondary"
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManageUser;
