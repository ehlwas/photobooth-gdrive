import { useState, useEffect } from 'react'
import axios from 'axios'

import './intrologo.css'

const IntroLogo = () => {
    const [logoHandler, setLogoHandler] = useState({})
    const [isLogoExit, setIsLogoExit] = useState(false)

    useEffect(() => {
        getLogo()
    }, []);
    
    const getLogo = async () => {
        await axios.get('http://localhost:8080/getLogo')
          .then(response => {
            setLogoHandler(response.data[0]);
          })
          .catch(error => {
            console.error(error);
          });
    }

    return (
        <>
            <div className={isLogoExit ? 'logo-container position-fixed exit-logo' : 'logo-container position-fixed'} onClick={() => setIsLogoExit(e => !e)}>
                {logoHandler && <img src={"https://drive.google.com/uc?export=view&id=" + logoHandler.id} className='logo' alt="logo" />}
            </div>
        </>
    )
}

export default IntroLogo;