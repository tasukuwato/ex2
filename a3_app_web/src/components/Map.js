// src/components/Map.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { parseXML } from '../utils/parseXml';

const { BaseLayer, Overlay } = LayersControl;

const HazardMap = () => {
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    // XMLデータを取得して解析
    const fetchXMLData = async () => {
      try {
        const response = await axios.get('https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin/Capabilities.xml'); //適切なエンドポイントのurlを入力
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
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </BaseLayer>
        {layers.map((layer) => (
          <Overlay key={layer.identifier} name={layer.title}>
            <TileLayer
              url={layer.resourceURL.replace('{TileMatrix}', '{z}').replace('{TileCol}', '{x}').replace('{TileRow}', '{y}')}
              attribution={layer.title}
              opacity={0.6} // ハザードマップの透明度を調整
            />
          </Overlay>
        ))}
      </LayersControl>
    </MapContainer>
  );
};

export default HazardMap;
