import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission (e.g., send data to the server)
    console.log('Login data submitted:', loginData);
  };

  return (
    <div className="container mt-5">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={loginData.username} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={loginData.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={loginData.password} onChange={handleChange} required />
        </div>

        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
      <div className="text-center">
        <p>Dont have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
