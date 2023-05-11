import MainPage from "./components/main/MainPage";
import NavBar from "./components/nav/NavBar";

import { useState, useEffect } from "react"
import axios from 'axios'

function App() {
  const [colorHandler, setColorHandler] = useState({
    _id: '',
    navColor: '',
    bodyColor: '',
    googleDriveId: "1WY0MWd9oaLKWVi2TFbXaoyCJU-LEAgZ8"
  })
  
  useEffect(() => {
    axios.get('https://photobooth-gdrive.onrender.com/getColor')
      .then(response => {
        if (response.data.length !== 0)
        {
          setColorHandler(response.data[0])
        }
      })
  }, [])

  const colorSubmit = async (e) => {
    e.preventDefault();

    await axios.post('https://photobooth-gdrive.onrender.com/updateColor', colorHandler)
    .then(response => {
        console.log(response);
    })
  }

  return (
    <>
      <NavBar colorHandler={colorHandler} setColorHandler={setColorHandler} colorSubmit={colorSubmit} />
      <MainPage bodyColor={colorHandler.bodyColor} />
    </>
  )
}

export default App;
