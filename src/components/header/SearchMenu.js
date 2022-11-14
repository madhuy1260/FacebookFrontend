/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { Return, Search } from "../../svg";
import { useRef, useState, useEffect } from "react";
import ClickOutside from "../../helpers/clickOutside";
import {
  addToSearchHistory,
  getSearchHistory,
  search,
  removeFromSearch,
} from "../../functions/user";
import { Link } from "react-router-dom";

function SearchMenu({ color, setShowSearchMenu, token }) {
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const menu = useRef(null);
  const input = useRef(null);
  const [searchHistory, setSearchHistory] = useState([]);

  ClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    const res = await getSearchHistory(token);
    setSearchHistory(res);
  };

  useEffect(() => {
    input.current.focus();
  }, []);

  const searchHandler = async () => {
    if (searchTerm === "") {
      setResults("");
    } else {
      // console.log(token);
      const res = await search(searchTerm, token);
      setResults(res);
    }
  };

  // console.log(results);
  // console.log(searchHistory);

  const addToSearchHistoryHandler = async (searchUser) => {
    await addToSearchHistory(searchUser, token);
    getHistory();
  };

  const handleRemove = async (searchUser) => {
    removeFromSearch(searchUser, token);
    getHistory();
  };

  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={searchHandler}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      {results === "" && (
        <div className="search_history_header">
          <span>Recent searches</span>
          <a href="">Edit</a>
        </div>
      )}
      <div className="search_history scrollbar">
        {searchHistory &&
          results === "" &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => (
              <div className="search_user_item hover1" key={user._id}>
                <Link
                  to={`/profile/${user.user.username}`}
                  className="flex"
                  onClick={() => addToSearchHistoryHandler(user.user._id)}
                >
                  <img src={user.user.picture} alt="" />
                  <span>
                    {user.user.first_name} {user.user.last_name}
                  </span>
                </Link>
                <i
                  className="exit_icon"
                  onClick={() => {
                    handleRemove(user.user._id);
                  }}
                ></i>
              </div>
            ))}
      </div>
      <div className="search_results scrollbar">
        {results &&
          results.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              className="search_user_item hover1"
              onClick={() => addToSearchHistoryHandler(user._id)}
              key={user._id}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SearchMenu;
