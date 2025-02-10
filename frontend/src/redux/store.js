import authReducer from './authSlice';  // ✅ Clear name for reducer
import expenseReducer from './expenseSlice';
 import {  combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
import { } from 'redux-persist/integration/react'
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer=combineReducers({
    auth: authReducer,  
     expense: expenseReducer
    
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
//   reducer: {
//     auth: authReducer,  //
//     expense: expenseReducer
//   }
reducer: persistedReducer,
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;



// import { configureStore } from "@reduxjs/toolkit";
// import authSlice from './authSlice'
// import expenseSlice from './expenseSlice'

// const store=configureStore({
//     reducer:{
//         auth:authSlice,
//         expense:expenseSlice
//     }
// })

// export default store;