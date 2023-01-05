import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSliceActions } from "./store/UserSlice";
import { Button, CircularProgress } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const userList = useSelector((state) => state.userSliceReducer.userList);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await fetch("https://reqres.in/api/users");
      const responseData = await response.json();
      dispatch(userSliceActions.setUserData({ userList: responseData.data }));
    };
    fetchUsers();
    setTimeout(() => setLoading(false), 1000);
  }, [dispatch]);

  const getUserDetailsHandler = async (e) => {
    if (!e.target.value) {
      return;
    }
    const userId = e.target.value;
    setLoading(true);
    const response = await fetch(`https://reqres.in/api/users/${userId}`);
    const responseData = await response.json();
    setSelectedUser(responseData.data);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="App">
      {loading && <CircularProgress />}
      {!loading && !selectedUser && <h1>Select user to see details</h1>}

      {!loading && selectedUser && (
        <div className="user-details-sec">
          <img src={selectedUser?.avatar} alt="profile-pic" />
          <div>
            Email : <span>{selectedUser?.email}</span>
          </div>
          <div>
            First-Name : <span>{selectedUser?.first_name}</span>
          </div>
          <div>
            Last-Name : <span>{selectedUser?.last_name}</span>
          </div>
        </div>
      )}

      {!loading && (
        <div className="btn-sec" onClick={getUserDetailsHandler}>
          {userList.map((user) => (
            <Button
              variant="contained"
              key={user.id}
              // onClick={getUserDetailsHandler}
              value={user.id}
            >{`User ${user.id}`}</Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
