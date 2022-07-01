import { FileContext } from "@/contexts/FileContext";
import { handleStateEvent } from "@/utils/events";
import React, { useContext, useRef, useState } from "react";
import FileDisplay from "./FileDisplay";
import Modal from "./Modal";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

const styles = {
  container: "relative ml-4 pl-6 border-coolGrayHover-20  border-l flex flex-col",
  fileContainer: "rounded-md p-2 w-[25rem]",
  generateButton: "rounded-md w-48 ml-2 hover:bg-gray-800 hover:text-white fixed bottom-4 right-0",
  addTrackButton: "rounded-md w-36 ml-2 hover:bg-gray-800 hover:text-white text-left"
}

const UploadedFiles = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useContext(FileContext) ?? [];
  const [_fileUrls, setFileUrls] = useState<string>('');
  const [fileName, setFileName] = useState('');
  const uploaderRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleGenerate = (e: React.MouseEvent<MouseEvent & HTMLDivElement>) =>
    handleStateEvent(e, setIsGenerating(!isGenerating)!);

  async function uploadTo(_event: React.MouseEvent) {
    if (!files) return;
    if (files[0] === undefined) return;
    if (files[0] === null) return;

    setFileName(_prev => `${files[0]?.name.replace(/ /g, "")}`)

    try {
      setUploading(_prev => true);
      let { error: uploadError } = await supabase.storage
        .from("tracks")
        .upload(files[0].name.replace(/ /g, ""), files[0])

      if (uploadError) {
        throw uploadError
      }

      getBucket();

    } catch (error: any) {
      //Catch clause variable type annotation must be 'any' or 'unknown' if specified
      alert(error.message);
    } finally {
      setUploading(_prev => false);
    }

  }

  const getBucket = async () => {

    const { data } = await supabase
      .storage
      .from('tracks')
      .getPublicUrl(`${fileName}`)

    setFileUrls(_prev => data!.publicURL)

    const createSession = async () => {
      if (!files) return;
      if (files[0] === undefined) return;
      if (files[0] === null) return;

      const { data } = await supabase
        .from('upload_session')
        .insert([
          { "file_urls": `https://uerodvugvkynnbdioyue.supabase.co/storage/v1/object/public/tracks/${files[0].name.replace(/ /g, "")}` },
        ])
      console.log(data)
      router.push(`/upload_session/${data![0].id}`)
    }

    createSession();
  }




  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file: File | undefined = e.target.files![0];
    if (setFiles) files ? setFiles([...files, file!]) : setFiles([file!]);
  };

  return (
    <section className={styles.container}>
      <div className={styles.fileContainer}>
        <h1>Uploaded Files</h1>

        {files &&
          files.map((file: File) => (
            <FileDisplay key={file.name} file={file} />
          ))}
      </div>

      <button
        className={styles.addTrackButton}
        onClick={() => uploaderRef.current?.click()}
      >
        Add Track +{" "}
      </button>
      <input
        id='file-upload'
        name='file-upload'
        type='file'
        className='sr-only'
        onChange={fileUpload}
        ref={uploaderRef}
      />

      <div onClick={handleGenerate}>
        <button
          disabled={files === null || uploading}
          onClick={uploadTo}
          className={styles.generateButton}
        >
          Generate Link{" "}
        </button>
      </div>

      <Modal
        visible={isGenerating}
        closable
        onCancel={handleGenerate}
      >
        {uploading ? "Uploading please wait.." : "All Done"}
      </Modal>
    </section>
  );
};

export default UploadedFiles;
