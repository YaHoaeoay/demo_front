import React, { useState } from 'react';
import Navbar from '../components/Navbar'; 

function Create() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    mapUrl: '',
    mainProduct: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('🚀 등록된 상점 정보:', form);
    // 여기에 API 연동 로직 추가 가능
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
            <label style={labelStyle}>상점이름</label>
            <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
            />

            <label style={labelStyle}>한줄소개</label>
            <input
            type="text"
            name="description"
            value={form.description}
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

            <label style={labelStyle}>Google Map Url</label>
            <input
            type="text"
            name="mapUrl"
            value={form.mapUrl}
            onChange={handleChange}
            style={inputStyle}
            />

            <label style={labelStyle}>주 상품</label>
            <input
            type="text"
            name="mainProduct"
            value={form.mainProduct}
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
    </div>  // ✅ 이 닫는 태그 추가!
    );

}

export default Create;
