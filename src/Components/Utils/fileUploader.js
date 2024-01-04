import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { getRef, storage } from "../../firebase";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid"

const FileUpload = (props) => {

    const [isUploading, setIsUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [fileName, setFileName] = useState('');

    const uploadImage = (file) => {
        console.log("Imagem inserida");
        setIsUploading(true);
        console.log("Nomeando Imagem");
        const name = `${v4()}_${file.name}`;
        setFileName(name);
        props.filename(name)
        console.log("Iniciando o upload da imagem");
        console.log("Aguardando 500 milissegundos antes de carregar a imagem...");
        setTimeout(() => {
            const imageRef = getRef(storage, `${props.dir}/${name}`);
            uploadBytes(imageRef, file).then(() => {
                console.log("Imagem foi carregada com sucesso");
                getDownloadURL(imageRef)
                    .then(url => {
                        setFileUrl(url)
                    })
                setIsUploading(false);
            }).catch((error) => {
                setIsUploading(false);
                console.error("Error uploading image:", error);
            }); setIsUploading(false)
        }, 500);
    }


    return (
        <div>
            {!fileUrl ?
                <div>
                    <input type="file" accept="image/*" onChange={({ target: { files } }) => {
                        if(files[0]){
                            uploadImage(files[0]);
                        }
                    }} />
                    {isUploading && <CircularProgress thickness={7} style={{ color: '#E99898' }} />}
                </div>
                : null}

            {fileUrl ?
                <div className="image_upload_container">
                    <img
                        style={{
                            width: '100%'
                        }}
                        src={fileUrl}
                    >
                    </img>
                    <div className="remove" onClick={() => alert('remove')}>
                        Remover
                    </div>
                </div>
                : null}
        </div>
    )
}

export default FileUpload