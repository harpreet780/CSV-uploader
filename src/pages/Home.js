import React from 'react'
import CsvUploader from '../Components/CsvUploader';
import WithoutDynamicUpload from '../Components/SimpleUploaderWithoutDynamic';

const Home = () => {
  return (
    <div className='d-flex align-items-start justify-content-center'>
      <div className='w-100'>
      <CsvUploader />
      </div>
      {/* <div className='w-50'>
      <WithoutDynamicUpload />
      </div> */}
    </div>
  )
}

export default Home;