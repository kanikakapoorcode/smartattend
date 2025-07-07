
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, CameraOff, RotateCcw } from 'lucide-react';

interface QrScannerProps {
  onScan: (data: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  const startCamera = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 640 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsScanning(true);
      }
    } catch (err) {
      setError('Camera access denied or not available');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const simulateQrScan = () => {
    // Simulate a successful QR scan for demo purposes
    const mockData = JSON.stringify({
      classId: 'CS301_2025_01_08_10:00',
      subjectCode: 'CS301',
      timestamp: new Date().toISOString(),
      location: 'Room 101'
    });
    onScan(mockData);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="space-y-4">
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-4">
          <div className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden">
            {isScanning ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    videoRef.current.play();
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Camera preview will appear here</p>
                </div>
              </div>
            )}
            
            {/* Scanning overlay */}
            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-blue-500 rounded-lg">
                  <div className="w-full h-full border border-blue-300 rounded-lg animate-pulse">
                    {/* Corner indicators */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>

      {error && (
        <div className="text-center text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="text-center text-sm text-gray-600">
        Point your camera at a QR code to mark attendance
      </div>

      <div className="flex space-x-2">
        {!isScanning ? (
          <Button onClick={startCamera} className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Camera className="w-4 h-4 mr-2" />
            Start Camera
          </Button>
        ) : (
          <Button onClick={stopCamera} variant="outline" className="flex-1">
            <CameraOff className="w-4 h-4 mr-2" />
            Stop Camera
          </Button>
        )}
        
        {/* Demo button for testing */}
        <Button 
          onClick={simulateQrScan}
          variant="outline"
          className="px-3"
          title="Simulate QR scan for demo"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default QrScanner;
