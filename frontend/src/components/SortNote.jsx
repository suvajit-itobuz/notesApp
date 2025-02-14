import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

export const SortNote = ({
  setSortType,
  setrender,
  render,
  setSortOrder,
  sortOrder,
}) => {
   const sortValue = (e) => {
    setSortType(e.target.value);
    setrender(!render);
  };
  const Ordersort = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
      setrender(!render);
    } else {
      setSortOrder("asc");
      setrender(!render);
    }
  };

  return (
    <>
      <button onClick={Ordersort} className="hover:scale-110">
        {sortOrder === "asc" ? (
          <div className="cursor-pointer">
            <FaArrowUp size={25} />
          </div>
        ) : (
          <div className="cursor-pointer">
            <FaArrowDown size={25} />
          </div>
        )}
      </button>

      <select
        name="sort"
        className="cursor-pointer p-3 b-2 text-xl border-2 border-[#2463EB] rounded-lg bg-[#2463EB] text-white "
        onChange={sortValue}
      >
        <option value="title" defaultChecked className="cursor-pointer">
          Title
        </option>
        <option value="createdAt" className="cursor-pointer">
          Created At
        </option>
      </select>
    </>
  );
};
