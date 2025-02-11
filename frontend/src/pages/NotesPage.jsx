import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NoteCard } from "../components/NoteCard";

export const NotesPage = () => {
  const navigate = useNavigate();

  const access = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!access) {
      navigate("/login");
    }
  }, [access, navigate]);

  return (
    <>
      <div className="items-center justify-center flex w-screen">
        <a
          className="p-2 m-2 border-cyan-400 border-2 rounded-lg text-cyan-500 font-bold"
          href="/createNote"
        >
          Create Post
        </a>
      </div>
      <div className="flex flex-wrap  justify-center">
        <NoteCard />
      </div>
    </>
  );
};
