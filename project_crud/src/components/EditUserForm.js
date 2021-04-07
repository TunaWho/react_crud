import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

EditUser.propTypes = {
  Show: PropTypes.func,
  isStatus: PropTypes.bool,
  getObjectUser: PropTypes.object.isRequired,
  getInfoUserFromEditForm: PropTypes.func,
};
EditUser.defaultProps = {
  getObjectUser: null,
  getInfoUserFromEditForm: null,
};

function EditUser(props) {
  const { Show, isStatus, getObjectUser, getInfoUserFromEditForm } = props;
  const [state, setState] = useState(null);
  const TypingTimeoutRef = useRef(null);

  useEffect(() => {
    setState(getObjectUser);
  }, [getObjectUser]);

  const isChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "permission") {
      value = parseInt(value);
    }

    if (TypingTimeoutRef.current) {
      clearTimeout(TypingTimeoutRef.current);
    }
    TypingTimeoutRef.current = setTimeout(() => {
      setState({
        ...state,
        [name]: value,
      });
    }, 400);
  };
  const HandleEditClick = () => {
    if (getInfoUserFromEditForm) {
      getInfoUserFromEditForm(state);
    }
    if (Show) {
      Show("Edit");
    }
  };

  const Render = () => {
    if (isStatus === true) {
      return (
        <div className="col-sm-12">
          <div className="text-left">
            <div className="card text-white bg-warning mb-3">
              <div className="card-header text-center">Edit User</div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      defaultValue={getObjectUser.name}
                      onChange={(e) => isChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="tel"
                      defaultValue={getObjectUser.tel}
                      onChange={(e) => isChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="custom-select"
                      name="permission"
                      defaultValue={getObjectUser.permission}
                      onChange={(e) => isChange(e)}
                    >
                      <option value={0}>Normal</option>
                      <option value={1}>Admin</option>
                      <option value={2}>Moderator</option>
                    </select>
                  </div>
                  <input
                    className="btn btn-block btn-info"
                    type="reset"
                    onClick={HandleEditClick}
                    value="Edit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  return <div className="row">{Render()}</div>;
}

export default EditUser;
