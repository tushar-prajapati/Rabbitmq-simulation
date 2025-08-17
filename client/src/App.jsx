import React, { useState } from "react";
import Loader from "../components/Loader.jsx";
import FormData from 'form-data' 
import fs from 'fs'
import axios from 'axios'

const App = () => {
  const [file, setFile] = useState(null);
  const [summarization, setSummarization] = useState(false)
  const [generate, setGenerate] = useState(false)
  const [email, setEmail] = useState('')

  const summarize = async (e) => {
    e.preventDefault();
    setGenerate(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      const res = await axios.post("http://localhost:3000/api/summarize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

        setSummarization(true);
      
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
 

  return (
    <div className="w-screen h-screen  flex items-center justify-center">
      <div className="">
        <div className="mb-4 w-full">
          <label className=" border text-white px-4 bg-gray-800 hover:bg-gray-800/80  block w-96 text-center rounded-lg cursor-pointer font-bold py-4 md:py-11">
            <input
              type="file"
              name="File"
              accept=".txt"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>
        <div className="mb-4 w-full flex justify-center">
          
          <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email" name="email" placeholder="Enter your Email"  className="text-white rounded px-4 py-2 bg-gray-800 focus:outline outline-white"/>

        </div>

        <div className="mb-4 w-full flex justify-center">
          <button
            onClick={summarize}
            className="text-white border bg-green-600 hover:bg-green-700 rounded px-4 py-2 cursor-pointer text-center"
          >
            Generate AI Summary
          </button>
        </div>
        {generate && <div>
        <h1 className="text-center mb-4 text-2xl">Summary: {file? file.name: ""}</h1>
        <hr />
        <div className="mt-6 text-white w-full h-full items-center justify-center flex">
          {summarization? <p>File submitted for summarization, You'll recieve an email once its done. </p>: <Loader />}
          
        </div>
        </div>}
      </div>

      
    </div>
  );
};

export default App;
