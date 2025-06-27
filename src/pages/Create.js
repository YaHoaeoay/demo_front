import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function Create() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    introduce: '',
    location: '',
    google_map_url: '',
    product: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isLoading) {
      setElapsedTime(0);
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAIImageGenerate = async () => {
    try {
      const userText = `
        상점 이름: ${form.name}
        소개: ${form.introduce}
        위치: ${form.location}
        대표 상품: ${form.product}
      `;

      const aiFormData = new FormData();
      aiFormData.append("user_text", userText);

      setIsLoading(true);

      const res = await fetch("http://localhost:8000/generate-flyer/image", {
        method: "POST",
        body: aiFormData,
      });

      if (!res.ok) throw new Error("AI 이미지 생성 실패");

      const blob = await res.blob(); // 이미지 파일로 받기
      const imageUrl = URL.createObjectURL(blob);

      navigate('/gallery', { state: { images: [imageUrl] } });
    } catch (err) {
      console.error("AI 생성 오류:", err);
      alert("AI 이미지 생성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAIImageGenerate();
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 15px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#f5e6ff',
    marginBottom: '25px',
    fontSize: '1rem',
  };

  const labelStyle = {
    marginBottom: '6px',
    fontWeight: '500',
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '80px auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>상점 정보 등록</h1>

        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <div className="spinner" style={{ marginBottom: '20px' }}>
              <div className="loader"></div>
            </div>
            <p>AI 전단지 생성 중... ⏱️ {elapsedTime}초</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>상점 이름</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />

            <label style={labelStyle}>한줄 소개(30자 이상)</label>
            <input
              type="text"
              name="introduce"
              value={form.introduce}
              onChange={handleChange}
              style={inputStyle}
            />

            <label style={labelStyle}>위치</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              style={inputStyle}
            />

            <label style={labelStyle}>Google Map URL</label>
            <input
              type="text"
              name="google_map_url"
              value={form.google_map_url}
              onChange={handleChange}
              style={inputStyle}
            />

            <label style={labelStyle}>대표 상품</label>
            <input
              type="text"
              name="product"
              value={form.product}
              onChange={handleChange}
              style={inputStyle}
            />

            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  padding: '10px 30px',
                  backgroundColor: '#d3b1f2',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                등록하기
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .loader {
          border: 8px solid #eee;
          border-top: 8px solid #b38ce7;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Create;
