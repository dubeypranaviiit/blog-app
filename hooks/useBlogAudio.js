import { useState } from "react";
import axios from "axios";

const useBlogAudio = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateAudio = async (text, voice, languageCode) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/generate-audio", {
        text,
        voice,
        languageCode,
      });
      setAudioUrl(res.data.audioUrl);
    } catch (err) {
      setError("Failed to generate audio.");
    } finally {
      setLoading(false);
    }
  };

  return {
    audioUrl,
    loading,
    error,
    generateAudio,
  };
};

export default useBlogAudio;
