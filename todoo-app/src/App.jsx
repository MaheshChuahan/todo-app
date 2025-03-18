import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { employeData } from "./employdata";

export default function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState(0);
  const [isUpdate, setUpdate] = useState(false);

  useEffect(() => {
    setData(employeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.find(item => item.id === id);
    if (dt) {
      setUpdate(true);
      setId(id);
      setFirstName(dt.firstName);
      setLastName(dt.lastName);
      setAge(dt.age);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newObject = {
      id: data.length + 1,
      firstName,
      lastName,
      age
    };
    setData([...data, newObject]);
    handleClear();
  };

  const handleUpdate = () => {
    setData(
      data.map(item => 
        item.id === id ? { ...item, firstName, lastName, age } : item
      )
    );
    handleClear();
  };

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setUpdate(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employee Management</h2>
      <div className="card p-4 mb-4 shadow-sm">
        <form>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Age</label>
              <input type="number" className="form-control" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            {!isUpdate ? (
              <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
            ) : (
              <button className="btn btn-warning me-2" onClick={handleUpdate}>Update</button>
            )}
            <button className="btn btn-secondary" onClick={handleClear}>Clear</button>
          </div>
        </form>
      </div>

      <table className="table table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
