import supabase from '../../supabase'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
import {
  CURRENT_USER_COOKIE,
  SUPABASE_ACCESS_TOKEN_COOKIE,
  SUPABASE_REFRESH_TOKEN_COOKIE
} from '../../ultilities/enum'
const useAuthenticationLogic = () => {
  const router = useRouter()

  const signIn = async (email, password) => {
    let result = null,
      error = null
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password
        }
      )

      if (authError) {
        throw authError
      }

      result = data
    } catch (e) {
      error = e
    }
    return { result, error }
  }

  const logOut = async () => {
    let result = null,
      error = null
    try {
      destroyCookie(null, CURRENT_USER_COOKIE)
      destroyCookie(null, SUPABASE_ACCESS_TOKEN_COOKIE)
      destroyCookie(null, SUPABASE_REFRESH_TOKEN_COOKIE)
      const { error: authError } = await supabase.auth.signOut()
      if (authError) {
        throw authError
      }
      result = true
      router.push('/login')
    } catch (e) {
      error = e
    }
    return { result, error }
  }

  return {
    signIn,
    logOut
  }
}

export default useAuthenticationLogic
