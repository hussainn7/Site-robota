import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    ymaps: {
      ready: (callback: () => void) => void;
      Map: new (element: HTMLElement, options: any) => any;
      Placemark: new (coordinates: number[], properties: any, options: any) => any;
    };
  }
}

interface YandexMapProps {
  height?: string;
}

const YandexMap: React.FC<YandexMapProps> = ({ height = '400px' }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Yandex Maps script
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ваш_API_ключ&lang=ru_RU';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.ymaps.ready(() => {
        if (mapRef.current) {
          const map = new window.ymaps.Map(mapRef.current, {
            center: [53.902284, 27.561831],
            zoom: 16,
            controls: ['zoomControl', 'fullscreenControl'],
            margin: 0
          });

          // Добавляем метку на карту
          const placemark = new window.ymaps.Placemark([53.902284, 27.561831], {
            balloonContent: 'КСУП «Элит-Агро Больтиники»'
          }, {
            preset: 'islands#greenDotIconWithCaption'
          });

          map.geoObjects.add(placemark);
          map.behaviors.disable('scrollZoom');
          
          // Ensure map fills container
          map.container.fitToViewport();
        }
      });
    };

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full"
      style={{ 
        height,
        margin: 0,
        padding: 0,
        position: 'relative'
      }}
    />
  );
};

export default YandexMap; 