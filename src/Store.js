import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import userReducer from './reducers/userreducer'

const Store = configureStore({reducer:userReducer})
export default Store
