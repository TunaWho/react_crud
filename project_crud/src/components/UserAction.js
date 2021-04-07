import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

UserAction.propTypes = {
  showAction: PropTypes.bool,
  Action: PropTypes.func,
};
UserAction.defaultProps = {
  Action: null,
};

function UserAction(props) {
  const { showAction, Action } = props;
  const [state, setState] = useState({});
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const isChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const createUserData = (newUser) => {
    if (Action) {
      Action(newUser);
      setState({});
    }
  };

  const showForm = () => {
    if (showAction === true) {
      return (
        <div className="col">
          <div className="card text-left">
            <div className="card border-primary mb-3">
              <div className="card-header">Thêm mới</div>
              <div className="card-body">
                <h4 className="card-title text-primary">Tên User</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Tên User"
                      onChange={isChange}
                      ref={register({ required: true })}
                    />
                    <p>{errors.name && "This is required"}</p>
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="tel"
                      placeholder="SĐT"
                      onChange={isChange}
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="custom-select"
                      name="permission"
                      onChange={isChange}
                      ref={register({ required: true })}
                    >
                      <option defaultValue>Choose Auth</option>
                      <option value={1}>Admin</option>
                      <option value={2}>Moderator</option>
                      <option value={3}>Normal</option>
                    </select>
                  </div>
                  <input
                    className="btn btn-block btn-primary"
                    type="reset"
                    onClick={() => createUserData(state)}
                    value="Add"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div className="Action">{showForm()}</div>;
}

export default UserAction;
