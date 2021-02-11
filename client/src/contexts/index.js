import { createContext } from "react";
import RootStore from "../store";

const store = new RootStore();
window.store = store;

export const storesContext = createContext(store);
