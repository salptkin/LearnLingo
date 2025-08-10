import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { configureStore } from "@reduxjs/toolkit";
import { authUserSlice } from "./sliceAuth";
import { filterSlice } from "./sliceFilter";

const persistConfig = {
  key: 'authUser',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    authUser: persistReducer(persistConfig, authUserSlice.reducer),
    filter: filterSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);