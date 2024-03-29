import leaflet, { Layer } from 'leaflet';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map/use-map';
import { DEFAULT_MARKER_SRC, ACTIVE_MARKER_SRC } from '../../const';
import { Offers, Offer, City } from '../../types/offer';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offers;
  activeCard?: Offer;
}

function Map({offers, activeCard}: MapProps): JSX.Element {
  const mapRef = useRef(null);

  const city: City = offers[0].city;
  const {latitude, longitude, zoom} = city.location;
  const map = useMap(mapRef, city);
  const defaultIcon = leaflet.icon({
    iconUrl: DEFAULT_MARKER_SRC,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

  const activeIcon = leaflet.icon({
    iconUrl: ACTIVE_MARKER_SRC,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

  useEffect(() => {
    if (map) {
      map.setView([latitude, longitude], zoom);

      offers.forEach((offer: Offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (activeCard === offer) ? activeIcon : defaultIcon,
          }).addTo(map);
      });
    }
    return () => {
      map?.eachLayer((layer: Layer) => {
        if (layer.getPane()?.classList.contains('leaflet-marker-pane')) {
          layer.remove();
        }
      });
    };
  });

  return (
    <div ref={mapRef} style={{height: '100%'}} data-testid="mapContainer"></div>
  );

}

export default Map;
