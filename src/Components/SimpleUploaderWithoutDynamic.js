import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";


const WithoutDynamicUpload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleImport = (e) => {
    e.preventDefault();
    const files = file;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      setData([text])
    }
    reader.readAsText(files);
    setFile(null)
  }

  return (
    <div className='wrapper'>
      <h2>Upload CSV</h2>
      <div className="d-flex align-items-center justify-content-center">
        <div className="selectFile">
          <div className='upload-wrapper'>
            <input
              type='file'
              name="picture"
              accept=".csv"
              className="uploadFile"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className='upload-IconWrap'>
             {!file ? <p className='chooseText'> <IoMdAdd /> Choose File </p> : <p>{file?.name}</p>}
            </div>
          </div>
        </div>
        <button className='submitBtn' onClick={(e) => handleImport(e)}>Import csv</button>
      </div>
    <div className='mt-4'>{JSON.stringify(data)}</div>
    </div>
  )
}

export default WithoutDynamicUpload;