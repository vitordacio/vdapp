import React, { createContext, useContext, useState } from 'react';
import { Login } from '@services/Auth/Login';
import api from '@config/api';
// import * as auth from '@services/auth';

interface ISignIn {
  email: string;
  password: string;
}

interface IAuthContextData {
  loading: boolean;
  signed: boolean;
  user: object | null;
  status: string | null;
  SignIn(data: ISignIn): Promise<void>;
  SignOut(): void;
}

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(()=>{
  //   const loadStorageData = () => {
  //     const storageUser = algumacoisa.getItem()
  //     const storagedToken =algumacoisa.getItem()

  //     if (storageUser && storagedToken){
  // api.defaults.headers.authorizations = `Bearer ${storagedToken}`

  //       setUser(JSON.parse(storageUser))
  // setLoading(false)
  //     }
  //   }

  //   loadStorageData()
  // }, [])

  const SignIn = async (data: ISignIn) => {
    setStatus(null);
    try {
      const response = await Login(data);
      const { accessToken, user: responseUser } = response.data;
      setUser(responseUser);
      api.defaults.headers.options.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
      setStatus(error.response.data.message);
    }
    // console.log('auth context', response);
    // console.log(response);
    // console.log(user);

    // api.defaults.headers.options.Authorization = `Bearer ${response.token}`;

    // set storage
    // algumacoisa.setItem('@Auth:user', JSON.stringify(response.user))
    // algumacoisa.setItem('@Auth:user', response.token)
  };

  const SignOut = () => {
    // clearstorage
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ loading, signed: !!user, user, SignIn, status, SignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export default useAuth;
