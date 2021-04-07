import { useEffect, useState } from "react";
import "../App.css";
import DataTable from "./DataTable";
import Header from "./Header";
import Search from "./Search";
import UserAction from "./UserAction";
import dl from "./DataUser.json";

function App() {
  const [isStatus, setStatus] = useState({
    showAction: false,
    showEdit: false,
  });
  const [state, setState] = useState({
    data: dl,
    searchText: "",
    EditObjectUser: {},
  });
  const result = [];

  useEffect(() => {
    async function getUserDataLocal() {
      try {
        var getUserData = await localStorage.getItem("userData");
        if (getUserData === null) {
          localStorage.setItem("userData", JSON.stringify(state.data));
        } else {
          var temp = JSON.parse(getUserData);
          setState({
            ...state,
            data: temp,
          });
        }
      } catch (error) {
        console.log("Failed to get User In local: ", error.message);
      }
    }
    getUserDataLocal();
  }, []);

  const Show = (tag) => {
    if (tag === "Action") {
      setStatus({
        ...isStatus,
        showAction: !isStatus.showAction,
      });
    } else {
      setStatus({
        ...isStatus,
        showEdit: !isStatus.showEdit,
      });
    }
  };

  const editUser = (User) => {
    setState({
      ...state,
      EditObjectUser: User,
    });
  };
  const getIdUserDelete = (id = "") => {
    if (id !== "") {
      var arrUser = [...state.data.filter((item) => item.id !== id)];
      setState({
        ...state,
        data: arrUser,
      });
      localStorage.setItem("userData", JSON.stringify(arrUser));
    }
  };

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  const createUserData = (object) => {
    if (!isEmpty(object)) {
      var item = [
        {
          id: "",
          name: object.name,
          tel: object.tel,
          permission: object.permission,
        },
      ];
      setState({
        ...state,
        data: [...state.data, ...item],
      });
      localStorage.setItem(
        "userData",
        JSON.stringify([...state.data, ...item])
      );
    }
  };

  const getInputKeyWord = (keyword) => {
    setState((prevProps) => ({
      ...prevProps,
      searchText: keyword,
    }));
  };

  const getInfoUserFromEditForm = (InfoUser) => {
    var arrUser = [...state.data];
    arrUser.map((value, key) => {
      if (value.id === InfoUser.id) {
        value.name = InfoUser.name;
        value.tel = InfoUser.tel;
        value.permission = InfoUser.permission;
      }
    });
    setState({
      ...state,
      data: arrUser,
    });
    localStorage.setItem("userData", JSON.stringify(arrUser));
  };

  state.data.forEach((item) => {
    console.log(state.data);
    if (item.name.indexOf(state.searchText) !== -1) {
      result.push(item);
    }
  });

  return (
    <div className="App">
      <Header />
      <div className="SearchForm">
        <div className="container">
          <div className="row">
            <Search
              getInfoUserFromEditForm={getInfoUserFromEditForm}
              getObjectUser={state.EditObjectUser}
              SearchKeyWord={getInputKeyWord}
              Show={Show}
              Status={isStatus}
            />
            <DataTable
              Edit={editUser}
              Delete={getIdUserDelete}
              Show={Show}
              UserData={result}
            />
            <UserAction
              Action={createUserData}
              showAction={isStatus.showAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
