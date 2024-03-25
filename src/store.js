import { atom } from "jotai";

export const pageVarsAtom = atom({});

export const addPageVarAtom = atom(
  null, // it's a convention to pass `null` for the first argument
  (get, set, pageVar) => {
    // `update` is any single value we receive for updating this atom
    // set(priceAtom, get(priceAtom) - update.discount)
    // or we can pass a function as the second parameter
    // the function will be invoked,
    //  receiving the atom's current value as its first parameter
    set(pageVarsAtom, (prev) => ({ ...prev, [pageVar.key]: pageVar.value }));
  }
);

export const pageLoadedAtom = atom(false);
