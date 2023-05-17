import IntroLogo from "./components/intrologo/IntroLogo"
import Camera from "./components/camera/Camera"
import Gallery from "./components/gallery/Gallery"

import { useState, useEffect } from "react"
import axios from 'axios'

function App() {
  useEffect(() => {
    refresh()
  }, [])

  // CAMERA AND PREVIEW COMPONENT FUNCTIONS



  // GALLERY COMPONENT FUNCTIONS
  const [data, setData] = useState([]);
    
  const deleteImage = async (id) => {
    await axios.delete(`http://localhost:8080/delete/${id}`)
      .then(response => {
        console.log(response)
        refresh()
      })
  }

  const refresh = () => {
    axios.get('http://localhost:8080/list')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
      <div>
        <IntroLogo />
        <Camera />
        {/* <Gallery data={data} deleteImage={deleteImage} /> */}
      </div>
    </>
  )
}

export default App;
