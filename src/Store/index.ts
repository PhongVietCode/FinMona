import { record_api, user_api } from "@/Services/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { homeReducers, themeReducers, recordReducer } from "./reducers";

const reducers = combineReducers({
  // api: user_api.reducer,
  theme: themeReducers,
  home: homeReducers,
  record: recordReducer,
  [record_api.reducerPath]: record_api.reducer, // api slice
  [user_api.reducerPath]: user_api.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["theme"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([user_api.middleware, record_api.middleware]);
    return middlewares;
  },
});

// export type RootState = ReturnType<typeof store.getState>

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
