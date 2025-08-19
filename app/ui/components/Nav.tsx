'use client'
import { useStore } from '@/app/store/userStore'
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Nav() {

  const { user } = useStore()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      console.log(data)
      if (res.status === 200) {
        useStore.getState().setUser({
          username: data.username,
          email: data.email,
          avator: data.avator,
          id: data.id
        })
      } else {
        useStore.getState().setUser(null)
      }
    }
    fetchUser() // 调用
  }, [])

  const logOut = async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    useStore.getState().setUser(null)
  }

  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className="relative bg-white shadow-xs data-open:fixed data-open:inset-0 data-open:z-40 data-open:overflow-y-auto lg:overflow-y-visible data-open:lg:overflow-y-visible dark:bg-gray-800/50 dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10 dark:data-open:after:absolute dark:data-open:after:inset-x-0 dark:data-open:after:bottom-0"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
            <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
              <div className="flex shrink-0 items-center">
                <Link href="/">
                  <img
                    alt="logo"
                    src="/logo.png"
                    className="h-12 w-auto"
                  />
                </Link>
              </div>
            </div>

            <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
              <div className="flex items-center px-6 py-3.5 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                <div className="grid w-full grid-cols-1">
                  <input
                    name="search"
                    placeholder="Search"
                    className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
              {/* Mobile menu button */}
              <PopoverButton className="group relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white dark:focus:outline-indigo-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </PopoverButton>
            </div>
            <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
              <div className="flex items-center">
                <Link href="/">
                  <HomeIcon className="mr-4 h-6 w-6 text-gray-500" />
                </Link>
              </div>
              {/* Profile dropdown */}
              <Menu as="div" className={clsx(!user && "hidden",
                "relative ml-5 shrink-0"
              )}
              >
                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={user?.avator}
                    className="size-8 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                >
                  <MenuItem key="Dashboard">
                    <Link
                      href="/dashboard"
                      className={clsx(
                        "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                      )}
                    >
                      Dashboard
                    </Link>
                  </MenuItem>
                  <MenuItem key="logout">
                    <Link
                      href="#"
                      onClick={logOut}
                      className={clsx(
                        !user && "hidden",
                        "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                      )}
                    >
                      Log out
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
              {!!user &&
                <Link
                  href="/edit"
                  className="ml-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                >
                  New Article
                </Link>
              }
              {!user &&
                <Link
                  href="/login"
                  className="font-medium rounded-lg bg-indigo-600 block px-4 py-2 text-sm text-white data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                >
                  Login
                </Link>
              }
            </div>
          </div>
        </div>

        <PopoverPanel
          as="nav"
          aria-label="Global"
          className="absolute relative left-1/2 z-10 mt-2 w-full -translate-x-1/2 lg:hidden dark:bg-gray-900 dark:before:pointer-events-none dark:before:absolute dark:before:inset-0 dark:before:bg-gray-800/50"
        >
          <div className="relative border-t border-gray-200 pt-4 pb-3 dark:border-white/10">
            <div className={clsx(!user && "hidden", "mx-auto flex max-w-3xl items-center px-4 sm:px-6")}>
              <div className="shrink-0">
                <img
                  alt=""
                  src={user?.avator}
                  className="size-10 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5 dark:bg-gray-800 dark:outline-white/10"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">{user?.username}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user?.email}</div>
              </div>
            </div>
            <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
              <Link
                href="/dashboard"
                className={clsx(
                  !user && "hidden",
                  "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                )}
              >
                Dashboard
              </Link>
              <Link
                href="/login"
                className={clsx(
                  !!user && "hidden",
                  "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                )}
              >
                Login
              </Link>
              <Link
                href="#"
                onClick={logOut}
                className={clsx(
                  !user && "hidden",
                  "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5"
                )}
              >
                Log out
              </Link>
            </div>
          </div>
        </PopoverPanel>
      </Popover>
    </>
  )
}
