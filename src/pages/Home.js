import React from 'react';
import Navbar from '../components/Navbar'; // ✅ 공통 네비게이션 컴포넌트 import

const styles = {
  home: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    display: 'flex',
    padding: '40px',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  mapImage: {
    width: '50%',
  },
  storeList: {
    width: '35%',
  },
  storeItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  storeImage: {
    width: '60px',
    height: '60px',
    marginRight: '15px',
  },
  storeInfo: {
    marginTop: '0',
  },
};

const stores = [
  {
    name: '우리집 당근이지',
    rating: 4.0,
    description: '눈에 좋은 귀여운 당근이지',
    image: '/images/carrot.png',
  },
  {
    name: '여긴채소',
    rating: 4.0,
    description: '몸에 좋은 채소 본비에채소는 더 싸요',
    image: '/images/veggie.png',
  },
  {
    name: '메가음료',
    rating: 4.0,
    description: '음료 팔아 드시펍빠',
    image: '/images/drink.png',
  },
];

function Home() {
  return (
    <div style={styles.home}>
      <Navbar /> {/* ✅ 네비게이션 컴포넌트 삽입 */}

      <div style={styles.mainContent}>
        <img src="/images/map.png" alt="지역 지도" style={styles.mapImage} />
        <div style={styles.storeList}>
          <h3>Store List</h3>
          {stores.map((store, index) => (
            <div key={index} style={styles.storeItem}>
              <img src={store.image} alt={store.name} style={styles.storeImage} />
              <div style={styles.storeInfo}>
                <strong>{store.name}</strong>
                <div>⭐ ({store.rating.toFixed(1)})</div>
                <p>{store.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
