import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let config = {
      method: "get",
      url: "https://api.todoist.com/rest/v1/tasks",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    };

    await axios(config)
      .then((response) => {
        setTodo(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleEditPage = (item) => {
    navigate(`/edit/${item.id}`, {
      state: {
        id: item.id,
        content: item.content,
      },
    });
  };

  const handleDelete = (item) => {
    let config = {
      method: "delete",
      url: `https://api.todoist.com/rest/v1/tasks/${item.id}`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    };
    axios(config)
      .then(function (response) {
        getData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createTodo = async () => {
    const data = {
      content: content,
    };

    const config = {
      method: "post",
      url: "https://api.todoist.com/rest/v1/tasks",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        getData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const inputTodo = (event) => {
    setContent(event.target.value);
  };

  function preventRefresh(event) {
    event.preventDefault();
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col self-center pt-4">
        <form onSubmit={preventRefresh} className="flex flex-col self-center py-4">
          <label htmlFor="inputTodo" className="text-center self-center font-bold text-ne">
            Buat Todo List
          </label>
          <br />
          <input id="inputTodo" type="text" onChange={inputTodo} className="shrink w-40 h-7 self-center border border-slate-500 rounded" />
          <br />
          <button type="submit" onClick={() => createTodo()} className="bg-blue-500 col px-3 py-1 rounded mb-2">
            Buat
          </button>
        </form>
        {todo ? (
          todo.map((item) => {
            return <Card id={item.id} content={item.content} edit={() => handleEditPage(item)} handleDelete={() => handleDelete(item)} />;
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Homepage;
