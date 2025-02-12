import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { EditNote } from "../components/EditNote";

export const NoteCard = ({ setrender, render, setModalOpen, setType }) => {
  const username = localStorage.getItem("username");
  const access = localStorage.getItem("accessToken");

  let data = "";
  const [cards, setCards] = useState([]);

  const notify = (value) => {
    if (value === "success") {
      toast.success("Note Deleted Successfully! ", { autoClose: 1000 });
    } else if (value === "fail") {
      toast.error("Note Deletion failed. Try again", { autoClose: 2000 });
    } else if (value == "not exist") {
      toast.error("Cannot delete!! Note Doesnot Exist");
    }
  };

  // fetching notes
  const fetchInfo = async () => {
    const response = await axios.get(`http://localhost:8000/note/get`, {
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
    });
    data = await response.data.data;
    data.forEach((value) => {
      let date = value.createdAt;
      let newDate = date.slice(0, 10);
      value.createdAt = newDate;
    });
    setCards(data);
  };

  // deleting notes
  const deleteCards = async (id) => {
    try {
      console.log(access);
      const response = await axios.delete(
        `http://localhost:8000/note/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.data.status === 200) {
        notify("success");
        setrender(!render);
      }
      if (response.data.status === 404) {
        notify("not exist");
      }
    } catch (error) {
      console.log(error);
      notify("fail");
    }
  };

  // monitoring changes
  useEffect(() => {
    fetchInfo();
  }, [render]);

  return (
    <>
      {cards.map((dataObj, index) => {
        return (
          <div
            className="note-card-container flex gap-7 max-w-md flex-col m-5 border-2 border-black p-5 rounded-md transition ease-in-out delay-200 hover:scale-105 cursor-pointer"
            key={index}
          >
            <div className="note-profile-button flex items-center  justify-between gap-5">
              <div className="profile flex gap-3  flex-col">
                <p>{username}</p>
                <p>Created On: {dataObj.createdAt}</p>
              </div>
              <div className="note-button-container flex gap-5 ">
                <EditNote
                  setModalOpen={setModalOpen}
                  setType={setType}
                  dataObj={dataObj}
                ></EditNote>
                <button
                  className="border-black border-2 p-2 px-5 bg-black text-white rounded transition ease-in-out delay-150 hover:scale-110 hover:bg-slate-800 duration-300 hover:cursor-pointer"
                  onClick={() => deleteCards(dataObj._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="note-title-content  flex flex-col gap-5">
              <h3 className="text-5xl">{dataObj.title}</h3>
              <p className="text-lg break-words overflow-scroll h-24 ">
                {dataObj.content}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
