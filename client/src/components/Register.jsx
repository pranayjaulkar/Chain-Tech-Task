import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    age: '',
    gender: 'male',
    email: '',
    password: '',
    address: {
      state: '',
      city: '',
      zipcode: '',
    },
    phone: '',
    website: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="container mt-5">
      <h2>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="state" className="form-label">State</label>
          <input type="text" className="form-control" id="state" name="address.state" value={formData.address.state} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" name="address.city" value={formData.address.city} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="zipcode" className="form-label">Zipcode</label>
          <input type="text" className="form-control" id="zipcode" name="address.zipcode" value={formData.address.zipcode} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="website" className="form-label">Website</label>
          <input type="text" className="form-control" id="website" name="website" value={formData.website} onChange={handleChange} required />
        </div>

        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>
      <div className="text-center">
        <p>Already have an account? <Link to="/">Go to Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
