import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import Papa from "papaparse";
import { useCSVDownloader } from 'react-papaparse';
import { Progress } from 'reactstrap';

const CsvUploader = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const [percent, setPercent] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [emptyLines, setEmptyLines] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [error, setError] = useState("");
  const [downloadFile, setDownloadFile] = useState(null);

  const { CSVDownloader } = useCSVDownloader();

  const changeHandler = (e) => {
    setFile(e?.target?.files[0]);
    if (e) {
      setError('');
    }
  };
  const handleImport = () => {
    if (file) {
      setShowProgressBar(true);

      Papa.parse(file, {
        header: true,
        download: true,
        complete: function (results) {
          const rows = [];
          const fileValues = [];
          let csvData = results?.data;
          csvData?.map((item, index) => {
            rows?.push(Object.keys(item));
            fileValues?.push(Object.values(item));
            setTotalRows(index);
          })
          setParsedData([...csvData])
          setPercent(0);
          setTableRows(rows[0]);
          setTableValues(fileValues);
          setDownloadFile(file)

          let emptyRow = 0;
          csvData?.forEach((row) => {
            let isEmpty = Object.values(row).every((value) => value === "");
            if (isEmpty) {
              emptyRow++;
            }
            setEmptyLines(emptyRow);
          })
        }
      })
      setFile(null);
    }
    else {
      setError("*Must choose file before import csv*");
    }
  };


  useEffect(() => {
    if (showProgressBar) {
      const interval = setInterval(() => {
        setPercent((prev) => {
          if (prev === 100) {
            clearInterval(interval);
            return prev;
          }
          else {
            return prev + 10;
          }
        })
      }, (500))
    }
  }, [showProgressBar, percent])

  return (
    <div className='wrapper'>
      <h2>Upload CSV with dynamic parse</h2>
      <div className="d-flex align-items-center justify-content-center">
        <div className="selectFile">
          <div className='upload-wrapper'>
            <input
              type='file'
              name="picture"
              accept=".csv"
              className="uploadFile"
              onChange={(e) => changeHandler(e)}
            />
            <div className={`upload-IconWrap ${file && 'reset-top'}`}>
              {!file ? <p className='chooseText'> <IoMdAdd /> Choose File </p> : <p>{file?.name}</p>}
            </div>
          </div>
        </div>
        <div>
          <button
            className='submitBtn'
            onClick={() => handleImport()}
          >
            Import csv
          </button>
        </div>
        <div className="mx-2">
          <CSVDownloader
            filename={downloadFile?.name}
            data={parsedData}  
            bom={true}
            className="submitBtn text-decoration-none"
            style={{ opacity: downloadFile ? 1 : 0.6, cursor: downloadFile ? 'pointer' : 'not-allowed' }}
          >
            Download csv
          </CSVDownloader>

        </div>
      </div>
      {error && <p className='errorText'>{error}</p>}
      {showProgressBar && percent < 100 ?
        <div className="pt-5 w-50 m-auto">
          <Progress value={percent} color="info" />
          <div className="text-center">{percent}%</div>
        </div>
        : null}
      {percent === 100 && parsedData.length > 0 &&
        <div className='mt-5'>
          <div className="d-flex align-items-center justify-content-around mb-4">
            <p className='m-0'><b>Total rows:</b> {totalRows}</p>
            <p className='m-0'><b>Total empty lines:</b> {emptyLines}</p>
          </div>
          <table className='table'>
            <thead>
              <tr>
                {tableRows.map((rows, index) => {
                  return <th key={index}>{rows}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {tableValues.map((value, index) => {
                return (
                  <>
                    <tr key={index}>
                      {value.map((val, i) => {
                        return (
                          <td key={i}>{val}</td>
                        )
                      })}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}
export default CsvUploader;