import {configureStore} from "@reduxjs/toolkit";
import {bucketReducer} from "./slice";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    bucket: bucketReducer,
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>