import React from "react";

const Card = ({ content, edit, handleDelete, id }) => {
  return (
    <>
      <div className="flex self-center">
        <div className="bg-slate-400 w-60 flex flex-col rounded drop-shadow-lg my-3" key={id}>
          <h3 className="self-center py-3 font-bold">{content}</h3>
          <div className="flex justify-around">
            <button onClick={edit} className="bg-blue-500 col px-3 py-1 rounded mb-2">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-700 block px-3 py-1 rounded mb-2">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
