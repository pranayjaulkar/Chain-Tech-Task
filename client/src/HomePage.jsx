import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAuthToken } from "./actions/index";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateUser } from "./actions";
import editIcon from "./assets/edit.svg";
import crossIcon from "./assets/x.png";

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState(user);
  const [editMode, setEditMode] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, [name]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user._id, formData, navigate));
  };

  useEffect(() => {
    setDisabled((previousState) => !previousState);
  }, [editMode]);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  useEffect(() => {
    dispatch(refreshAuthToken(navigate));
  }, []);

  let inputs = [];
  if (formData) {
    inputs = [
      { type: "text", label: "Name", name: "name", value: formData.name },
      {
        type: "text",
        label: "Username",
        name: "username",
        value: formData.username,
      },
      { type: "number", label: "Age", name: "age", value: formData.age },
      {
        type: "select",
        label: "Gender",
        name: "gender",
        value: formData.gender,
      },
      { type: "text", label: "Email", name: "email", value: formData.email },
      {
        type: "text",
        label: "State",
        name: "state",
        value: formData.address.state,
      },
      {
        type: "text",
        label: "City",
        name: "city",
        value: formData.address.city,
      },
      {
        type: "text",
        label: "Zipcode",
        name: "zipcode",
        value: formData.address.zipcode,
      },
      { type: "text", label: "Phone", name: "phone", value: formData.phone },
      {
        type: "text",
        label: "Website",
        name: "website",
        value: formData.website,
      },
    ];
  }

  return (
    <div className="px-auto  bg-dark">
      <div className="container p-4 col-12 col-md-8 col-xl-4 mt-5">
        <div className="d-flex align-items-center text-white justify-content-between">
          <h2>User Profile</h2>
          <div>
            {editMode ? (
              <img
                onClick={() => setEditMode(false)}
                width={25}
                height={25}
                src={crossIcon}
                alt=""
              />
            ) : (
              <img
                onClick={() => setEditMode(true)}
                width={25}
                height={25}
                src={editIcon}
                alt=""
              />
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {inputs.map((input, i) =>
            input.type !== "select" ? (
              <div key={i} className="mt-3">
                <label htmlFor="name" className="form-label text-white">
                  {input.label}
                </label>
                <input
                  disabled={disabled}
                  type={input.type}
                  className={`form-control bg-dark ${
                    !editMode ? "text-secondary" : "text-white"
                  }`}
                  id={input.name}
                  name={input.name}
                  value={input.value}
                  onChange={
                    input.name === "zipcode" ||
                    input.name === "city" ||
                    input.name === "state"
                      ? handleAddressChange
                      : handleChange
                  }
                />
              </div>
            ) : (
              <div key={i} className="mt-3">
                <label className="form-label text-white">{input.label}</label>
                <select
                  disabled={disabled}
                  className={`form-select bg-dark ${
                    !editMode ? "text-secondary" : "text-white"
                  }`}
                  name={input.name}
                  value={input.value}
                  onChange={
                    input.name === "zipcode" ||
                    input.name === "city" ||
                    input.name === "state"
                      ? handleAddressChange
                      : handleChange
                  }
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            )
          )}
          {editMode && (
            <div className="d-flex w-100 pt-4 justify-content-end">
              <div className="mb-3 text-center">
                <button
                  type="submit"
                  onClick={() => setEditMode(false)}
                  className="btn text-light border me-3 px-4 py-2"
                >
                  Cancel
                </button>
              </div>
              <div className="mb-3 text-center">
                <button type="submit" className="btn btn-primary px-4 py-2">
                  Save
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
