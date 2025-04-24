"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ActiveLink from "./ActiveLink";
import CartIcon from "./cart/CartIcon";

export default function Header() {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Delay closing slightly to let toggleMenu handle button clicks properly
      setTimeout(() => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsMenuOpen(false);
        }
      }, 10);
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Menu items configuration
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Cart", href: "/cart" },
    // { name: "Contact", href: "#" },
  ];

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };


  return (
    <nav className="z-10 max-w-full fixed top-0 left-0 w-full bg-white p-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="md:hidden">
          <CartIcon/>
        </div>
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-3xl italic whitespace-nowrap text-blue-600">
            AutoMart
          </span>
        </a>
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-blue-500 rounded-lg md:hidden hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-blue-600 dark:hover:bg-blue-100 dark:focus:ring-blue-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          ref={menuRef}
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto absolute top-full left-0 md:relative md:top-0 md:left-0`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-row space-x-5 w-full md:p-0 m-0 md:mt-0 rounded-md bg-gray-50 md:flex-row rtl:space-x-reverse md:border-0">
            {menuItems.map((item, key) => (
              <li 
                key={key} 
                className="flex-1 flex items-center justify-center h-30 w-30"
              >
                {item.name === "Cart" &&  
                  <div className="hidden md:block absolute -top-9 -right-8">
                    <CartIcon />
                  </div>
                }
                <ActiveLink
                  href={item.href}
                  activeClassName="text-blue-500 md:text-blue-500 bg-blue-200 dark:text-black w-full"
                  className="block w-full h-full rounded text-gray-900 md:text-blue-500 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-blue-600 md:dark:hover:bg-transparent group-hover:text-blue-500 group-hover:bg-blue-100" // Applying color change on group hover
                  onClick={handleMenuItemClick} // Close the menu when an item is clicked
                >
                  {item.name === "Cart" ? <Image src="/assets/cart/image.png" alt="cart icon" width={30} height={30}/> : item.name}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>


      </div>
    </nav>
  );
}
