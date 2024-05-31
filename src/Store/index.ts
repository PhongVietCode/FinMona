import { API, RECORD_API, TAG_API } from "@/Services/base";
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
import { editRecordReducer, homeReducers, themeReducers,userReducer,budgetReducer, notifiReducer } from "./reducers";

const reducers = combineReducers({
  [API.reducerPath]: API.reducer,
  theme: themeReducers,
  home: homeReducers,
  [TAG_API.reducerPath]: TAG_API.reducer,
  [RECORD_API.reducerPath]: RECORD_API.reducer,
  user: userReducer,
  editRecord: editRecordReducer,
  budget: budgetReducer, 
  notify: notifiReducer
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
    }).concat([API.middleware, TAG_API.middleware, RECORD_API.middleware]);
    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export { store, persistor };