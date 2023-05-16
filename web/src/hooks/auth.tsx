import React, { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
  isTeacher: boolean;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
  isTeacher: boolean;
}

interface IAuthContextData {
  user: IUser;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  isTeacher(): boolean;
  updateUser(user: IUser): void;
}

interface IRequestSignIn {
  email: string;
  password: string;
  isTeacher: boolean;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@TCC:token');
    const user = localStorage.getItem('@TCC:user');

    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password, isTeacher }: IRequestSignIn) => {

    let isTeacherLogin = isTeacher ? '?isTeacher=true' : '';
    const response = await api.post(`/login${isTeacherLogin}`, { email, password, isTeacher });
    const { token, user } = response.data;
   
    localStorage.setItem('@TCC:token', token);
    localStorage.setItem('@TCC:user', JSON.stringify(user));

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@TCC:token');
    localStorage.removeItem('@TCC:user');
    localStorage.removeItem('@TCC:settings');

    setData({} as IAuthState);
  }, []);
  
  const isTeacher = useCallback(() => {
    const user = localStorage.getItem('@TCC:user');
    
    if (user) {
      const userParsed = JSON.parse(user) as IUser;

      return !!userParsed.isTeacher;
    }

    return false;
  }, []);

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@TCC:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, isTeacher, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
