
import IFieldsSharedProps from "../IFieldsSharedProps";

interface IImages {
    src: string;
    alt: string;
}

type IDropzoneProps = {
    onFileUploaded: (file: File) => void ;
    description?: string;
    preLoaded?: IImages[];
    gallery?: boolean;
    multiple?: boolean;
    type?: 'dropzone';
}  & IFieldsSharedProps;

export default IDropzoneProps;
