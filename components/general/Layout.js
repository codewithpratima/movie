import { useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import { BellIcon, ChartBarIcon, CogIcon } from "@heroicons/react/24/outline";

const user = {
  name: "Whitney Francis",
  email: "whitney.francis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
  {
    name: "Inboxes",
    href: "#",
    children: [
      { name: "Technical Support", href: "#" },
      { name: "Sales", href: "#" },
      { name: "General", href: "#" },
    ],
  },
  { name: "Reporting", href: "#", children: [] },
  { name: "Settings", href: "#", children: [] },
];

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: session, status } = useSession();

  const router = useRouter();
  const [tabs, SetTabss] = useState([
    {
      name: "Operations",
      code: "delete-product",
      href: "/admin/delete-product",
      icon: CogIcon,
      current: false,
    },
    {
      name: "Dashboard",
      code: "dashboard",
      href: "/admin/dashboard",
      icon: ChartBarIcon,
      current: false,
    },
  ]);

  useEffect(() => {
    if (router.pathname) {
      const routerPath = router.asPath;

      const updatedTabs = tabs.map((tab) => {
        const currentLhstTab = routerPath.split("/")[1];

        if (tab.code == currentLhstTab) {
          return { ...tab, current: true };
        } else {
          return { ...tab, current: false };
        }
      });

      SetTabss(updatedTabs);
    }
  }, [router.pathname]);

  const handleSignOut = () => {
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
    signOut({ callbackUrl: baseurl + "/login" });
  };

  return (
    <>
      <div className="flex h-screen flex-col parentComponent">
        <header className="relative flex h-16  flex-shrink-0 items-center bg-gray-800">
          <div className="hidden md:flex md:min-w-0 md:flex-1 md:items-center md:justify-between">
            <div className=" pl-4">
              <h2 className="w-full h-auto text-xl sm:text-2xl text-gray-200 font-extrabold py-0.5">
                <span className="text-white capitalize">
                  {process.env.PROJECT_NAME}{" "}
                </span>

                <span className="text-blue-300">Inventory App</span>
              </h2>
            </div>

            <div className="flex items-center md:pr-8 md:space-x-8 z-50">
              <span className="text-white text-sm"></span>
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex rounded-full gap-2 text-sm focus:outline-none">
                  <span className="sr-only">Open user menu</span>
                  <h2
                    onClick={() => signOut()}
                    className="bg-blue-800 text-white px-4 py-2 rounded"
                  >
                    Log Out
                  </h2>{" "}
                  <h2
                    className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleSignIn()}
                  >
                    Login
                  </h2>
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={handleSignOut}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            Sign Out
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <Transition.Root show={mobileMenuOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 md:hidden"
              onClose={setMobileMenuOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-600 sm:bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 z-40">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
                  enterFrom="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
                  enterTo="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
                  leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
                  leaveFrom="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
                  leaveTo="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
                >
                  <Dialog.Panel
                    className="fixed inset-0 z-40 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:w-full sm:max-w-sm sm:shadow-lg"
                    aria-label="Global"
                  >
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                      <a href="#">
                        <img
                          className="block h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=yellow&shade=500"
                          alt="Your Company"
                        />
                      </a>
                      <button
                        type="button"
                        className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close main menu</span>
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div className="max-w-8xl mx-auto mt-2 px-4 sm:px-6">
                      <div className="relative text-gray-400 focus-within:text-gray-500">
                        <label htmlFor="mobile-search" className="sr-only">
                          Search all inboxes
                        </label>
                        <input
                          id="mobile-search"
                          type="search"
                          placeholder="Search all inboxes"
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-yellow-500 focus:ring-yellow-500"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="max-w-8xl mx-auto py-3 px-2 sm:px-4">
                      {navigation.map((item) => (
                        <Fragment key={item.name}>
                          <a
                            href={item.href}
                            className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                          >
                            {item.name}
                          </a>
                          {item.children.map((child) => (
                            <a
                              key={child.name}
                              href={child.href}
                              className="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100"
                            >
                              {child.name}
                            </a>
                          ))}
                        </Fragment>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 pt-4 pb-3">
                      <div className="max-w-8xl mx-auto flex items-center px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" alt="" />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <div className="truncate text-base font-medium text-gray-800">
                            {user.name}
                          </div>
                          <div className="truncate text-sm font-medium text-gray-500">
                            {user.email}
                          </div>
                        </div>
                        <a
                          href="#"
                          className="ml-auto flex-shrink-0 bg-white p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </a>
                      </div>
                      <div className="max-w-8xl mx-auto mt-3 space-y-1 px-2 sm:px-4">
                        {userNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </header>

        {/* Bottom section */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Narrow sidebar*/}

          <div className="hidden md:fixed md:inset-y-0 md:flex md:w-32 md:flex-col pt-16">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-grow flex-col overflow-y-auto bg-gray-800">
              <div className=" flex flex-grow flex-col bg-white">
                <nav className="px-2 py-0">
                  {tabs.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`group flex w-full flex-col items-center px-2 py-2 mt-0.5 text-xs font-bold shadow-md
                      ${
                        !item.current &&
                        "text-gray-500 bg-gray-50 hover:bg-gray-200 hover:text-gray-700"
                      }
                      ${item.current && "bg-blue-900 text-white"}
                      ${index == 0 && "rounded-t-xl"}
                      ${index == tabs.length - 1 && "rounded-b-xl"}`}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-white"
                            : "text-gray-500 group-hover:text-gray-700",
                          "h-7 w-7"
                        )}
                        aria-hidden="true"
                      />
                      <span className="mt-1 text-xxxs w-full text-center">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>

                {/* <nav className="flex-1 px-2">
                  <div className="text-xs font-semibold leading-6 text-gray-400 text-left pt-1">
                    Processes
                  </div>
                </nav> */}
              </div>
            </div>
          </div>

          {/* Main area */}
          <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex md:pl-32 bg-gray-100">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
            >
              <h1 id="primary-heading" className="sr-only">
                Home
              </h1>
              {children}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
