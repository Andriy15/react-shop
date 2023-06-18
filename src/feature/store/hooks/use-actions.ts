import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {bucketActions} from "../slice";

const actions = {
  ...bucketActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}