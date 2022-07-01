import React, {
  Context,
  createContext,
  Dispatch,
} from "react";


export const FileContext: Context<
  [File[] | null, Dispatch<React.SetStateAction<File[] | null>>] | null
> = createContext<
  [File[] | null, React.Dispatch<React.SetStateAction<File[] | null>>] | null
>(null);
