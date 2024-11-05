import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { logoutUser } from '@redux/user/userActions';
import useStorage from '@hooks/useStorage';
import request from '@api/request';
import { resetMapStateAction } from '@redux/map/mapActions';
import { routeList } from '@routes/routeList';
import useModal from '@hooks/useModal';

const LogoutContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { removeItem } = useStorage();
  const queryClient = useQueryClient();
  const { removeLastModal } = useModal();

  useEffect(() => {
    removeLastModal();
    dispatch(logoutUser());
    dispatch(resetMapStateAction());
    request.setToken(null);
    removeItem('persist:root', 'local');
    removeItem('token', 'local');
    Cookies.remove('token');
    queryClient.clear();
    router.replace(routeList?.loginRoute);
  }, [dispatch]);

  return null;
};

export default LogoutContainer;
