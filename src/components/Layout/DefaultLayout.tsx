import React, { FC, ReactNode, useState } from 'react'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton
} from '@material-tailwind/react'
import useAuthenticationLogic from '../../hooks/useAuthenLogic'
import Link from 'next/link'
import { routingPage } from '../../../ultilities/path'
import { useRouter } from 'next/router'

const DefaultLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const [openNav, setOpenNav] = React.useState(false)
  const { logOut } = useAuthenticationLogic()
  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    )
  }, [])

  console.log('router.pathname', router.pathname)

  const navList = (
    <>
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-1 font-normal text-lg ${
            router.pathname === routingPage.CUSTOMER_PAGE
              ? 'text-blue-500 underline font-bold'
              : ''
          }`}>
          <Link href={routingPage.CUSTOMER_PAGE}>
            <a href="#" className="flex items-center">
              Danh sách khách hàng
            </a>
          </Link>
        </Typography>
      </ul>
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-1 font-normal text-lg ${
            router.pathname === routingPage.GHN_PAGE
              ? 'text-blue-500 underline font-bold'
              : ''
          }`}>
          <Link href={routingPage.GHN_PAGE}>
            <a href="#" className="flex items-center">
              Giao hàng nhanh
            </a>
          </Link>
        </Typography>
      </ul>
    </>
  )

  return (
    <div className="bg-[#f8fafc] h-screen w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex flex-row items-center">
            <img
              src="https://flowbite.s3.amazonaws.com/logo.svg"
              className="mr-1 h-8"
              alt="CMS 2359 Logo"
            />
            <Typography
              as="a"
              href="#"
              textGradient
              variant="h4"
              className="mr-4 text-blue-500 cursor-pointer py-1.5 font-medium">
              CMS 2359
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            {navList}
            <Button
              onClick={logOut}
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block">
              <span>Thoát</span>
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}>
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {/* {navList} */}
          <Button
            onClick={logOut}
            variant="gradient"
            size="sm"
            fullWidth
            className="mb-2">
            <span>Thoát</span>
          </Button>
        </MobileNav>
      </Navbar>
      <div className="mx-8 pt-12">{children}</div>
    </div>
  )
}

export default DefaultLayout
