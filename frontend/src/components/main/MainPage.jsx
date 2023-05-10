import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Webcam from 'react-webcam'
import './main.css'

function MainPage(props) {
    const { bodyColor } = props

    const [data, setData] = useState([]);

    const base64ToBlob = (base64String) => {
        const byteCharacters = atob(base64String.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: "image/png" }); 
    };
  
    const imageSubmit = async (e) => {
        const base64String = imgCon;
        const blob = await base64ToBlob(base64String);
    
        const formData = new FormData();
        formData.append("file", blob, "image.png");
    
        e.preventDefault();
        setLoadingCapture(true)

        await axios.post('https://photobooth-gdrive.onrender.com/upload', formData)
        .then(response => {
            console.log(response);
            setLoadingCapture(false)
            refresh()
        })
    }
  
    useEffect(() => {
      axios.get('https://photobooth-gdrive.onrender.com/list')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    
    const refresh = () => {
      axios.get('https://photobooth-gdrive.onrender.com/list')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }
  
    const webRef = useRef(null)
    const [imgCon, setImgCon] = useState('')
    const [loadingCapture, setLoadingCapture] = useState(false);
  
    const captureImg = () => {
        console.log(webRef.current.getScreenshot())
        setImgCon(webRef.current.getScreenshot());
    }

    const deleteImage = async (id) => {
        await axios.delete(`https://photobooth-gdrive.onrender.com/delete/${id}`)
            .then(response => {
                console.log(response)
                refresh()
            })
    }
  
    return (
        <div className='' style={{ backgroundColor: bodyColor }}>
            <div className='row'>
                <div className='col'>
                <Webcam ref={webRef} />
                <button className='btn btn-secondary' onClick={captureImg}>Capture</button>
                <button className='btn btn-primary' onClick={imageSubmit}>Submit</button>
                {loadingCapture && <p>Loading...</p>}
                {imgCon && <img name="Files" src={imgCon} alt='prev-img' />}
                </div>

                <div className='col d-flex align-content-start flex-wrap'>
                {data.map(item => (
                    <p key={item.id} className='position-relative mx-1'>
                        <button className='btn btn-info btn-sm position-absolute end-0' onClick={() => deleteImage(item.id)}>X</button>
                        <img src={'https://drive.google.com/uc?export=view&id='+item.id} alt={item.name} width='150px'/>
                    </p>
                ))}
                </div>
            </div>
        </div>
    );
}

export default MainPage;