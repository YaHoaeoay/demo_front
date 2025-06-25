import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  body: {
    margin: 0,
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  home: {
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 30px',
  backgroundColor: 'white',
  borderBottom: '1px solid #ccc',
},

leftNav: {
  display: 'flex',
  alignItems: 'center',
  gap: '40px', // 로고와 navLinks 사이 간격
},

navLinks: {
  display: 'flex',
  gap: '25px', // 메뉴 간 간격
},

navLink: {
  textDecoration: 'none',
  color: '#333',
  fontWeight: '500',
},

rightNav: {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
},

  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#d3b1f2',
  },
  searchBar: {
    width: '400px',
    padding: '5px 10px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    backgroundColor: '#f5e6ff',
  },
  loginBtn: {
    background: 'none',
    border: 'none',
    color: '#999',
    cursor: 'pointer',
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
      <nav style={styles.navbar}>
        <div style={styles.leftNav}>
            <Link to="/" style={{ ...styles.logo, textDecoration: 'none' }}>너마늘</Link>
            <div style={styles.navLinks}>
            <a href="#" style={styles.navLink}>Create</a>
            <a href="#" style={styles.navLink}>Board</a>
            <a href="#" style={styles.navLink}>MyPage</a>
            </div>
        </div>
        <div style={styles.rightNav}>
            <input type="text" placeholder="+ Search" style={styles.searchBar} />
            <button style={styles.loginBtn}>🔒 Login</button>
        </div>
        </nav>

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
