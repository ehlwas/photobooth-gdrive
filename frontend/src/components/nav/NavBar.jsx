import { useState, useEffect } from 'react'
import axios from 'axios'

import './navbar.css'

const NavBar = (props) => {

    const { colorHandler, setColorHandler, colorSubmit } = props 

    const navColorChanged = (e) => {
        setColorHandler(
            {
                ...colorHandler,
                navColor: e.target.value
            }
        )
    }
    const bodyColorChanged = (e) => {
        setColorHandler(
            {
                ...colorHandler,
                bodyColor: e.target.value
            }
        )
    }

    const [displayColor, setDisplayColor] = useState(false)
    const [logoHandler, setLogoHandler] = useState({})

    useEffect(() => {
        getLogo()
      }, []);

    const getLogo = async () => {
        await axios.get('getLogo')
          .then(response => {
            setLogoHandler(response.data[0]);
          })
          .catch(error => {
              console.error(error);
          });
    }

    const uploadImage = async (e) => {
        e.preventDefault();

        const formElem = document.querySelector('#form-logo');
        // const data = new FormData(formElem)
        console.log(formElem)
        await axios.post('uploadLogo', formElem)
        .then(response => {
            console.log(response);
            getLogo();
        })
    }

    return (
        <>
            <nav className={!colorHandler.navColor ? "navbar navbar-dark bg-dark" : "navbar"} style={{ backgroundColor: colorHandler.navColor }}>
                <div className="navbar-brand">
                    {logoHandler && <img src={"https://drive.google.com/uc?export=view&id=" + logoHandler.id} width="100" height="50" alt="logo" />}
                </div>
                <div className="form-inline my-2 my-lg-0">
                    <button onClick={() => setDisplayColor(!displayColor)} className="btn btn-secondary my-2 my-sm-0" type="submit">Edit</button>
                    {displayColor && 
                    <div className="position-absolute end-0 edit-dropdown">
                        <form onSubmit={colorSubmit}>
                        <>
                            <input type="color" name="color" id="color" value={colorHandler.navColor} onChange={navColorChanged}/>
                            <label for="head">NavBar</label>
                        </>
                        <>
                            <input type="color" name="color" id="color" value={colorHandler.bodyColor} onChange={bodyColorChanged}/>
                            <label for="head">Body</label>
                        </>
                            <button type="submit">Update Color</button>
                        </form>
                        <form onSubmit={uploadImage} id="form-logo">
                            <input type="file" name="Files" multiple />
                            <button type="submit">Upload</button>
                        </form>
                    </div>}
                </div>
            </nav>
        </>
    )
}

export default NavBar