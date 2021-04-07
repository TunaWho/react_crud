import React from "react";
import PropTypes from "prop-types";

TableRow.propTypes = {
  user: PropTypes.object.isRequired,
  Edit: PropTypes.func.isRequired,
  Delete: PropTypes.func.isRequired,
  Show: PropTypes.func.isRequired,
};

TableRow.defaultProps = {
  user: null,
  Edit: null,
  Delete: null,
  Show: null,
};

function TableRow(props) {
  const { user, Edit, Show, Delete } = props;
  const permission = parseInt(user.permission);

  const HandleClick = () => {
    if (Show) {
      Show("Edit");
    }
    if (Edit) {
      Edit(user);
    }
  };

  const setPermission = () => {
    switch (permission) {
      case 1:
        return "Admin";
      case 2:
        return "Moderator";
      default:
        return "User";
    }
  };
  return (
    <tr>
      <td scope="row">{user.id}</td>
      <td>{user.name}</td>
      <td>{user.tel}</td>
      <td>{setPermission()}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Button group">
          <button
            className="btn btn-warning"
            type="button"
            onClick={HandleClick}
          >
            <i className="fa fa-edit" />
            Edit
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => Delete(user.id)}
          >
            <i className="fa fa-trash" />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableRow;
