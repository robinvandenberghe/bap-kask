import { makeAutoObservable } from 'mobx';
import React, { useContext, createContext } from 'react';

class Content {
  constructor(object = undefined) {
    this.object = object;
    makeAutoObservable(this);
  }
  setObject = (val) => this.object = val;
}
const objectClass = new Content();
const objectContext = createContext(objectClass);
export const useObject = () => useContext(objectContext);