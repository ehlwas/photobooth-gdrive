import { useState, useRef } from 'react'
import Webcam from 'react-webcam'
import { AiOutlineCamera } from 'react-icons/ai'
import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs'

import './camera.css'

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);
  

const Camera = () => {
    const webRef = useRef(null)

    const [imgCon, setImgCon] = useState('')
    const [displayCount, setDisplayCount] = useState(false)
    const [countdown, setCountdown] = useState(5)

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const countdownFunction = async () => {
        let count = 5
        while (count > 0) {
            await delay(1000)
            setCountdown(e => e - 1)
            count--
            console.log(count)
        }
    }

    const captureImg = async () => {
        setDisplayCount(true)
        await countdownFunction()

        setImgCon(webRef.current.getScreenshot({width: 1280, height: 720}));

        await delay(1000)
        setCountdown(5)
        setDisplayCount(false)
    }

    return (
        <>
            <div className='camera-container'>
                <div className="camera text-center">
                    {displayCount && 
                    <div className='countdown position-fixed'>
                        <h2 className='countdown-text'>{countdown}</h2>
                    </div>}
                    {imgCon ? 
                    <>
                        <img className='webcam' name="Files" src={imgCon} alt='prev-img' />
                        <div>
                            <button className='btn btn-secondary mx-1 mt-3' onClick={() => setImgCon(null)}><BsHandThumbsDown /></button>
                            <button className='btn btn-primary mx-1 mt-3'><BsHandThumbsUp /></button>
                        </div>
                    </>
                    :
                    <>
                        <Webcam className='webcam' ref={webRef} videoConstraints={videoConstraints} height={720} width={1280}/>
                        <div>
                            <button className='btn btn-primary mt-3' onClick={() => captureImg()}><AiOutlineCamera /></button>
                        </div>
                    </>}
                </div>
            </div>
        </>
    )
}

export default Camera;