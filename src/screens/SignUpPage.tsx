import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import Button from "../components/Button";
import Screen from "../components/Screen";
import React, { useState } from "react";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/User";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password match if both fields have values
    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      birthday: e.target.value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.username.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      formData.birthday.trim() !== "" &&
      formData.password === formData.confirmPassword &&
      passwordError === ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    console.log("Form submitted:", formData);
    // Here you would typically make an API call to register the user
    // Then navigate to home only after successful registration
  };

  return (
    <Screen color="bf313a">
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          textShadow: "0 0 8px rgba(127, 124, 124, 0.5)",
          letterSpacing: "1px",
        }}
      >
        Modern Channel
      </h1>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            gap: "30px",
            flexDirection: "column",
            marginBottom: "24px",
          }}
        >
          <input
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            style={{
              height: "40px",
              width: "400px",
              paddingLeft: "15px",
              border: "none",
              outline: "none",
              borderRadius: "5px",
            }}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            style={{
              height: "40px",
              width: "400px",
              paddingLeft: "15px",
              border: "none",
              outline: "none",
              borderRadius: "5px",
            }}
          />

          <div style={{ display: "flex", gap: "30px" }}>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              style={{
                height: "40px",
                width: "185px",
                paddingLeft: "15px",
                border: "none",
                outline: "none",
                borderRadius: "5px",
              }}
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                height: "40px",
                width: "185px",
                paddingLeft: "15px",
                border: "none",
                outline: "none",
                borderRadius: "5px",
              }}
            />
          </div>
          {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}

          <input
            name="birthday"
            type="date"
            required
            value={formData.birthday}
            onChange={handleDateChange}
            max={new Date().toISOString().split("T")[0]}
            style={{
              borderRadius: "5px",
              padding: "5px 10px",
              borderStyle: "none",
              textDecoration: "none",
              height: "40px",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <Button
            color="#f3f5f7"
            to="/home"
            hoverColor="#ff6b4a"
            disabled={!isFormValid()}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Screen>
  );
};

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to MySQL via Workbench!");

    // Create and save a new user
    const user = new User();
    user.firstName = "John";
    user.lastName = "Doe";
    user.age = 30;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    // Query all users
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);
  })
  .catch((error) => console.log(error));

export default SignUpPage;
