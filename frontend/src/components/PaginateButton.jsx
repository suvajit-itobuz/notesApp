import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PaginateButton = ({ page, setPage, setrender, render }) => {
  const navigate = useNavigate();
  const nextPage = () => {
    setPage(page + 1);
    setrender(!render);
  };
  const prevPage = () => {
    setPage(page - 1);
    setrender(!render);
  };
  const access = localStorage.getItem("accessToken");
  // monitoring changes
  useEffect(() => {
    if (!access) {
      navigate("/login");
    }
  }, [access, render]);
  return (
    <>
      <div className="button-container flex items-center gap-3 justify-center absolute start-[44%] bottom-0">
        <button onClick={prevPage}>
          <BsFillArrowLeftCircleFill size={40} />
        </button>

        <span className="text-3xl  p-3 rounded">Page-{page}</span>
        <button onClick={nextPage}>
          <BsFillArrowRightCircleFill size={40} />
        </button>
      </div>
    </>
  );
};
