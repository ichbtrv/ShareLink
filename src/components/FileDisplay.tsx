import React from "react";

interface UploadedFileProps {
  file?: File;
}

const styles = {
  container: "rounded-md w-96 bg-coolGray-10 border border-coolGray-30 hover:bg-coolGray-20 px-2 py-1 bg-opacity-50 hover:bg-opacity-60 hover:cursor-pointer my-1 text-teal-30 contrast-125"
}

const FileDisplay: React.FC<UploadedFileProps & JSX.IntrinsicElements["section"]> = ({ file }) => {
  return (
    <section className="w-96 appear">
      <div
        className={styles.container}
      >
        <h1>{file?.name}</h1>{" "}
        <p className="text-sm text-coolGray-70">
          {file!.size / 1000000} MB
        </p>
      </div>
    </section>
  );
};

export default FileDisplay;
