import React, { useState } from "react";
import Icon from "../icons/Icons";
import Menu from "./Menu";
import { handleStateEvent } from "../../utils/events";
import DropDown from "../DropDown";

const styles = {
  header: "flex flex-col items-center border-r w-16 justify-between h-[100vh]",
  userIcon:
    "text-gray-500 hover:bg-gray-300 cursor-pointer rounded-md p-1 mx-1",
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleClick = (e: React.MouseEvent<MouseEvent & HTMLDivElement>) =>
    handleStateEvent(e, setOpen(!open)!);

  return (
    <header className={styles.header}>
      <Menu />
      <div className='flex items-center'>
        <div onClick={handleClick}>
          <Icon iconKey='user' className={styles.userIcon} />
          <DropDown className={`${open ? "visible" : "invisible"}`} />
          <div
            className={`absolute top-0 left-0 h-[100vh] w-[100vw] z-50 ${open ? "visible" : "invisible"
              }`}
            onClick={handleClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
