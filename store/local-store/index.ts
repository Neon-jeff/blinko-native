import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware'


export const local_store = new MMKV()

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return local_store.set(name, value)
  },
  getItem: (name) => {
    const value = local_store.getString(name)
    return value ?? null
  },
  removeItem: (name) => {
    return local_store.delete(name)
  },
}