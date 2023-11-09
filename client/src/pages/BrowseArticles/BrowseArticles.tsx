import React, { PropsWithChildren, useEffect } from 'react';
import styles from './BrowseArticles.modules.scss';
import { useGetUserQuery } from '../../store/api/userApi';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../store/slices/userSlice';
import { Header } from '../../components/Header/Header';

const BrowseArticles: React.FC<PropsWithChildren> = (props: any) => {
  const { data, error, isLoading, isSuccess } = useGetUserQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess)
      dispatch(
        userLoggedIn({
          sessionId: data.id,
          email: data.email
        })
      );
  }, [isSuccess]);

  return (
    <div>
      <Header />
      <div>Browse articles</div>
      <h1></h1>
    </div>
  );
};

export default BrowseArticles;
