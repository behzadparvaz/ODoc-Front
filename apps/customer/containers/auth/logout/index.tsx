import { logoutUser } from '@redux/user/userActions';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import useStorage from '@hooks/useStorage';
import request from '@api/request';
import { useQueryClient } from 'react-query';
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
