import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Create() {
  const [form, setForm] = useState({
    name: '',
    introduce: '',
    location: '',
    google_map_url: '',
    product: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("introduce", form.introduce);
    formData.append("location", form.location);
    formData.append("google_map_url", form.google_map_url);
    formData.append("product", form.product);

    try {
        const res = await fetch("http://localhost:8000/store/submit", {
        method: "POST",
        body: formData, // ✅ 자동으로 multipart/form-data로 설정됨
        });

        if (!res.ok) throw new Error("서버 응답 실패");

        const text = await res.text(); // 템플릿 반환이므로 text()
        console.log("등록 완료:", text);
    } catch (err) {
        console.error("제출 중 오류 발생:", err);
    }
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

          <label style={labelStyle}>위치(예시: 경상북도 의성군 옥산면 새마을로 45)</label>
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
      </div>
    </div>
  );
}

export default Create;
