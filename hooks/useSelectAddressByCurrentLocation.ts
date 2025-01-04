import { useEffect, useState } from 'react';

interface Location {
  lat: number;
  lng: number;
}

interface Address {
  lastSelectedTime: any;
  latitude: number;
  longitude: number;
  // Add any other properties that your address object may have
}

export const useSelectAddressByCurrentLocation = (data: Address[]) => {
  const [addressSelected, setAddressSelected] = useState<Address | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error('Geolocation not supported'));
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    });
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const selectAddressByCurrentLocation = async () => {
    try {
      const currentLocation = await getCurrentLocation();
      const nearestAddress = data.find((post) =>
        getDistanceFromLatLonInKm(
          currentLocation.lat,
          currentLocation.lng,
          post.latitude,
          post.longitude,
        ) < 1
      );
      if (nearestAddress) {
        setAddressSelected(nearestAddress || null); // Set to null if no address found
      }
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    selectAddressByCurrentLocation();
  }, [data]); // Dependency on data

  return { addressSelected, loading };
};