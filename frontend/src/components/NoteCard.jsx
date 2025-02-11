import axios from "axios";
import { useState, useEffect } from "react";
export const NoteCard = () => {
  const username = localStorage.getItem("username");
  const access = localStorage.getItem("accessToken");

  let data = "";
  const [cards, setCards] = useState([]);
  const fetchInfo = async () => {
    const response = await axios.get(`http://localhost:8000/note/get`, {
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
    });

    data = await response.data.data;

    let text = data[0].createdAt;

    data.forEach((value) => {
      let date = value.createdAt;
      let newDate = date.slice(0, 10);
      value.createdAt = newDate;
    });

    setCards(data);
  };

  useEffect(
    () => {
      fetchInfo();
    },
    [],
    cards
  );

  return (
    <>
      {cards.map((dataObj, index) => {
        return (
          <div
            className="note-card-container flex gap-5 max-w-md flex-col m-5 border-2 border-black p-5 rounded-md transition ease-in-out delay-200 hover:scale-105 cursor-pointer"
            key={index}
          >
            <div className="note-profile-button flex items-center  justify-between ">
              <div className="profile flex gap-2 items-center">
                <div className="profile-name flex flex-col">
                  <p>{username}</p>
                  <p>Created : {dataObj.createdAt}</p>
                </div>
              </div>
              <div className="note-button-container flex gap-5 ">
                <button className="border-black border-2 p-2 px-5 bg-black text-white rounded transition ease-in-out delay-150 hover:scale-110 hover:bg-slate-800 duration-300  hover:cursor-pointer">
                  Edit
                </button>
                <button className="border-black border-2 p-2 px-5 bg-black text-white rounded transition ease-in-out delay-150 hover:scale-110 hover:bg-slate-800 duration-300 hover:cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
            <div className="note-title-content  flex flex-col gap-5">
              <h3 className="text-5xl">{dataObj.title}</h3>
              <p className="text-lg">{dataObj.content}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
