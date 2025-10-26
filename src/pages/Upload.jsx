import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { uploadLog, insertData } from "../apis/api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [unique_name, setUnique_name] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");
    try {
      const res = await uploadLog(file);
      setUnique_name(res.unique_name);
      setMessage(res.message);
      await insertData(res.unique_name);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  };

  return (
    <>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-16 mx-auto">
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <div class="relative">
                  <input
                    type="file"
                    id="name"
                    name="name"
                    onChange={(e) => setFile(e.target.files[0])}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={handleUpload}
                  class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  {isLoading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Upload Log"
                  )}
                </button>
                <a
                  href="https://drive.google.com/uc?export=download&id=1q8HNma-xRv41oSLHtuxVlbNpUFu46Jd7"
                  class="text-indigo-500 ml-4"
                >
                  Download sample log file
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {message !== "" ? <Dashboard unique_name={unique_name} /> : null}
    </>
  );
}
