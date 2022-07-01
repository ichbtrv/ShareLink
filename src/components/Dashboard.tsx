import { FileContext } from "@/contexts/FileContext";
import React, { useContext } from "react";
import AudioPlay from "./player/AudioPlay";
import Upload from "./Upload";
import UploadedFiles from "./UploadedFiles";

const styles = {
  upload: "grid grid-cols-2 h-full",
  filesDisplay:
    "flex flex-col items-center min-w-[95vw] justify-center h-[100vh]",
};
const Dashboard = () => {
  const [files] = useContext(FileContext) ?? [];

  return (
    <div className={`${files ? styles.upload : styles.filesDisplay}`}>
      {!files ? <Upload /> : <AudioPlay />}
      {files && <UploadedFiles />}
    </div>
  );
};

export default Dashboard;
