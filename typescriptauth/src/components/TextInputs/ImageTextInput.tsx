import classNames from "classnames";
import { FormikErrors } from "formik";
import React, { useState } from "react";
import { IRegisterModel } from "../Register/types";
import './styles/style.css';



interface InputData 
{
    field: string,
    label: string,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: "file",
    error?: null | string,
    touched?: boolean,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<IRegisterModel>> | Promise<void>
}

const FormikImageTextInput :React.FC<InputData> = ({field, label, changeHandler, type="file", error, touched, setFieldValue}) => 
{
    const [srcImg, setSrc] = useState("https://bytes.ua/wp-content/uploads/2017/08/no-image.png");
    const [isDrag, setDrag] = useState(false);
    
    const onDrag = (e: React.DragEvent<HTMLImageElement>) => {
        e.preventDefault();
        setDrag(true);
    }

    const outDrop = (e: React.DragEvent<HTMLImageElement>) => {
        e.preventDefault();
        setDrag(false);
    }

    const onChangeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        ChangeFiles(e.target.files);
    }

    const onChangeFileHandlerTransfer = (e: React.DragEvent<HTMLImageElement>) => {
        e.preventDefault();
        ChangeFiles(e.dataTransfer.files);
    }

    const ChangeFiles = (files: FileList|null) => 
    {
        setDrag(false);
        if (files != null) {


            var file: File | null = null;

            if (files) {
                file = files[0];
            }
            if (file !== null) {
                var source = URL.createObjectURL(file);
                setSrc(source);
                setFieldValue('Image', file);
            }
        }
    }

    return (
        <div className={classNames("form-group", "mt-3")}>
        <div className="container">
            <div className="row">
                <div className="offset-md-4 col-md-4">
                    <label htmlFor={field} className="d-flex justify-content-center">
                        <img src={srcImg} width="200" height="200"
                        onDragOver={onDrag} onDrop={onChangeFileHandlerTransfer} onDragLeave={outDrop} onDragEnter={onDrag}
                         className={classNames(
                            {"default": !isDrag }, {"dragIn": isDrag})}/>
                    </label>

                    <input type="file" id={field} name={field} className="d-none" onChange={onChangeFileHandler}/>
                </div>
            </div>
        </div>
    </div>);
}

export default FormikImageTextInput;