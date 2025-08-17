import { useState, useEffect } from "react";

import bcrypt from "bcryptjs";
import Header from "./Header";
import Footer from "./Footer";

function StartPage() {
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PasswordHash: "",
    PhoneNumber: "",
    DateOfBirth: "",
    Gender: "",
  });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.FirstName.trim()) newErrors.FirstName = "First name is required";
    if (!form.LastName.trim()) newErrors.LastName = "Last name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.Email) newErrors.Email = "Email is required";
    else if (!emailRegex.test(form.Email)) newErrors.Email = "Invalid email";

    if (!form.PasswordHash) newErrors.PasswordHash = "Password is required";
    else if (form.PasswordHash.length < 8)
      newErrors.PasswordHash = "Password must be at least 8 characters";

    const phoneRegex = /^[0-9]{10}$/;
    if (!form.PhoneNumber) newErrors.PhoneNumber = "Phone number is required";
    else if (!phoneRegex.test(form.PhoneNumber))
      newErrors.PhoneNumber = "Phone number must be 10 digits";

    if (!form.DateOfBirth) {
      newErrors.DateOfBirth = "Date of Birth is required";
    } else {
      const today = new Date();
      const dob = new Date(form.DateOfBirth);
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();
      const isUnder18 =
        age < 18 ||
        (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)));
      if (isUnder18)
        newErrors.DateOfBirth = "You must be at least 18 years old";
    }

    if (!form.Gender) newErrors.Gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    dataFromApi();
  }, [users]);

  const dataFromApi = async () => {
    const apiUrl = "https://api.covenanttecs.com/Api/CRUD_API2/GetAllUsers";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(apiUrl, options);
    if (response.ok === true) {
      const fetchedData = await response.json();
      console.log(fetchedData);
      const updatedData = fetchedData.users.map((eachUser) => ({
        FirstName: eachUser.FirstName,
        LastName: eachUser.LastName,
        Email: eachUser.Email,
        PasswordHash: eachUser.PasswordHash,
        PhoneNumber: eachUser.PhoneNumber,
        DateOfBirth: eachUser.DateOfBirth.split("T")[0],
        Gender: eachUser.Gender,
      }));
      setUsers(updatedData);
    } else {
      alert("fetching Failed");
    }
  };

  const onClickSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const hashedPassword = form.PasswordHash;
      const formattedDOB = new Date(form.DateOfBirth)
        .toISOString()
        .split("T")[0];

      const payload = {
        ...form,
        PasswordHash: hashedPassword,
        DateOfBirth: formattedDOB,
      };

      try {
        const response = await fetch(
          "https://api.covenanttecs.com/Api/CRUD_API2/SaveUser",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message || "User saved successfully");
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
          setForm({
            FirstName: "",
            LastName: "",
            Email: "",
            PasswordHash: "",
            PhoneNumber: "",
            DateOfBirth: "",
            Gender: "",
          });
        } else {
          setMessage(data.message || "Registration failed");
          setShowFailure(true);
          setTimeout(() => setShowFailure(false), 3000);
        }
      } catch (error) {
        setMessage("Something went wrong");
        setShowFailure(true);
        setTimeout(() => setShowFailure(false), 3000);
      }
    }
  };

  const handleDelete = async (email) => {
    const response = await fetch(
      "https://api.covenanttecs.com/Api/CRUD_API2/DeleteUserByEmail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email }),
      }
    );
    const data = await response.json();
    if (response.ok === true) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.Email !== email));
      await dataFromApi();
      setMessage(data.message);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      setMessage(data.message || "Registration Failed");
      setTimeout(() => {
        setShowFailure(false);
      }, 3000);
      setShowFailure(true);
    }
  };
  if (users === undefined) return null;
  return (
    <>
      <Header />
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card mt-3">
              <div className="card-body">
                <div className="card mt-2">
                  <div
                    className="card-header bg-primary text-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#customerPanel"
                    style={{ cursor: "pointer" }}>
                    <span>Add Users</span>
                  </div>

                  <div id="customerPanel" className="collapse show">
                    <div className="card-body">
                      <form onSubmit={onClickSubmit}>
                        <div className="row g-3">
                          {/* First Name */}
                          <div className="col-12 col-md-3 col-lg-2">
                            <label className="form-label">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="FirstName"
                              value={form.FirstName}
                              onChange={handleChange}
                            />
                            {errors.FirstName && (
                              <small className="text-danger">
                                {errors.FirstName}
                              </small>
                            )}
                          </div>

                          {/* Last Name */}
                          <div className="col-12 col-md-3 col-lg-2">
                            <label className="form-label">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="LastName"
                              value={form.LastName}
                              onChange={handleChange}
                            />
                            {errors.LastName && (
                              <small className="text-danger">
                                {errors.LastName}
                              </small>
                            )}
                          </div>

                          {/* Email */}
                          <div className="col-12 col-md-3 col-lg-2">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="Email"
                              value={form.Email}
                              onChange={handleChange}
                            />
                            {errors.Email && (
                              <small className="text-danger">
                                {errors.Email}
                              </small>
                            )}
                          </div>

                          {/* Password */}
                          <div className="col-12 col-md-3 col-lg-2">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="PasswordHash"
                              value={form.PasswordHash}
                              onChange={handleChange}
                            />
                            {errors.PasswordHash && (
                              <small className="text-danger">
                                {errors.PasswordHash}
                              </small>
                            )}
                          </div>

                          {/* Phone Number */}
                          <div className="col-12 col-md-3 col-lg-2">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="PhoneNumber"
                              value={form.PhoneNumber}
                              onChange={handleChange}
                            />
                            {errors.PhoneNumber && (
                              <small className="text-danger">
                                {errors.PhoneNumber}
                              </small>
                            )}
                          </div>

                          {/* Date of Birth */}
                          <div className="col-12 col-md-3 col-lg-2">
                            <label className="form-label">Date of Birth</label>
                            <input
                              type="date"
                              className="form-control"
                              name="DateOfBirth"
                              value={form.DateOfBirth}
                              onChange={handleChange}
                              max={new Date().toISOString().split("T")[0]}
                            />
                            {errors.DateOfBirth && (
                              <small className="text-danger">
                                {errors.DateOfBirth}
                              </small>
                            )}
                          </div>

                          {/* Gender */}
                          <div className="col-12 col-md-3 col-lg-2">
                            <label className="form-label">Gender</label>
                            <select
                              className="form-select"
                              name="Gender"
                              value={form.Gender}
                              onChange={handleChange}>
                              <option value="">{"<-Select->"}</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                            {errors.Gender && (
                              <small className="text-danger">
                                {errors.Gender}
                              </small>
                            )}
                          </div>

                          {/* Submit */}
                          <div className="col-12 col-md-2 col-lg-2 d-flex align-items-end">
                            <button
                              type="submit"
                              className="btn btn-primary w-100">
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>

                      {/* Success / Failure messages */}
                      {showSuccess && (
                        <div className="alert alert-success mt-3">
                          {message}
                        </div>
                      )}
                      {showFailure && (
                        <div className="alert alert-danger mt-3">{message}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Table Section */}
                <div className="table-responsive mt-3">
                  <table className="table table-centered table-nowrap mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Phone Number</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th style={{ width: 125 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item, index) => (
                        <tr key={index}>
                          <td>{item.FirstName}</td>
                          <td>{item.LastName}</td>
                          <td>{item.Email}</td>
                          <td>{item.PasswordHash}</td>
                          <td>{item.PhoneNumber}</td>
                          <td>{item.DateOfBirth}</td>
                          <td>{item.Gender}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(item.Email)}>
                              <i className="mdi mdi-delete" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default StartPage;
