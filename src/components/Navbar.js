import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
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
    gap: '40px',
  },
  navLinks: {
    display: 'flex',
    gap: '25px',
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
    textDecoration: 'none',
  },
  searchBar: {
    width: '400px',
    padding: '5px 10px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    backgroundColor: '#f5e6ff',
  },
  loginBtn: {
    textDecoration: 'none',
    color: '#999',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
};

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.leftNav}>
        <Link to="/" style={styles.logo}>너마늘</Link>
        <div style={styles.navLinks}>
          <Link to="/create" style={styles.navLink}>Create</Link>
          <Link to="/board" style={styles.navLink}>Board</Link>
          <Link to="/mypage" style={styles.navLink}>MyPage</Link>
        </div>
      </div>
      <div style={styles.rightNav}>
        <input type="text" placeholder="+ Search" style={styles.searchBar} />
        <Link to="/login" style={styles.loginBtn}>로그인</Link>
      </div>
    </nav>
  );
}

export default Navbar;
