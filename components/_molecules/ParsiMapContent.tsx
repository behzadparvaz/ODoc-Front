import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

import { setMapStateAction } from '@redux/map/mapActions';
import useMapApiCalls from '@hooks/useMapApiCalls';
import { RootState } from '@utilities/interfaces/redux';

const parsiMapAccessToken = process.env.NEXT_PUBLIC_PARSI_MAP_TOKEN;
const token = process.env.NEXT_PUBLIC_PARSI_MAP_API_TOKEN;

mapboxgl.accessToken = parsiMapAccessToken;

type Props = {
  parsiMapAddressData?: any;
  loadingAddress?: boolean;
  addressId?: number | string;
  className?: string;
  height?: string;
  interactive?: boolean;
};

function ParsiMapContent({
  parsiMapAddressData,
  className = '',
  height = '100%',
  loadingAddress = false,
  addressId = 0,
  interactive = true,
}: Props) {
  let MarkerIcon;
  useEffect(() => {
    MarkerIcon = document?.createElement('div');
    MarkerIcon.className = 'marker';
    MarkerIcon.style.backgroundImage = `url("/images/mapbox-marker-icon.svg")`;
    MarkerIcon.style.width = `66px`;
    MarkerIcon.style.height = `71px`;
    MarkerIcon.style.backgroundSize = '100%';
  }, []);

  const dispatch = useDispatch();
  const mapContainer = useRef<any>(null);
  const {
    parsiMapLocationAddress,
    mapAddressesText,
    isLoadingMapsAddress,
    setMapAddressesText,
  } = useMapApiCalls(addressId);
  const { viewport, defaultViewPort, filteredCities } = useSelector(
    (state: RootState) => state.mapInfo,
  );
  const [zoom, setZoom] = useState(15);
  const [mapObj, setMap] = useState({
    map: null,
    marker: null,
  });
  const center: [number, number] = [
    viewport.longitude || defaultViewPort.longitude,
    viewport.latitude || defaultViewPort.latitude,
  ];
  const mapStyle: CSSProperties = {
    height: height,
  };
  useEffect(() => {
    let parsiMapAddress = parsiMapAddressData
      ? parsiMapAddressData?.address
      : parsiMapAddressData?.address;
    setMapAddressesText(parsiMapAddress);
    if (!isLoadingMapsAddress) {
      let parsiMapCity = parsiMapAddressData
        ? `${parsiMapAddressData?.subdivision_prefix}`
        : `${parsiMapLocationAddress?.subdivision_prefix}`;
      const neshanCityInFilteredCity = filteredCities?.filter(
        (city) => city.name === parsiMapCity,
      );
      neshanCityInFilteredCity?.length > 0
        ? dispatch(
            setMapStateAction({
              selectedCity: filteredCities?.filter(
                (city) => city.name === parsiMapCity,
              )[0],
              neshanCityName: parsiMapCity,
            }),
          )
        : dispatch(
            setMapStateAction({
              selectedCity: {
                id: null,
                name: '',
                lat: null,
                lng: null,
              },
            }),
          );
    }
  }, [parsiMapLocationAddress, parsiMapAddressData]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: `https://okalaapi.parsimap.ir/styles/parsimap-streets-v11?key=${parsiMapAccessToken}`,
      center,
      zoom,
      doubleClickZoom: true,
      maxZoom: 19,
      minZoom: 4,
      scrollZoom: { around: 'center' },
      touchZoomRotate: { around: 'center' },
      accessToken: token,
      interactive: interactive,
    });
    if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
      mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        (): void => {},
        true, // Lazy load the plugin only when text is in arabic
      );
    }

    let marker = new (mapboxgl as any).Marker(MarkerIcon)
      .setLngLat(center)
      .addTo(map);

    map.on('move', function (e: any) {
      const movedCenter = map.getCenter();
      marker.setLngLat(movedCenter);
    });
    map.on('dragend', async (e) => {
      const lastLatLng = marker.getLngLat();
      dispatch(
        setMapStateAction({
          viewport: {
            latitude: lastLatLng.lat,
            longitude: lastLatLng.lng,
          },
          mapIsTouched: true,
        }),
      );
    });
    map.on('zoom', (e) => {
      setZoom(e.target.getZoom());
    });
    setMap(() => ({
      map,
      marker,
    }));
  }, []);

  useEffect(() => {
    if (mapObj.map) {
      (mapObj.map as any).setCenter(center);
      (mapObj.marker as any).setLngLat(center);
    }
  }, [viewport.latitude, viewport.longitude]);

  return (
    <>
      <div
        ref={mapContainer}
        style={mapStyle}
        className={`map-container z-0 w-full h-full absolute top-0 right-0 bottom-0 left-0 ${className}`}
        id="gtm_P"
      />
    </>
  );
}

export default ParsiMapContent;
