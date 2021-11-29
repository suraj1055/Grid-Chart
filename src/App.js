import { useState } from "react";
import Table from "react-bootstrap/Table";
import './App.css'

const App = () => {
  const row1 = [];
  const [row, setRow] = useState();
  const [NewRow2, setNewRow2] = useState([0,1,2,3,4]);
  const [allRowsAdded, updateAllRows] = useState(5);

  const addRow = (e) => {
    e.preventDefault();
    setRow(e.target.value);
  };

  const increaseRow = () => {
    for (let i = 0; i < parseInt(row); i++) {
      row1[i] = allRowsAdded + i;
    }
    updateAllRows((allRowsAdded) => allRowsAdded + parseInt(row));
    setNewRow2([...NewRow2, ...row1]);

  };

  const deleteRow2 = (id) => {
    const updatedRows = [...NewRow2].filter((rowId) => {
      return rowId !== id;
    });
    setNewRow2(updatedRows);
  };

  return (
    <>
      <div>
        <form>
          <input type="text" onChange={addRow} placeholder="Enter Number Of Row's" /><br />
        </form>
        <button onClick={increaseRow}> Add </button>


      </div>
      <div className="container">
      <form>
          <Table striped bordered hover responsive variant="light">
            <thead>
              <tr>
                <th> <h6> No. </h6> </th>
                <th> <h6> Injection Speed </h6> </th>
                <th> <h6> Fill Time </h6> </th>
                <th> <h6> Peak Inj Press </h6> </th>
                <th> <h6> Viscocity </h6> </th>
                <th> <h6> Shear Rate </h6> </th>
                <th> <h6> AbsoluteDropViscocity </h6> </th>
                <th> <h6> %DropViscocity </h6> </th>
                <th> <h6> Action </h6> </th>
              </tr>
            </thead>
            <tbody className="grid_style">
              {NewRow2.map((rowId) => {
                return (
                  <tr key={rowId}>
                    <td> {rowId} </td>
                    <td> <input type='text' className="form-control" /> </td>
                    <td> <input type='text' className="form-control" /></td>
                    <td><input type='text' className="form-control" /> </td>
                    <td> <input type='text' className="form-control" readOnly /></td>
                    <td> <input type='text' className="form-control" readOnly /></td>
                    <td> <input type='text' className="form-control" readOnly /></td>
                    <td> <input type='text' className="form-control" readOnly /></td>
                    <td> <i className="fa fa-trash viscocity_icons" onClick={() => deleteRow2(rowId)}></i> </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </form>
      </div>
    </>
  );
};

export default App;
