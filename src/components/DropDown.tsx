import React from "react";

const styles = {
  container: "absolute z-20 left-2 bottom-12 bg-white border",
  listItem: "px-4 py-1 cursor-pointer hover:bg-gray-300",
}
interface DropDownProps {
  className: string;
}

const DropDown = ({ className }: DropDownProps) => {
  return (
    <div
      className={`${styles.container} ${className}`}
    >
      <ul className="">
        <li className={styles.listItem}>
          Account
        </li>
        <li className={styles.listItem}>Help</li>
        <li className={styles.listItem}>Logout</li>
      </ul>
    </div>

  );
};

export default DropDown;
