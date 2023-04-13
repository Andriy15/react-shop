import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const LS_REACT_KEY = 'product'

interface BucketState {
  data: { id: number, title: string }[]
}

const initialState: BucketState = {
  data: JSON.parse(localStorage.getItem(LS_REACT_KEY) ?? '[]')
}

export const bucketSlice = createSlice({
  name: 'bucket',
  initialState,
  reducers: {
    addToBucket(state, action: PayloadAction<{ id: any, title: string, image: string, price: string, category: string }>) {
      state.data.push(action.payload)
      localStorage.setItem(LS_REACT_KEY, JSON.stringify(state.data))
    },

    removeBucket(state, action: PayloadAction<{ id: any, title: string, image: string, price: string, category: string}>) {
      state.data = state.data.filter(p => p.id !== action.payload.id)
      localStorage.setItem(LS_REACT_KEY, JSON.stringify(state.data))
    }
  }
})

export const bucketActions = bucketSlice.actions
export const bucketReducer = bucketSlice.reducer