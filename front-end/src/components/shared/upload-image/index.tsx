'use client'
import { DragEvent, useState } from "react";
import { Props } from "./types";
import { GrUpload } from "react-icons/gr";

import styles from  "./upload-image.module.css"

enum DragEventType {
  Drag = "drag",
  DragStart = "dragstart",
  DragEnd = "dragend",
  DragOver = "dragover",
  DragEnter = "dragenter",
  DragLeave = "dragleave",
  Drop = "drop"
}

const UploadImage = ({id, change}: Props) => {

  const [cssClassState, setCssClassState] = useState("upload-file");
  

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            if(fileReader.DONE && fileReader.result) {
                resolve(fileReader.result.toString())
            }
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

      const emitFile = async (file: File | null) => {
        if(file) {
          const base64 = await convertToBase64(file);
          if(change) {
              const img = base64.replace('data:image/jpeg;base64,','');
              change(img);
          }
        }
      }

      const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;
        if(files) {
          emitFile(files?.item(0));
        }
        
      };

      const uploadFileManagerHandler = (event:  DragEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if([DragEventType.DragOver.toString(), DragEventType.DragEnter.toString()].includes(event.type)) {
            setCssClassState("upload-file is-dragover")
        } else if([DragEventType.DragLeave.toString(), DragEventType.DragEnd.toString(), DragEventType.Drop.toString()].includes(event.type)) {
            setCssClassState("upload-file")
            if(DragEventType.Drop.toString() === event.type) {
              const files =  event.dataTransfer.files;
              if(files) {
                emitFile(files?.item(0));
              }
            }
        }
      }

       
    

    return <>
        <div className={styles["upload-file"]} 
            onDrag={(event: DragEvent<HTMLInputElement>) => uploadFileManagerHandler(event)}
            onDragStart={(event: DragEvent<HTMLInputElement>) => uploadFileManagerHandler(event)}
            onDragEnd={(event: DragEvent<HTMLInputElement>) => uploadFileManagerHandler(event)}
            onDragOver={(event: DragEvent<HTMLInputElement>) => uploadFileManagerHandler(event)}
            onDragEnter={(event: DragEvent<HTMLInputElement>) => uploadFileManagerHandler(event)}
            onDragLeave={(event: DragEvent<HTMLInputElement>) => uploadFileManagerHandler(event)}
            onDrop={(event: DragEvent<HTMLInputElement>) => uploadFileManagerHandler(event)}>
            <div className={styles["upload-file__container"]}>
                <input
                  id={id}
                  type="file"
                  className={styles["upload-file__control"]}
                  accept=".jpeg, .png, .jpg"
                  onChange={(event:  React.ChangeEvent<HTMLInputElement>) => { handleFileUpload(event)}} />
                  <GrUpload size={25} />
                <label htmlFor={id} className="pt-1">
                  <strong>Seleccione una imagen</strong>
                  <span> o arrastrela hacia el marco punteado</span>.
                </label>
            </div>
            <div className={styles["upload-file__uploading"]}>Uploading…</div>
            <div className={styles["upload-file__success"]}>Done!</div>
            <div className={styles["upload-file__error"]}>Error!.</div>

        </div>
    </>
};

export default UploadImage;