/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react';

export type User = {
  data: {
    email: string;
    id: string;
    username: string;
  };
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export interface UserContextInterface {
  userData: User | null;
  setUserData: Dispatch<SetStateAction<User | null>>;
}

const defaultContext = {
  userData: {
    data: {
      email: '',
      id: '',
      username: '',
    },
  },
  setUserData: (userData: User) => {},
} as UserContextInterface;

export const UserContext = React.createContext(defaultContext);

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [userData, setUserData] = React.useState<User | null>({
    data: {
      email: '',
      id: '',
      username: '',
    },
  });
  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
}
