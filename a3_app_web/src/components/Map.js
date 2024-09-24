// src/components/Map.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { parseXML } from '../utils/parseXml';

const HazardMap = () => {
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    // XMLデータを取得して解析
    const fetchXMLData = async () => {
      try {
        const response = await axios.get('https://your-xml-endpoint-url');
        const parsedLayers = parseXML(response.data);
        setLayers(parsedLayers);
      } catch (error) {
        console.error("Error fetching XML data:", error);
      }
    };

    fetchXMLData();
  }, []);

  return (
    <MapContainer center={[35.6895, 139.6917]} zoom={10} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {layers.map((layer) => (
        <TileLayer
          key={layer.identifier}
          url={layer.resourceURL.replace('{TileMatrix}', '{z}').replace('{TileCol}', '{x}').replace('{TileRow}', '{y}')}
          attribution={layer.title}
        />
      ))}
    </MapContainer>
  );
};

export default HazardMap;
