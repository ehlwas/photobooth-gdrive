import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Webcam from 'react-webcam'
import './main.css'

function MainPage() {
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
  
    const formSubmit = async (e) => {
  
        const base64String = imgCon;
        const blob = await base64ToBlob(base64String);
    
        const formData = new FormData();
        formData.append("file", blob, "image.png");
    
        e.preventDefault();

        await axios.post('upload', formData)
        .then(response => {
            console.log(response);
            refresh()
        })
    }
  
    useEffect(() => {
      axios.get('list')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    
    const refresh = () => {
      axios.get('list')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }
  
    const webRef = useRef(null)
    const [imgCon, setImgCon] = useState('')
  
    const captureImg = () => {
        console.log(webRef.current.getScreenshot())
        setImgCon(webRef.current.getScreenshot());
    }
  
    return (
        <div className='container'>
            <div className='row'>
                <div className='col capture-img'>
                <Webcam ref={webRef} />
                <button className='btn btn-secondary' onClick={captureImg}>Capture</button>
                <button className='btn btn-primary' onClick={formSubmit}>Submit</button>
                {imgCon && <img name="Files" src={imgCon} alt='prev-img' />}
                </div>

                <div className='col d-flex align-content-start flex-wrap gallery-img'>
                {data.map(item => (
                    <p key={item.id}><img src={'https://drive.google.com/uc?export=view&id='+item.id} alt={item.name} width='150px'/></p>
                ))}
                </div>
            </div>
        </div>
    );
}

export default MainPage;