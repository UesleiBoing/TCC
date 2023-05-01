import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useField } from '@unform/core';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import { handleMouseOutImage } from './hooks/handleMouseOutImage';
import { handleMouseOverImage } from './hooks/handleMouseOverImage';
import IDropzoneProps from './IDropzoneProps';
import { Container, Error, Gallery, GalleryPhotoSection, ImgDropped } from './styles';


interface InputRefProps extends HTMLInputElement {
    acceptedFiles: File[];
}

const Dropzone: React.FC<IDropzoneProps> = ({ 
    description, 
    onFileUploaded, 
    name, 
    preLoaded, 
    gallery = true, 
    multiple = true
}) => {
    const inputRef = useRef<InputRefProps>(null);
    const { fieldName, registerField, error, defaultValue = [] } = useField(name || 'dropzone');

    const [selectedFileUrl, setSelectedFileUrl] = useState<String[]>([]);
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>(defaultValue);
    
    const dropzoneField = document.querySelector<HTMLElement>('#dropzone-field');
    const dropzoneImageMouse = document.querySelector<HTMLImageElement>('#dropzone-image-mouse');

    const handleMouseOver = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => {
            handleMouseOverImage(e, dropzoneField, dropzoneImageMouse)
        }, [dropzoneImageMouse, dropzoneField]
    );

    const handleMouseOut = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => {
            handleMouseOutImage(dropzoneField, dropzoneImageMouse)
        }, [dropzoneImageMouse, dropzoneField]
    );

    const onDrop = useCallback((acceptedFiles: any) => {
        if (inputRef.current) {
            inputRef.current.acceptedFiles = acceptedFiles;

            setSelectedFileUrl(
                acceptedFiles.map((file:any) => URL.createObjectURL(file))
            );
            const file = acceptedFiles[0];
            
            onFileUploaded(file);
        }
    }, [onFileUploaded]);

    const { getRootProps, getInputProps } = useDropzone({ 
        onDrop,
        accept: {
            'image': ['image/png', 'image/jpg', 'image/jpeg'],
        }
    })    

    useEffect(() => {
        registerField({
        name: fieldName,
        ref: inputRef.current,
        getValue: (ref: InputRefProps) => {
            return ref.acceptedFiles || [];
        },
        clearValue: (ref: InputRefProps) => {
            ref.acceptedFiles = [];
            setAcceptedFiles([]);
        },
        setValue: (ref: InputRefProps, value) => {
            ref.acceptedFiles = value;
            setAcceptedFiles(value);
        },
        });
    }, [fieldName, registerField]);

    return (
        <>
            <Container {...getRootProps()} onClick={() => inputRef.current?.click()}>
                <input {...getInputProps()} 
                    accept="image/png, image/jpg, image/jpeg" 
                    ref={inputRef}
                    multiple={multiple}
                />

                <p id="dropzone-field">
                    <FiUpload />
                    {description || 'Imagem do Estabelecimento'}
                </p>           

                <img id="dropzone-image-mouse" src="" alt="" />
            </Container>
            
            {
                error && 
                <Error>
                    <p>
                        {error}
                    </p>
                </Error>
            }


            {
                gallery && 
                inputRef.current?.acceptedFiles && 
                selectedFileUrl.length > 0 && 
                <Gallery>
                    <h4>Imagens Selecionadas</h4>

                    <GalleryPhotoSection>
                        {selectedFileUrl.map((image, index) => (
                            <ImgDropped 
                                key={index} 
                                src={String(image)} 
                                alt={`Imagem do Produto ${index}`} 
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                            />
                        ))}
                    </GalleryPhotoSection>

                </Gallery>     
            }
            {
                gallery && 
                inputRef.current?.acceptedFiles && 
                selectedFileUrl.length > 0 && 
                preLoaded && 
                preLoaded.length > 0 &&
                <hr></hr>
            }
            {
                gallery && 
                preLoaded && 
                preLoaded.length > 0 && 
                <Gallery>
                    <h4>Fotos Atuais</h4>
                    <GalleryPhotoSection>
                        {preLoaded.map((image, index) => (
                            <ImgDropped 
                                key={index} 
                                src={image.src} 
                                alt={image.src}  
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                            />
                        ))}
                    </GalleryPhotoSection>

                </Gallery>     
            }
        </>
    )
};

export default Dropzone; 