import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// カスタムアイコンの設定
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const HazardMap = () => {
  const [layers, setLayers] = useState([]); 
  const [locations, setLocations] = useState([
    { lat: 35.6895, lon: 139.6917, title: '東京' },  // 東京の座標
    { lat: 34.0522, lon: -118.2437, title: 'ロサンゼルス' },  // ロサンゼルスの座標
    { lat: 48.8566, lon: 2.3522, title: 'パリ' }  // パリの座標
  ]); // テスト用に手動で座標を設定

  useEffect(() => {
    // 実際のデータ取得をスキップして、手動設定された値でテスト
    // 通常はこの部分でデータ取得を行いますが、ここでは手動データを使用
  }, []);

  return (
    <MapContainer center={[35.6895, 139.6917]} zoom={2} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lon]}>
          <Popup>{location.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HazardMap;
