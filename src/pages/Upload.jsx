import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { uploadLog, insertData } from "../apis/api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [unique_name, setUnique_name] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");
    try {
      const res = await uploadLog(file);
      setUnique_name(res.unique_name);
      setMessage(res.message);
      if (res) {
        await insertData(res.unique_name);
      }
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
                  <label for="message" class="leading-7 text-sm text-gray-600">
                    Message
                  </label>
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
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {message !== "" ? <Dashboard unique_name={unique_name} /> : null}
    </>
  );
}
