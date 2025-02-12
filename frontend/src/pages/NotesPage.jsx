import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NoteCard } from "../components/NoteCard";
import { ManipulateNote } from "../components/ManipulateNote";
import { AddNote } from "../components/AddNote";
import { SearchNote } from "../components/SearchNote";

export const NotesPage = () => {
  const navigate = useNavigate();

  // const value =

  const access = localStorage.getItem("accessToken");
  const [render, setrender] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState({
    header: "Create",
    Route: "create",
    NoteTitle: "",
    NoteContent: "",
    data_id:""
  });

  useEffect(() => {
    if (!access) {
      navigate("/login");
    }
  }, [access, navigate, render]);

  return (
    <>
      <div className="items-center justify-center flex w-screen flex-col">
        <AddNote setModalOpen={setModalOpen} setType={setType} type={type} />
        <SearchNote/>
        <ManipulateNote
          setrender={setrender}
          render={render}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          type={type}
        />
      </div>
      <div className="flex flex-wrap  ">
        <NoteCard
          setrender={setrender}
          render={render}
          onClose={() => setModalOpen(false)}
          setModalOpen={setModalOpen}
          setType={setType}
        />
      </div>
    </>
  );
};
