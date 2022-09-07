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
      <div className="flex flex-col self-center pt-4">
        <form method="post" onSubmit={preventRefresh} className="flex flex-col self-center py-4">
          <label htmlFor="changeContent" className="text-center self-center font-bold">
            Ganti Todo Sebelumnya
          </label>
          <br />
          <input id="changeContent" type="text" onChange={changeContent} placeholder={location.state.content} className="shrink w-40 h-7 self-center border border-slate-500 rounded" />
          <br />
          <button type="submit" onClick={() => handleChange()} className="bg-blue-500 col px-3 py-1 rounded mb-2">
            Ganti
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTodo;
