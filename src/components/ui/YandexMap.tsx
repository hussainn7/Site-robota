import React, { useEffect, useRef } from 'react';

interface YandexMapProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const YandexMap: React.FC<YandexMapProps> = ({ 
  width = '100%', 
  height = '400px',
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Yandex Maps API
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.ymaps.ready(() => {
        if (mapRef.current) {
          const map = new window.ymaps.Map(mapRef.current, {
            center: [55.76, 37.64], // Default center (Moscow)
            zoom: 10,
            controls: ['zoomControl', 'fullscreenControl']
          });

          // Add your marker or other map features here
          const placemark = new window.ymaps.Placemark([55.76, 37.64], {
            balloonContent: 'Your Location'
          }, {
            preset: 'islands#redDotIcon'
          });

          map.geoObjects.add(placemark);
        }
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      style={{ width, height }} 
      className={className}
    />
  );
};

export default YandexMap; 