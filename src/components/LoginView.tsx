'use client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useAuthenticationLogic from '../hooks/useAuthenLogic'
import { setCookie } from 'nookies'
import {
  CURRENT_USER_COOKIE,
  SUPABASE_ACCESS_TOKEN_COOKIE,
  SUPABASE_REFRESH_TOKEN_COOKIE
} from '../../ultilities/enum'
import { Button, Input, Spinner } from '@material-tailwind/react'
import supabase from '../../supabase'

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

    if (!result?.user) {
      return console.log('Missing user data from Supabase session')
    }

    if (!result?.session?.access_token || !result?.session?.refresh_token) {
      return console.log('Missing session tokens from Supabase auth response')
    }

    console.log('[LoginView] Setting cookies...')
    setCookie(
      null,
      CURRENT_USER_COOKIE,
      JSON.stringify(result.user).toString(),
      {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      }
    )
    console.log('[LoginView] User cookie set')

    setCookie(null, SUPABASE_ACCESS_TOKEN_COOKIE, result.session.access_token, {
      maxAge: result.session.expires_in,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })
    console.log(
      '[LoginView] Access token cookie set:',
      result.session.access_token.substring(0, 20) + '...'
    )

    setCookie(
      null,
      SUPABASE_REFRESH_TOKEN_COOKIE,
      result.session.refresh_token,
      {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      }
    )
    console.log('[LoginView] Refresh token cookie set')

    // Update Supabase client session so AuthContext detects it
    await supabase.auth.setSession(result.session)
    console.log('[LoginView] Supabase session set')

    // Use window.location for full page reload so middleware can see cookies
    console.log('[LoginView] Redirecting to /customer')
    return (window.location.href = '/customer')
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
