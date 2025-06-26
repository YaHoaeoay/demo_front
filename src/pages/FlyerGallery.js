import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function FlyerGallery() {
  const [flyerImages, setFlyerImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 서버에서 이미지 목록을 받아옴
  useEffect(() => {
    const fetchFlyers = async () => {
      try {
        const res = await fetch("http://localhost:8000/flyer-list"); // 백엔드에서 리스트 반환해야 함
        const data = await res.json();
        setFlyerImages(data.images);
      } catch (err) {
        console.error("이미지 목록 불러오기 실패:", err);
      }
    };
    fetchFlyers();
  }, []);

  const handleSave = async () => {
    if (selectedIndex === null) {
        alert("전단지를 선택해주세요.");
        return;
    }

    const imageUrl = `http://localhost:8000/${flyerImages[selectedIndex]}`;
    const imageName = flyerImages[selectedIndex].split('/').pop(); // ex. flyer_1.png

    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = imageName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err) {
        console.error("이미지 저장 실패:", err);
        alert("이미지를 저장하는 데 실패했습니다.");
    }
    };


  return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2>AI 전단지 생성</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '40px', flexWrap: 'wrap' }}>
          {flyerImages.map((imgUrl, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <img
                src={`http://localhost:8000/${imgUrl}`}
                alt={`전단지 ${idx + 1}`}
                style={{ width: '200px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              />
              <div style={{ marginTop: '10px' }}>
                <input
                  type="radio"
                  name="flyer"
                  checked={selectedIndex === idx}
                  onChange={() => setSelectedIndex(idx)}
                />{" "}
                선택
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          style={{
            marginTop: '40px',
            padding: '10px 30px',
            backgroundColor: '#e5ccfc',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

export default FlyerGallery;
