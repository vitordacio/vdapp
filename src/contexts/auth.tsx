import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@config/api';
import { IUser } from '@interfaces/user';
import { storageService } from '@services/Storage';
import { userService } from '@services/User';
import { IAuthResponse, ILogin } from '@services/User/IUserService';

interface IAuthContextData {
  loading: boolean;
  signed: boolean;
  user: IUser | null;
  loginError: string | null;
  SignIn(data: ILogin): Promise<void>;
  SignOut(): void;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const loadStorageData = async () => {
      const storagedData =
        await storageService.getItem<IAuthResponse>('@Auth:data');

      if (storagedData) {
        setUser(storagedData.user);
        api.defaults.headers.common.Authorization = `Bearer ${storagedData.accessToken}`;
      }
      setLoading(false);
    };

    loadStorageData();
  }, []);

  const SignIn = async (data: ILogin) => {
    setLoginError(null);
    try {
      // const response = await Login(data);
      const response = await userService.login(data);
      storageService.setItem<IAuthResponse>('@Auth:data', response);
      const { accessToken, user: responseUser } = response;

      setUser(responseUser);
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
      setLoginError(error.response.data.message);
    }
  };

  const SignOut = () => {
    storageService.removeItem('@Auth:data');
    // storageService.removeItem('@Auth:user')
    // storageService.removeItem('@Auth:token')

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        signed: !!user,
        user,
        setUser,
        loginError,
        SignIn,
        SignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export default useAuth;
