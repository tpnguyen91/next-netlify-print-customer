import firebase_app from '../../config'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { ICustomerType } from '../../ultilities/types'
import { ENUM_TABLES } from '../../ultilities/enum'

const useCustomerCRUDLogic = () => {
  const db = getFirestore(firebase_app)
  const getAllCustomers = async () => {
    const querySnapshot = await getDocs(collection(db, ENUM_TABLES.CUSTOMERS))
    let listValues = []
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
      listValues.push({ id: doc.id, ...doc.data() })
    })
    return Promise.resolve(listValues)
  }

  const addNewCustomer = async (customer: ICustomerType) => {
    return await addDoc(collection(db, ENUM_TABLES.CUSTOMERS), customer)
  }

  const updateCustomer = async (customer: ICustomerType, id: string) => {
    const docRef = doc(db, ENUM_TABLES.CUSTOMERS, id)
    return await updateDoc(docRef, {
      ...customer
    })
  }

  const deleteCustomer = async (id: string) => {
    return await deleteDoc(doc(db, ENUM_TABLES.CUSTOMERS, id))
  }

  return {
    getAllCustomers,
    addNewCustomer,
    updateCustomer,
    deleteCustomer
  }
}

export default useCustomerCRUDLogic
