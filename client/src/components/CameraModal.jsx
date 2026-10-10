import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, X, AlertCircle } from 'lucide-react';

export default function CameraModal({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // default to rear camera on mobile
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setIsInitializing(true);
    setError(null);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API is not supported in this browser environment. Please use the upload option.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsInitializing(false);
    } catch (err) {
      console.warn("Camera access error:", err);
      setError(
        err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
          ? "Camera permission was denied. Please allow camera access in your browser settings, or use device photo upload."
          : `Unable to access camera: ${err.message || 'Device camera unavailable'}`
      );
      setIsInitializing(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    stopCamera();
    onCapture(dataUrl);
    onClose();
  };

  const toggleFacingMode = () => {
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '560px', padding: '1.25rem' }} 
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Camera size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '1.15rem' }}>Capture Food Photo</h3>
          </div>
          <button 
            onClick={onClose}
            style={{ padding: '0.4rem', borderRadius: '50%', color: 'var(--text-muted)' }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {error ? (
          <div style={{ padding: '1.5rem', textAlign: 'center' }}>
            <AlertCircle size={42} color="#ef4444" style={{ margin: '0 auto 0.75rem' }} />
            <p style={{ color: '#b91c1c', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{error}</p>
            <button 
              className="btn-outline" 
              onClick={onClose}
              style={{ width: '100%' }}
            >
              Use File Upload Instead
            </button>
          </div>
        ) : (
          <div>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backgroundColor: '#000000',
              aspectRatio: '4/3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {isInitializing && (
                <div style={{ color: '#ffffff', fontSize: '0.9rem' }}>
                  Starting camera...
                </div>
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              
              {/* Overlay crosshairs for focus */}
              <div style={{
                position: 'absolute',
                border: '2px dashed rgba(255,255,255,0.4)',
                borderRadius: '16px',
                width: '75%',
                height: '75%',
                pointerEvents: 'none'
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <button 
                type="button" 
                onClick={toggleFacingMode}
                className="btn-outline"
                style={{ padding: '0.6rem 0.9rem', fontSize: '0.85rem' }}
                title="Switch front / rear camera"
              >
                <RefreshCw size={16} /> Switch Camera
              </button>

              <button
                type="button"
                onClick={handleCapture}
                className="btn-primary"
                style={{ padding: '0.75rem 1.6rem', fontSize: '1rem', borderRadius: 'var(--radius-full)' }}
              >
                <Camera size={18} /> Snap Photo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
