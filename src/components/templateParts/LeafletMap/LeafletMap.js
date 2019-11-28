import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, LayersControl, } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { LocationList } from '../../../utils/locationList';
import './leafletmap.css';

const { BaseLayer, Overlay } = LayersControl;

class LeafletMap extends Component {
    
    render() {
        const {Latitude, Longitude} = LocationList[0];
        const position = [Latitude, Longitude];
        return (
            <Map className="markercluster-map" center={position} zoom={10} maxZoom={18}>
                <LayersControl position="topright">

                    <BaseLayer checked name="OpenStreetMap.Mapnik">
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </BaseLayer>
                    <BaseLayer name="OpenStreetMap.BlackAndWhite">
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                        />
                    </BaseLayer>

                    <Overlay name="Marker with popup" checked>
                        <MarkerClusterGroup>
                            {LocationList.map((location, idx) => (
                                <Marker 
                                    position={[location.Latitude, location.Longitude]}
                                    key={idx}
                                >
                                    <Popup>{location.TValue}</Popup>
                                </Marker>
                            ))}
                        </MarkerClusterGroup>
                    </Overlay>

                </LayersControl>
            </Map>
        );
    }
}

export default LeafletMap;