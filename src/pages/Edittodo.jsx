import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditTodo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [input, setInput] = useState([]);
  const [change, setChange] = useState("");

  const handleChange = async () => {
    const data = {
      content: change,
    };

    const config = {
      method: "post",
      url: `https://api.todoist.com/rest/v1/tasks/${location.state.id}`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        setInput(response.data);
      })
      .catch(function (error) {
        alert(error);
      });

    navigate(`/`);
  };

  const changeContent = (event) => {
    setChange(event.target.value);
  };

  function preventRefresh(event) {
    event.preventDefault();
  }

  return (
    <>
      <p>{input}</p>
      <form method="post" onSubmit={preventRefresh}>
        <label htmlFor="changeContent">Ganti Todo Sebelumnya</label>
        <br />
        <input id="changeContent" type="text" onChange={changeContent} placeholder={location.state.content} />
      </form>
      <button type="submit" onClick={() => handleChange()}>
        Ganti
      </button>
    </>
  );
};

export default EditTodo;
