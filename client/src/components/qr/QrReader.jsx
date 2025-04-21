// client/src/components/qr/QrReader.jsx
import { useEffect, useRef } from 'react';

export function QrReader({ onResult, onError }) {
  const videoRef = useRef(null);

  useEffect(() => {
    let scanner;
    
    const initScanner = async () => {
      try {
        const { BrowserQRCodeReader } = await import('@zxing/library');
        scanner = new BrowserQRCodeReader();
        
        await scanner.decodeFromVideoDevice(
          undefined, 
          videoRef.current, 
          (result, error) => {
            if (result) onResult(result.getText());
            if (error) onError(error);
          }
        );
      } catch (err) {
        onError(err);
      }
    };

    initScanner();

    return () => {
      if (scanner) {
        scanner.reset();
      }
    };
  }, [onResult, onError]);

  return <video ref={videoRef} width="100%" height="auto" />;
}