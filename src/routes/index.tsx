import React from 'react';
import useAuth from '@contexts/auth';
import { LoadingView } from '@components/View/Loading';
import RoutesView from '@components/View/Routes';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { signed, loading, user } = useAuth();

  if (loading) {
    return <LoadingView />;
  }

  return (
    <RoutesView>
      {signed ? <AppRoutes user={user} /> : <AuthRoutes />}
    </RoutesView>
  );
};

export default Routes;
