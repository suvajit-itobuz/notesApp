export const AddNote = ({ setModalOpen, setType }) => {
  return (
    <>
      <a
        className="p-2 m-2 border-cyan-400 border-2 rounded-lg text-cyan-500 font-bold hover:scale-110  transition ease-in-out delay-200 cursor-pointer"
        // href="/createNote"
        onClick={() => {
          setModalOpen(true);
        //   setType("create")
          setType({
            header: "Create",
            Route: "create",
            NoteTitle: "",
            NoteContent: "",
          });
        }}
      >
        Create Post
      </a>
    </>
  );
};
