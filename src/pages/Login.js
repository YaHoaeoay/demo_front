import React, { useState } from "react";
import { Link } from "react-router-dom";

const styles = {
  navbar: {
    height: "60px",
    backgroundColor: "#f9f9f9",
    display: "flex",
    alignItems: "center",
    paddingLeft: "40px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#d2a8f2",
  },
  container: {
    maxWidth: "360px",
    margin: "80px auto",
    padding: "20px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0 16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f8ecff",
    boxSizing: "border-box",  // ✅ 추가
  },
  checkboxWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: "8px",
    fontSize: "14px",
    marginBottom: "16px",
  },
  button: {
    backgroundColor: "#e3b9f6",
    color: "white",
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  signup: {
    marginTop: "12px",
    fontSize: "14px",
  },
};

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 정보:", { id, password });
    // TODO: 로그인 처리 로직
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <Link to="/" style={{ ...styles.logo, textDecoration: "none" }}>
            너마늘
        </Link>
        </nav>
      <div style={styles.container}>
        <h3>로그인</h3>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">ID</label>
          <input
            id="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            style={styles.input}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <div style={styles.checkboxWrap}>
            <input type="checkbox" id="saveId" />
            <label htmlFor="saveId">아이디 저장</label>
          </div>

          <button type="submit" style={styles.button}>
            로그인
          </button>
        </form>

        <div style={styles.signup}>
          <a href="/register">회원가입</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
