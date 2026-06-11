import { useState } from "react";
import {
  Users,
  UserCog,
  Search,
  Plus,
  Trash2,
  Edit2,
  Phone,
  Mail,
} from "lucide-react";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("patients");

  const [patients, setPatients] = useState([
    {
      id: "P001",
      name: "Rajesh Kumar",
      age: 45,
      gender: "Male",
      blood: "O+",
      doctor: "Dr. Priya Sharma",
      department: "Cardiology",
      room: "201",
      status: "Active",
      condition: "Hypertension",
    },
    {
      id: "P002",
      name: "Anita Patel",
      age: 32,
      gender: "Female",
      blood: "A+",
      doctor: "Dr. Vijay Singh",
      department: "Neurology",
      room: "ICU-03",
      status: "Critical",
      condition: "Brain Tumour",
    },
    {
      id: "P003",
      name: "Mohit Verma",
      age: 58,
      gender: "Male",
      blood: "B-",
      doctor: "Dr. Sunita Rao",
      department: "Orthopedics",
      room: "--",
      status: "Discharged",
      condition: "Fracture",
    },
  ]);

  const doctors = [
    {
      id: "D001",
      name: "Dr. Priya Sharma",
      specialization: "Cardiologist",
      experience: 12,
      patients: 48,
      rating: 4.9,
      available: true,
    },
    {
      id: "D002",
      name: "Dr. Vijay Singh",
      specialization: "Neurologist",
      experience: 15,
      patients: 35,
      rating: 4.8,
      available: true,
    },
    {
      id: "D003",
      name: "Dr. Sunita Rao",
      specialization: "Orthopedist",
      experience: 10,
      patients: 42,
      rating: 4.7,
      available: false,
    },
  ];

  const [searchPatient, setSearchPatient] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    blood: "",
    doctor: "",
    department: "",
    room: "",
    condition: "",
  });

  const filteredPatients = patients.filter((item) =>
    item.name.toLowerCase().includes(searchPatient.toLowerCase())
  );

  const filteredDoctors = doctors.filter((item) =>
    item.name.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  const deletePatient = (id) => {
    setPatients(patients.filter((item) => item.id !== id));
  };

  const editPatient = (patient) => {
    setNewPatient({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      blood: patient.blood,
      doctor: patient.doctor,
      department: patient.department,
      room: patient.room,
      condition: patient.condition,
    });
    setEditId(patient.id);
    setShowForm(true);
  };

  const addPatient = () => {
    if (!newPatient.name || !newPatient.age) {
      alert("Please fill all required fields");
      return;
    }

    if (editId) {
      setPatients(
        patients.map((item) =>
          item.id === editId ? { ...item, ...newPatient } : item
        )
      );
      setEditId(null);
    } else {
      const patient = {
        id: `P${String(patients.length + 1).padStart(3, "0")}`,
        ...newPatient,
        status: "Active",
      };
      setPatients([...patients, patient]);
    }

    setNewPatient({
      name: "",
      age: "",
      gender: "",
      blood: "",
      doctor: "",
      department: "",
      room: "",
      condition: "",
    });

    setShowForm(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">+</div>
          <div>
            <h2>MediCare HMS</h2>
            <p>Hospital Management</p>
          </div>
        </div>

        <h4 className="menu-title">MAIN MENU</h4>

        <button
          className={`menu-btn ${activePage === "patients" ? "active" : ""}`}
          onClick={() => setActivePage("patients")}
        >
          <Users size={18} />
          Patients
        </button>

        <button
          className={`menu-btn ${activePage === "doctors" ? "active" : ""}`}
          onClick={() => setActivePage("doctors")}
        >
          <UserCog size={18} />
          Doctors
        </button>

        <div className="admin-box">
          <div className="admin-avatar">AU</div>
          <div>
            <h4>Dr. Admin</h4>
            <p>Super Admin</p>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="topbar">
          <div>
            <h1>
              {activePage === "patients"
                ? "Patient Management"
                : "Doctor Management"}
            </h1>
            <p>Welcome back, Dr. Admin</p>
          </div>
        </div>

        {activePage === "patients" && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Total Patients</h4>
                <h2>{patients.length}</h2>
              </div>

              <div className="stat-card">
                <h4>Active</h4>
                <h2>
                  {patients.filter((item) => item.status === "Active").length}
                </h2>
              </div>

              <div className="stat-card">
                <h4>Critical</h4>
                <h2>
                  {patients.filter((item) => item.status === "Critical").length}
                </h2>
              </div>

              <div className="stat-card">
                <h4>Discharged</h4>
                <h2>
                  {
                    patients.filter((item) => item.status === "Discharged")
                      .length
                  }
                </h2>
              </div>
            </div>

            <div className="toolbar">
              <div className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchPatient}
                  onChange={(e) => setSearchPatient(e.target.value)}
                />
              </div>

              <button className="add-btn" onClick={() => setShowForm(true)}>
                <Plus size={16} />
                Add Patient
              </button>
            </div>

            {showForm && (
              <div className="modal-overlay">
                <div className="patient-form">
                  <h2>{editId ? "Edit Patient" : "Add New Patient"}</h2>

                  <input
                    type="text"
                    placeholder="Patient Name"
                    value={newPatient.name}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, name: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Age"
                    value={newPatient.age}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, age: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Gender"
                    value={newPatient.gender}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, gender: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Blood Group"
                    value={newPatient.blood}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, blood: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Doctor"
                    value={newPatient.doctor}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, doctor: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Department"
                    value={newPatient.department}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        department: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Room Number"
                    value={newPatient.room}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, room: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Condition"
                    value={newPatient.condition}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        condition: e.target.value,
                      })
                    }
                  />

                  <div className="form-buttons">
                    <button onClick={addPatient}>
                      {editId ? "Update Patient" : "Save Patient"}
                    </button>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setEditId(null);
                        setNewPatient({
                          name: "",
                          age: "",
                          gender: "",
                          blood: "",
                          doctor: "",
                          department: "",
                          room: "",
                          condition: "",
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Age/Gender</th>
                    <th>Blood</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Room</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                        {item.age} / {item.gender}
                      </td>
                      <td>{item.blood}</td>
                      <td>{item.doctor}</td>
                      <td>{item.department}</td>
                      <td>{item.room}</td>
                      <td>{item.status}</td>
                      <td>
                        {/* ✅ FIX: buttons now correctly inside <td> */}
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            className="icon-btn"
                            onClick={() => editPatient(item)}
                          >
                            <Edit2 size={15} />
                          </button>

                          <button
                            className="icon-btn delete"
                            onClick={() => deletePatient(item.id)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activePage === "doctors" && (
          <>
            <div className="toolbar">
              <div className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={searchDoctor}
                  onChange={(e) => setSearchDoctor(e.target.value)}
                />
              </div>
            </div>

            <div className="doctor-grid">
              {filteredDoctors.map((doctor) => (
                <div className="doctor-card" key={doctor.id}>
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialization}</p>
                  <p>Experience: {doctor.experience} Years</p>
                  <p>Patients: {doctor.patients}</p>
                  <p>⭐ {doctor.rating}</p>

                  <div>
                    <button className="icon-btn">
                      <Phone size={14} />
                    </button>

                    <button className="icon-btn">
                      <Mail size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
