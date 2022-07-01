import { handleStateEvent } from "@/utils/events";
import Link from "next/link";
import React, { useState } from "react";
import HorizontalMenuIcon from "../icons/icon-menu-hor";

const styles = {
  link: "text-4xl hover:underline cursor-pointer",
  nav: "absolute -top-2 left-0 w-96 py-2 px-2 reveal z-50",
  modalBackdrop:
    "w-[100vw] h-[100vh] absolute -top-2  bg-opacity-40 bg-gray-200 backdrop-blur-sm z-50 ",
  menuDots:
    "flex flex-col justify-center ml-2 leading-none hover:cursor-pointer hover:bg-gray-200 p-1 pb-2 rounded-md",
};

const Menu = () => {
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<MouseEvent & HTMLDivElement>) =>
    handleStateEvent(e, setOpen(!open)!);

  return (
    <section className='relative'>
      <div className='flex items-center'>
        <div className={styles.menuDots} onClick={handleClick}>
          <HorizontalMenuIcon />
          <HorizontalMenuIcon />
          <HorizontalMenuIcon />
        </div>
      </div>
      {open ? (
        <>
          <div className={styles.modalBackdrop} onClick={handleClick} />

          <div className={styles.nav} onClick={handleClick}>
            <Link href='/'>
              <h1 className={styles.link}>Home</h1>
            </Link>
            <Link href='/music'>
              <h1 className={styles.link}>About</h1>
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default Menu;
