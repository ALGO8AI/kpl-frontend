import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducer from "./RootReducer";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, RootReducer);

export const Store = createStore(
  // persistedReducer,
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(Store);
