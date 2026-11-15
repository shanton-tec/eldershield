import React, { useEffect, useRef, useState } from "react";
import {
  FaUserCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaTint,
  FaHeartbeat,
  FaUserEdit,
  FaCamera,
  FaSave,
  FaTimes
} from "react-icons/fa";

function Profile() {
  const defaultProfile = {
    name: "Yazhini",
    age: "21",
    gender: "Female",
    phone: "+91 9876543210",
    email: "yazhini@example.com",
    blood: "O+",
    emergency: "+91 9876543210",
    photo: ""
  };

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("elderShieldProfile");

    if (savedProfile) {
      return {
        ...defaultProfile,
        ...JSON.parse(savedProfile)
      };
    }

    return defaultProfile;
  });

  const [editMode, setEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);

  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      "elderShieldProfile",
      JSON.stringify(profile)
    );
  }, [profile]);

  // -----------------------------
  // EDIT PROFILE
  // -----------------------------

  const handleEdit = () => {
    setEditProfile(profile);
    setEditMode(true);
  };

  // -----------------------------
  // INPUT CHANGE
  // -----------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // -----------------------------
  // SAVE PROFILE
  // -----------------------------

  const handleSave = () => {
    setProfile(editProfile);
    setEditMode(false);

    localStorage.setItem(
      "elderShieldProfile",
      JSON.stringify(editProfile)
    );
  };

  // -----------------------------
  // CANCEL
  // -----------------------------

  const handleCancel = () => {
    setEditProfile(profile);
    setEditMode(false);
  };

  // -----------------------------
  // PROFILE PHOTO
  // -----------------------------

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const photo = reader.result;

      setProfile((prev) => ({
        ...prev,
        photo
      }));

      setEditProfile((prev) => ({
        ...prev,
        photo
      }));

      localStorage.setItem(
        "elderShieldProfile",
        JSON.stringify({
          ...profile,
          photo
        })
      );
    };

    reader.readAsDataURL(file);
  };

  // -----------------------------
  // CALL EMERGENCY CONTACT
  // -----------------------------

  const handleCall = () => {
    window.location.href = `tel:${profile.emergency}`;
  };

  return (
    <div>

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#4f46e5)",
          color: "white",
          borderRadius: "25px",
          padding: "30px",
          marginBottom: "25px",
          display: "flex",
          alignItems: "center",
          gap: "25px"
        }}
      >

        {/* PROFILE PHOTO */}

        <div
          style={{
            position: "relative",
            width: "110px",
            height: "110px"
          }}
        >

          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid white"
              }}
            />
          ) : (
            <FaUserCircle size={110} />
          )}

          {/* CAMERA BUTTON */}

          <button
            onClick={handlePhotoClick}
            title="Change profile photo"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "38px",
              height: "38px",
              border: "none",
              background: "#fff",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)"
            }}
          >
            <FaCamera color="#2563eb" />
          </button>

          {/* HIDDEN FILE INPUT */}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: "none" }}
          />

        </div>

        {/* PROFILE NAME */}

        <div style={{ flex: 1 }}>

          <h1 style={{ margin: "0 0 5px" }}>
            {profile.name}
          </h1>

          <h3 style={{ margin: "0 0 5px" }}>
            Care Receiver
          </h3>

          <p style={{ margin: 0 }}>
            ElderShield Health Profile
          </p>

        </div>

        {/* EDIT BUTTON */}

        {!editMode && (
          <button
            onClick={handleEdit}
            style={{
              background: "white",
              color: "#2563eb",
              border: "none",
              borderRadius: "12px",
              padding: "12px 18px",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <FaUserEdit />
            Edit Profile
          </button>
        )}

      </div>


      {/* ================================= */}
      {/* EDIT MODE */}
      {/* ================================= */}

      {editMode && (
        <div
          className="feature-card"
          style={{
            marginBottom: "25px",
            padding: "25px"
          }}
        >

          <h2>✏️ Edit Profile</h2>

          <br />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "18px"
            }}
          >

            {/* NAME */}

            <div>
              <label><strong>Name</strong></label>

              <input
                type="text"
                name="name"
                value={editProfile.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* AGE */}

            <div>
              <label><strong>Age</strong></label>

              <input
                type="number"
                name="age"
                value={editProfile.age}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* GENDER */}

            <div>
              <label><strong>Gender</strong></label>

              <select
                name="gender"
                value={editProfile.gender}
                onChange={handleChange}
                style={inputStyle}
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>

            {/* PHONE */}

            <div>
              <label><strong>Phone</strong></label>

              <input
                type="tel"
                name="phone"
                value={editProfile.phone}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* EMAIL */}

            <div>
              <label><strong>Email</strong></label>

              <input
                type="email"
                name="email"
                value={editProfile.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* BLOOD */}

            <div>
              <label><strong>Blood Group</strong></label>

              <input
                type="text"
                name="blood"
                value={editProfile.blood}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* EMERGENCY */}

            <div>
              <label><strong>Emergency Contact</strong></label>

              <input
                type="tel"
                name="emergency"
                value={editProfile.emergency}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

          </div>

          {/* SAVE / CANCEL */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "25px"
            }}
          >

            <button
              onClick={handleSave}
              className="primary-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <FaSave />
              Save Changes
            </button>

            <button
              onClick={handleCancel}
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <FaTimes />
              Cancel
            </button>

          </div>

        </div>
      )}


      {/* ================================= */}
      {/* PROFILE CARDS */}
      {/* ================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px"
        }}
      >

        {/* PERSONAL */}

        <div className="feature-card">

          <h2>👤 Personal Details</h2>

          <br />

          <p>
            <strong>Name:</strong>{" "}
            {profile.name}
          </p>

          <p>
            <strong>Age:</strong>{" "}
            {profile.age}
          </p>

          <p>
            <strong>Gender:</strong>{" "}
            {profile.gender}
          </p>

          <p>
            <FaPhoneAlt />{" "}
            {profile.phone}
          </p>

          <p>
            <FaEnvelope />{" "}
            {profile.email}
          </p>

        </div>


        {/* MEDICAL */}

        <div className="feature-card">

          <h2>❤️ Medical Details</h2>

          <br />

          <p>
            <FaTint color="red" />
            {" "}Blood Group :
            <strong>{" "}{profile.blood}</strong>
          </p>

          <p>
            <FaHeartbeat color="red" />
            {" "}Heart Rate :
            <strong>{" "}72 BPM</strong>
          </p>

          <p>
            Blood Pressure :
            <strong>{" "}120 / 80</strong>
          </p>

          <p>
            Temperature :
            <strong>{" "}36.8°C</strong>
          </p>

        </div>


        {/* EMERGENCY */}

        <div className="feature-card">

          <h2>🚨 Emergency Contact</h2>

          <br />

          <p>
            Primary Contact
          </p>

          <h3>
            {profile.emergency}
          </h3>

          <button
            className="primary-btn"
            onClick={handleCall}
          >
            📞 Call
          </button>

        </div>


        {/* HEALTH SUMMARY */}

        <div className="feature-card">

          <h2>
            📊 Health Summary
          </h2>

          <br />

          <p>
            ✅ Heart Rate Stable
          </p>

          <p>
            ✅ Blood Pressure Normal
          </p>

          <p>
            ✅ Hydration Good
          </p>

          <p>
            ✅ Daily Activity Moderate
          </p>

          {!editMode && (
            <button
              className="primary-btn"
              onClick={handleEdit}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <FaUserEdit />
              Edit Profile
            </button>
          )}

        </div>

      </div>

    </div>
  );
}


// =================================
// INPUT STYLE
// =================================

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "7px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  fontSize: "15px",
  boxSizing: "border-box",
  outline: "none"
};


export default Profile;