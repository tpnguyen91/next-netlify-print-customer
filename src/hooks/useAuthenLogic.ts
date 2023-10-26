import firebase_app from '../../config'
import { signInWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
import { CURRENT_USER_COOKIE } from '../../ultilities/enum'
const useAuthenticationLogic = () => {
  const auth = getAuth(firebase_app)
  const router = useRouter()

  const signIn = async (email, password) => {
    let result = null,
      error = null
    try {
      result = await signInWithEmailAndPassword(auth, email, password)
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
      result = await signOut(auth)
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
