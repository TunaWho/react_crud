import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import EditUser from "./EditUserForm";

SearchForm.propTypes = {
  Show: PropTypes.func,
  getInfoUserFromEditForm: PropTypes.func,
  Status: PropTypes.object,
  SearchKeyWord: PropTypes.func,
  getObjectUser: PropTypes.object.isRequired,
};

SearchForm.defaultProps = {
  getObjectUser: null,
};

function SearchForm(props) {
  const {
    Show,
    Status,
    SearchKeyWord,
    getObjectUser,
    getInfoUserFromEditForm,
  } = props;
  const [keyword, setKeyword] = useState(null);
  const TypingTimeoutRef = useRef(null);

  const inputKeyWithDebounce = (e) => {
    let searchKey = e.target.value;
    setKeyword(searchKey);

    if (TypingTimeoutRef.current) {
      clearTimeout(TypingTimeoutRef.current);
    }
    TypingTimeoutRef.current = setTimeout(() => {
      const value = {
        searchKey: e.target.value,
      };
      SearchKeyWord(value.searchKey);
    }, 400);
  };

  const showButton = () => {
    if (Status.showAction === true) {
      return (
        <div
          className="btn btn-block btn-outline-danger"
          onClick={() => Show("Action")}
        >
          Đóng
        </div>
      );
    } else {
      return (
        <div
          className="btn btn-block btn-outline-primary"
          onClick={() => Show("Action")}
        >
          Thêm mới
        </div>
      );
    }
  };

  return (
    <div className="col-sm-12">
      <EditUser
        getInfoUserFromEditForm={getInfoUserFromEditForm}
        Show={Show}
        getObjectUser={getObjectUser}
        isStatus={Status.showEdit}
      />
      <div className="form-group">
        <div className="btn-toolbar">
          <input
            type="text"
            className="form-control"
            name="keyword"
            placeholder="Search Keyword"
            style={{ width: "574px" }}
            onChange={inputKeyWithDebounce}
          />
          <button
            className="btn btn-info"
            type="button"
            onClick={() => SearchKeyWord(keyword)}
          >
            Search
          </button>
        </div>
        <div className="btn-group1">{showButton()}</div>
      </div>
      <hr />
    </div>
  );
}

export default SearchForm;
