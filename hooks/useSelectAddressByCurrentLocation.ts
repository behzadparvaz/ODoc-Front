import { useEffect, useState } from 'react';

export const useSelectAddressByCurrentLocation = (data) => {
  const [addressSelected, setAddressSelected] = useState(null);
  const getCurrentLocation = () => {
    let msd = {
      lat: null,
      lng: null,
    };
    window?.navigator?.geolocation?.getCurrentPosition(
      (position: any) => {
        msd = {
          lat: position?.latitude,
          lng: position?.longitude,
        };
      },
      null,
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
    return msd;
  };

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  const selectAddressByCurrentLocation = (data) => {
    const currentLocation = getCurrentLocation();
    data?.forEach((post) => {
      if (
        getDistanceFromLatLonInKm(
          currentLocation?.lat,
          currentLocation?.lng,
          post.latitude,
          post.longitude,
        ) < 0.2
      ) {
        setAddressSelected(post);
      }
    });
  };
  useEffect(() => {
    selectAddressByCurrentLocation(data);
  }, [addressSelected]);
  return { addressSelected: addressSelected };
};
