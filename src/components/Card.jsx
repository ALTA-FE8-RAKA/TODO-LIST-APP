import React from "react";

const Card = ({ content, edit, handleDelete, id }) => {
  return (
    <>
      <div className="bg-slate-400 w-60" key={id}>
        <h3>{content}</h3>
        <button onClick={edit}>Edit</button>
        <button onClick={handleDelete}>delete</button>
      </div>
    </>
  );
};

export default Card;
