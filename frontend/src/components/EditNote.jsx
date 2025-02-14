export const EditNote = ({ setModalOpen, setType, dataObj }) => {
  
  return (
    <>
      <button
        className="border-none  p-2 px-5 bg-[#2463EB] text-white rounded transition ease-in-out delay-150 hover:scale-110 hover:bg-blue-800 duration-300  hover:cursor-pointer"
        onClick={() => {
          setModalOpen(true);
          setType({
            header: "Edit",
            Route: "update",
            NoteTitle: dataObj.title,
            NoteContent: dataObj.content,
            data_id: dataObj._id,
          });
        }}
      >
        Edit
      </button>
    </>
  );
};
