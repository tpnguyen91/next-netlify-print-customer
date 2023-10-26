'use client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useAuthenticationLogic from '../hooks/useAuthenLogic'
import { setCookie } from 'nookies'
import { CURRENT_USER_COOKIE } from '../../ultilities/enum'
import { Button, Input, Spinner } from '@material-tailwind/react'

function LoginView(props) {
  const { signIn } = useAuthenticationLogic()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleForm = async (event) => {
    event.preventDefault()
    setLoading(true)
    const { result, error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      return console.log(error)
    }
    // else successful
    console.log(result)
    setCookie(
      null,
      CURRENT_USER_COOKIE,
      JSON.stringify(result.user).toString(),
      {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      }
    )

    return router.push('/')
  }

  return (
    <div className="h-full bg-white">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            CMS 2359
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleForm} className="space-y-6">
            <div>
              <div className="mt-2">
                <Input
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  color="blue"
                  crossOrigin="anonymous"
                  label="Email"
                  className="pl-[8px]"
                  required
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <Input
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  color="blue"
                  type="password"
                  crossOrigin="anonymous"
                  label="Mật khẩu"
                  className="pl-[8px]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                color="blue"
                disabled={loading}
                className="flex items-center gap-3"
                type="submit"
                size="lg">
                {loading && <Spinner className="h-4 w-4" color="blue-gray" />}
                Đăng nhập
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginView
