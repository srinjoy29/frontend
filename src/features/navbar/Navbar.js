import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { selectUserInfo } from "../user/userSlice";
import { useTheme } from "../../context/ThemeContext";

const navigation = [
  { name: "Products", link: "/", user: true },
  { name: "Dashboard", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];

const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/my-orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ children }) {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const { darkMode, toggleDarkMode } = useTheme(" ");

  return (
    <>
      {userInfo && (
        <div className={`${darkMode ? "dark" : ""} min-h-full`}>
          <Disclosure as="nav" className="bg-gray-800 dark:bg-gray-100">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-20 items-center justify-between">
                    {/* Left Section: Logo */}
                    <div className="flex items-center">
                      <Link to="/">
                        <img
                          className="h-16 w-16"
                          src="/logo2.png"
                          alt="Your Company"
                        />
                      </Link>
                      {/* Navigation for larger screens */}
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map(
                            (item) =>
                              item[userInfo.role] && (
                                <Link
                                  key={item.name}
                                  to={item.link}
                                  className={classNames(
                                    "rounded-md px-3 py-2 text-xl font-medium",
                                    darkMode
                                      ? "text-gray-900 hover:bg-yellow-400"
                                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Section: User Info and Cart */}
                    <div className="hidden md:flex items-center space-x-4">
                      <Link to="/cart">
                        <button
                          type="button"
                          className={classNames(
                            "rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2",
                            darkMode
                              ? "bg-gray-200 text-gray-800 focus:ring-gray-300"
                              : "bg-gray-800 text-gray-400 hover:text-white focus:ring-white"
                          )}
                        >
                          <ShoppingCartIcon
                            className="h-8 w-8"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md bg-red-50 dark:bg-yellow-300 px-2 py-1 text-xs font-medium text-red-700 dark:text-blue-700  ring-1 ring-inset ring-red-600/10">
                          {items.length}
                        </span>
                      )}
                      <Menu as="div" className="relative">
                        <Menu.Button
                          className={classNames(
                            "flex items-center rounded-full text-sm focus:outline-none ",
                            darkMode
                              ? "bg-white text-gray-900"
                              : "bg-gray-800 text-white"
                          )}
                        >
                          <span className="sr-only">Open user menu</span>
                          <h1 className="rounded-md px-3 py-2 text-sm font-medium 0 bg-white dark:bg-blue-500 text-gray-800 dark:text-white  hover:bg-blue-700 dark:hover:bg-yellow-500 hover:text-white dark:hover:text-black">
                            User
                          </h1>
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                      <Disclosure.Button
                        className={classNames(
                          "inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-offset-2",
                          darkMode
                            ? "bg-gray-100 text-gray-900 focus:ring-gray-300"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-white"
                        )}
                      >
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map(
                      (item) =>
                        item[userInfo.role] && (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.link}
                            className={classNames(
                              "block rounded-md px-3 py-2 text-base font-medium",
                              darkMode
                                ? "text-gray-900 hover:bg-gray-200"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            )}
                          >
                            {item.name}
                          </Disclosure.Button>
                        )
                    )}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="bg-white shadow dark:bg-gray-800">
            <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                E-Commerce
              </h1>
              <button
                className="w-16 h-16 bg-gray-800 dark:bg-gray-200 rounded-full text-white dark:text-gray-900 font-semibold"
                onClick={toggleDarkMode}
              >
                {darkMode ? "LHT" : "DRK"}
              </button>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
              {children}
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default NavBar;
