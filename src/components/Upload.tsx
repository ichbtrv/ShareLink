import { FileContext } from "@/contexts/FileContext";
import React, { useContext, useRef, useState } from "react";
import Icon from "./icons/Icons";

const styles = {
  uploadDragger:
    "cursor-pointer max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md",
  uploadDragged: "bg-gray-600",
};

function Upload({
  children,
}: // files,
  // setFiles,
  any) {
  const [classes, setClasses] = useState([styles.uploadDragger]);
  const [files, setFiles] = useContext(FileContext) ?? [];
  const uploaderRef = useRef<HTMLInputElement | null>(null);

  const draggedCssClass = styles.uploadDragged;

  const dragOver = (e: any) => {
    e.preventDefault();

    if (!classes.includes(draggedCssClass)) {
      let originalClasses = classes;
      originalClasses.push(draggedCssClass);
      setClasses(originalClasses);
    }
  };

  const dragEnter = (e: any) => {
    e.preventDefault();
    if (!classes.includes(draggedCssClass)) {
      let originalClasses = classes;
      originalClasses.push(draggedCssClass);
      setClasses(originalClasses);
    }
  };

  const dragLeave = (e: any) => {
    e.preventDefault();

    if (classes.includes(draggedCssClass)) {
      let newClasses = classes;

      for (let i = 0; i < newClasses.length; i++) {
        if (newClasses[i] === draggedCssClass) {
          newClasses.splice(i, 1);
        }
      }
      setClasses(newClasses);
    }
  };

  const fileDrop = (e: any) => {
    e.preventDefault();
    const newFiles = e.dataTransfer.files;

    if (setFiles)
      files ? setFiles([...files, ...newFiles]) : setFiles(newFiles);
  };

  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file: File | undefined = e.target.files![0];

    if (setFiles)
      files ? setFiles([...files, file!]) : setFiles([file!]);
  };

  return (
    <section
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      <label htmlFor='file-upload' className={classes.join(" ")}>
        <div className='formlayout__content-container-vertical'>
          <div className='flex flex-col gap-8 justify-evenly'>
            <div className='space-y-1 text-center'>
              <Icon iconKey='music' className='ver-center' />
              <div className='flex text-sm text-gray-600'>
                <span className='typography-text m-auto text-center'>
                  <p
                    className='typography-link text-blue-90 hover:underline cursor-pointer'
                    style={{ textDecoration: "none" }}
                  >
                    Upload a file
                  </p>{" "}
                  or drag and drop
                </span>
              </div>
              <span className='typography-text typography-text-secondary typography-text-small'>
                MP3, WAV, FLAC or AIFF
              </span>
            </div>
          </div>
        </div>

        <input
          id='file-upload'
          name='file-upload'
          type='file'
          className='sr-only'
          accept='
          .wav,.mp3,.flac,.aiff'
          onChange={fileUpload}
          ref={uploaderRef}
        />

        {children}
      </label>
    </section>
  );
}

export default Upload;
