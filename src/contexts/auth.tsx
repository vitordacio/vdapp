import React, { createContext, useContext, useState } from 'react';
import * as auth from '@services/auth';
// import api from '@services/api';

interface IAuthContextData {
  loading: boolean;
  signed: boolean;
  user: object | null;
  SignIn(): Promise<void>;
  SignOut(): void;
}

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
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

  const SignIn = async () => {
    const response = await auth.SignIn();
    console.log('auth context', response);
    // const { token, user } = response;
    setUser(response.user);
    console.log(user);

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
      value={{ loading, signed: !!user, user, SignIn, SignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export default useAuth;
