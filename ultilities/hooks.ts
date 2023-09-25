import firebase_app from '../config'
import { signInWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'

const useAuthenticationLogic = () => {
  const auth = getAuth(firebase_app)

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
      result = await signOut(auth)
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
