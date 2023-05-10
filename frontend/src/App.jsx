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
    axios.get('getColor')
      .then(response => {
        if (response.data.length !== 0)
        {
          setColorHandler(response.data[0])
        }
      })
  }, [])

  const colorSubmit = async (e) => {
    e.preventDefault();

    await axios.post('updateColor', colorHandler)
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
