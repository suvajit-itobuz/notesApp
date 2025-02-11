import react from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const validateNote = z.object({
  title: z
    .string()
    .min(3, { message: "title must be at least 3 characters long" }),
  content: z.string().optional(),
});

export const CreateNote = () => {

  const notify = (value) => {
    if (value === "success") {
      toast.success("Note created! ", { autoClose: 2000 });
    } else if (value === "fail") {
      toast.error("Note creation failed. Try again", { autoClose: 3000 });
    } else if (value === "exists") {
      toast.error("Title already exists. Try a different one.", {
        autoClose: 3000,
      });
    }
  };
  const navigate = useNavigate();

  const access = localStorage.getItem("accessToken");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/note/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 200) {
        notify("success");
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response);
        notify("exists");
      }
      else {

          console.log(error.response);
          notify("fail");
      }
    }
  };

  useEffect(() => {
    if (!access) {
      navigate("/login");
    }
  }, [access, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateNote),
  });

  return (
    <>
      <div className="note-container">
        <div className=" h-[90.8vh] items-center flex flex-col bg-[#90e0ef] justify-center m-0 p-0">
          <div className=" flex flex-col gap-16 bg-[#0096c7] p-5 rounded-lg ">
            <form
              action="#"
              className="flex flex-col items-center gap-10 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col  gap-10 justify-center items-center p-6">
                <h1 className="font-bold text-5xl text-white">Create Post</h1>
                <div className=" flex  gap-5 flex-col">
                  <textarea
                    className="placeholder:text-gray-500 placeholder:italic placeholder:text-5xl min-w-[40vw] min-h-[10vh] placeholder:font-semibold p-5 text-5xl"
                    type="text"
                    id=""
                    placeholder="New note title here..."
                    autoComplete="off"
                    aria-label="Post Title"
                    autoFocus=""
                    {...register("title")}
                  ></textarea>
                  <textarea
                    aria-label="Post Content"
                    type="text"
                    placeholder="Write your content here..."
                    id="content"
                    className="min-h-[35vh] p-5 placeholder:text-2xl text-2xl"
                    {...register("content")}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-xl border-black border-2 p-2 px-5 bg-black text-white rounded transition ease-in-out delay-150  hover:scale-105 hover:bg-slate-800 duration-500"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
