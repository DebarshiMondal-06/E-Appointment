import React from 'react'
import ClipLoader from "react-spinners/SyncLoader";


const MainLoader = () => {

  return <section className='text-center' style={{ marginTop: "10%" }}>
    <ClipLoader color="#00bfa6" size={22} />
  </section>
};

export default MainLoader;