import React from "react";
import PropTypes from "prop-types";
import TableRow from "./TableRow";

DataTable.propTypes = {
  UserData: PropTypes.array,
  Show: PropTypes.func,
  Edit: PropTypes.func,
  Delete: PropTypes.func,
};

DataTable.defaultProps = {
  UserData: [],
  Edit: null,
  Delete: null,
};

function DataTable(props) {
  const { UserData, Show, Edit, Delete } = props;
  const showDataUser = () =>
    UserData.map((value, key) => {
      value.id = key + 1;
      return (
        <TableRow
          Edit={() => EditClick(value)}
          Delete={DeleteClick}
          Show={Show}
          key={key}
          user={value}
        />
      );
    });

  const EditClick = (User) => {
    if (Edit) {
      Edit(User);
    }
  };

  const DeleteClick = (id) => {
    if (Delete) {
      Delete(id);
    }
  };

  const isShow = () => {
    if (UserData.length !== 0) {
      return <tbody>{showDataUser()}</tbody>;
    } else {
      return <tbody></tbody>;
    }
  };

  return (
    <div className="col">
      <table className="table table-striped table-hover">
        <thead className="thead-inverse">
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Phone</th>
            <th>Quyền</th>
            <th>Action</th>
          </tr>
        </thead>
        {isShow()}
      </table>
    </div>
  );
}

export default DataTable;
