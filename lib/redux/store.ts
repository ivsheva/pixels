"use client";
import { configureStore } from "@reduxjs/toolkit";
import disclosureReducer from "./features/disclosure/disclosureSlice";
import shotCreationReducer from "./features/shotCreation/shotCreationSlice";
import shotTextInfoReducer from "./features/shotText/shotTextInfo";
import shotLikesReducer from "./features/shotsLikes/shotsLikesSlice";
import favouritesReducer from "./features/favourites/favouritesSlice";

export const store = configureStore({
  reducer: {
    disclosure: disclosureReducer,
    shotTextInfo: shotTextInfoReducer,
    shotCreation: shotCreationReducer,
    shotLikes: shotLikesReducer,
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
