

const Gallery = (props) => {

    

    return (
        <>
            <div className='col d-flex align-content-start flex-wrap'>
            {props.data.map(item => (
                <p key={item.id} className='position-relative mx-1'>
                    <button className='btn btn-info btn-sm position-absolute end-0' onClick={() => props.deleteImage(item.id)}>X</button>
                    <img src={'https://drive.google.com/uc?export=view&id='+item.id} alt={item.name} width='150px'/>
                </p>
            ))}
            </div>
        </>
    )
}

export default Gallery;