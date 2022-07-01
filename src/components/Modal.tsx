import React, { useEffect } from "react";

interface Props {
  children?: React.ReactNode;
  customFooter?: React.ReactNode;
  closable?: boolean;
  loading?: boolean;
  onCancel?: any;
  cancelText?: string;
  visible: boolean;
}

const styles = {
  modalBackdrop:
    "fixed top-0 left-0  z-20 h-[100vh] min-w-[100vw] backdrop-blur-sm appear bg-gray-300 bg-opacity-75",
  modalBody: "flex flex-col justify-center w-[100vw] items-center h-full"
};

const Modal = ({
  children,
  customFooter = undefined,
  loading = false,
  cancelText = "Cancel",
  onCancel = () => { },
  visible = false,
}: Props) => {
  const [open, setOpen] = React.useState(visible ? visible : false);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  const footerContent = customFooter ? (
    customFooter
  ) : (
    <section>
      <button onClick={onCancel} disabled={loading}>
        {cancelText}
      </button>
    </section>
  );

  return (
    <section hidden={!open} className={styles.modalBackdrop}>
      <div
        className={styles.modalBody}
      >
        {children}
        {footerContent}
      </div>
    </section>
  );
};
export default Modal;
