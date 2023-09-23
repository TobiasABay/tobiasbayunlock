import React, { useEffect, useState } from 'react';
import './PasswordPage.css';

function PasswordPage() {
  const [rows, setRows] = useState([]);
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showIndex, setShowIndex] = useState(null);

  useEffect(() => {
    fetchRowsFromDatabase();
  }, []);

  const fetchRowsFromDatabase = async () => {
    try {
      const response = await fetch('lobster-app-5ksgy.ondigitalocean.app:5000/getRows');
      if (!response.ok) {
        console.log(`Failed to fetch rows: ${response.status} ${response.statusText}`);
        return;
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.log(`An error occurred: ${error}`);
    }
  };

  const addRowToDatabase = async (website, email, password) => {
    try {
      const response = await fetch('lobster-app-5ksgy.ondigitalocean.app:5000/addRow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ website, email, password }),
      });
  
      if (!response.ok) {
        console.log(`Failed to add row: ${response.status} ${response.statusText}`);
        return;
      }
  
      const data = await response.json();
      return data.id;  // Returner det genererede ID
    } catch (error) {
      console.log(`An error occurred: ${error}`);
    }
  };
  

  const removeRowFromDatabase = async (id) => {
    try {
      const response = await fetch(`lobster-app-5ksgy.ondigitalocean.app:5000/removeRow/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        console.log(`Failed to remove row: ${response.status} ${response.statusText}`);
        return;
      }
      console.log('Row removed from the database');
    } catch (error) {
      console.log(`An error occurred: ${error}`);
    }
  };
  
  const removeRow = (index) => {
    const rowToRemove = rows[index];
    removeRowFromDatabase(rowToRemove.id);  // Antager, at hver række har et 'id'-felt
    setRows(rows.filter((_, i) => i !== index));
  };

  const addRow = async () => {
    const newRow = { website, email, password };
    const id = await addRowToDatabase(website, email, password);  // Tilføjer rækken til databasen og får ID
    if (id != null) {
      newRow.id = id;
      setRows([...rows, newRow]);
    }
    setWebsite("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="passwordpage-container">
      <h1 className="passwordpage-header">
        <span className="password-text">Password</span> Page
      </h1>
      <div className="input-fields">
        <input type="text" placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="add-row-button" onClick={addRow}>Add Row</button>
      </div>
      
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Website:</th>
              <th>Email:</th>
              <th>Password:</th>
              <th>Action:</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.website}</td>
                <td>{row.email}</td>
                <td>
                  {showIndex === index ? row.password : '••••••'}
                  <button className="showHideButton" onClick={() => setShowIndex(showIndex === index ? null : index)}>
                    {showIndex === index ? 'Hide' : 'Show'}
                  </button>
                </td>
                <td className="action-column">
                  <button className="remove-row-button" onClick={() => removeRow(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PasswordPage;
