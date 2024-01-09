import React, { useState } from 'react';
import axios from 'axios';
import './PdfCompare.css'; 

function PdfCompare() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [result, setResult] = useState(null);

  const handleFile1Change = (e) => setFile1(e.target.files[0]);
  const handleFile2Change = (e) => setFile2(e.target.files[0]);

  const handleCompare = async () => {
    if (!file1 || !file2) {
      alert('Please upload both PDF files');
      return;
    }

    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    try {
      const response = await axios.post('http://localhost:3001/compare-pdfs', formData);
      console.log('Response:', response.data); 
      setResult(response.data.result);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container">
      <h1>PDF Comparison</h1>
      <div className="file-upload-container">
        <input type="file" id="file1" onChange={handleFile1Change} />
        <label htmlFor="file1" className="file-upload-button">
          Upload PDF 1
        </label>

        <input type="file" id="file2" onChange={handleFile2Change} />
        <label htmlFor="file2" className="file-upload-button">
          Upload PDF 2
        </label>
      </div>
      <button onClick={handleCompare}>Compare PDFs</button>
      {result && <p>{result}</p>}
    </div>
  );
}

export default PdfCompare;
