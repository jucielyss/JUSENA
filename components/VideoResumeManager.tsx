
import React, { useState, useRef, useEffect } from 'react';

interface VideoResumeManagerProps {
  currentVideo: string | null;
  onSave: (videoData: string) => void;
  onClose: () => void;
}

const VideoResumeManager: React.FC<VideoResumeManagerProps> = ({ currentVideo, onSave, onClose }) => {
  const [mode, setMode] = useState<'choice' | 'record' | 'preview' | 'uploading'>('choice');
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(currentVideo);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  const MAX_DURATION = 60; // segundos

  useEffect(() => {
    if (recording) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimer(prev => {
          if (prev >= MAX_DURATION) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [recording]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setMode('preview');
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      setMode('record');
    } catch (err) {
      alert("Não foi possível acessar a câmera. Verifique as permissões.");
      setMode('choice');
    }
  };

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start();
      setRecording(true);
      setTimer(0);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert("Arquivo muito grande. Limite de 100MB.");
        return;
      }
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setMode('preview');
    }
  };

  const saveVideo = () => {
    setMode('uploading');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        if (videoUrl) onSave(videoUrl);
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col animate-in slide-in-from-bottom-full duration-300">
      <header className="p-4 flex items-center justify-between border-b border-slate-900">
        <button onClick={onClose} className="text-slate-400 p-2">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-white font-bold">Currículo em Vídeo</h2>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 relative flex flex-col overflow-hidden">
        {mode === 'choice' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-blue-600/20 text-blue-500 rounded-3xl flex items-center justify-center">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Apresente-se para as empresas</h3>
              <p className="text-slate-400 text-sm">Um vídeo curto aumenta suas chances de contratação em até 3x.</p>
            </div>
            
            <div className="w-full space-y-3 pt-4">
              <button 
                onClick={startCamera}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Gravar Agora (Máx 60s)
              </button>
              
              <label className="w-full bg-slate-900 text-slate-300 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 border border-slate-800 cursor-pointer active:scale-95 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                Escolher da Galeria
                <input type="file" className="hidden" accept="video/*" onChange={handleFileUpload} />
              </label>
            </div>

            <ul className="text-left text-xs text-slate-500 space-y-2 pt-6">
              <li className="flex gap-2">✨ Dica: Fale seu nome e experiências principais.</li>
              <li className="flex gap-2">🤫 Dica: Procure um lugar silencioso e iluminado.</li>
              <li className="flex gap-2">⏱️ Dica: Seja direto, 60 segundos é o tempo ideal.</li>
            </ul>
          </div>
        )}

        {mode === 'record' && (
          <div className="flex-1 flex flex-col bg-black">
            <video ref={videoRef} className="flex-1 w-full h-full object-cover mirror" muted playsInline />
            
            <div className="absolute top-6 left-0 right-0 flex justify-center">
              <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-black flex items-center gap-2 shadow-lg">
                <div className={`h-2 w-2 rounded-full bg-white ${recording ? 'animate-pulse' : ''}`}></div>
                00:{timer < 10 ? `0${timer}` : timer} / 01:00
              </div>
            </div>

            <div className="p-10 flex justify-center items-center gap-10 bg-gradient-to-t from-black to-transparent">
              {!recording ? (
                <button 
                  onClick={startRecording}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-slate-300 shadow-2xl active:scale-90 transition-all"
                >
                  <div className="h-16 w-16 bg-red-600 rounded-full"></div>
                </button>
              ) : (
                <button 
                  onClick={stopRecording}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-slate-300 shadow-2xl active:scale-90 transition-all"
                >
                  <div className="h-10 w-10 bg-red-600 rounded-lg"></div>
                </button>
              )}
            </div>
          </div>
        )}

        {mode === 'preview' && videoUrl && (
          <div className="flex-1 flex flex-col bg-black">
            <video src={videoUrl} className="flex-1 w-full h-full object-cover" controls playsInline />
            
            <div className="p-6 bg-slate-950 flex gap-4 border-t border-slate-900">
              <button 
                onClick={() => setMode('choice')}
                className="flex-1 py-4 text-slate-400 font-bold active:scale-95 transition-all"
              >
                Refazer
              </button>
              <button 
                onClick={saveVideo}
                className="flex-[2] bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
              >
                Salvar Vídeo
              </button>
            </div>
          </div>
        )}

        {mode === 'uploading' && (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden mb-6 border border-slate-800">
               <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Finalizando currículo...</h3>
            <p className="text-sm text-slate-500">Estamos preparando seu vídeo para as empresas.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoResumeManager;
