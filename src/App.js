import { useState } from "react";
import Table from "react-bootstrap/Table";
import './App.css'
import ReadOnly from "./ReadOnly";

const App = () => {
  const row1 = [];
  const [row, setRow] = useState();
  const [NewRow2, setNewRow2] = useState([0, 1, 2, 3, 4]);
  const [allRowsAdded, updateAllRows] = useState(5);

  const [IntensificationRatio, setIntensificationRatio] = useState()

  const [editFormData, setEditFormData] = useState({
    Injection_Speed: "",
    Fill_Time: "",
    Peak_Inj_Press: "",
    Viscosity: "",
    Shear_Rate: ""
  })

  const [isRowId, setIsRowId] = useState(null)

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);

  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedValue = {
      id: isRowId,
      Injection_Speed: editFormData.Injection_Speed,
      Fill_Time: editFormData.Fill_Time,
      Peak_Inj_Press: editFormData.Peak_Inj_Press,
      Viscosity: editFormData.Fill_Time * editFormData.Peak_Inj_Press * IntensificationRatio,
      Shear_Rate: 1 / editFormData.Fill_Time,
    }

    const newValues = [...NewRow2];

    const index = NewRow2.findIndex((value) => value === isRowId)

    newValues[index] = editedValue;

    setNewRow2(newValues);
  }

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

  // const deleteRow2 = (id) => {

  //   const newValues = [...NewRow2];

  //   const index = NewRow2.findIndex((value) => value.id === id);

  //   newValues.splice(index, 1);

  //   setNewRow2(newValues);

  //   console.log(id);
  // };

  const setId = (id) => {
    setIsRowId(id);
  }

  return (
    <>
      <div>
        <form>
          <input type="text" onChange={addRow} placeholder="Enter Number Of Row's" /><br />
          <input type="text" onClick={(e) => setIntensificationRatio(e.target.value)} placeholder="Enter Number Of Row's" /><br />
        </form>
        <button onClick={increaseRow}> Add </button>


      </div>
      <div className="container">
        <form onSubmit={handleEditFormSubmit} >
          <Table striped bordered hover responsive variant="light">
            <thead>
              <tr>
                <th>
                  {" "}
                  <h6> No. </h6>{" "}
                </th>
                <th>
                  {" "}
                  <h6> Injection Speed </h6>{" "}
                </th>
                <th>
                  {" "}
                  <h6> Fill Time </h6>{" "}
                </th>
                <th>
                  {" "}
                  <h6> Peak Inj Press </h6>{" "}
                </th>
                <th>
                  {" "}
                  <h6> Viscocity </h6>{" "}
                </th>
                <th>
                  {" "}
                  <h6> Shear Rate </h6>{" "}
                </th>
                <th>
                  {" "}
                  <h6> AbsoluteDropViscocity </h6>{" "}
                </th>
                <th>
                  {" "}
                  <h6> %DropViscocity </h6>{" "}
                </th>
                <th>
                  {" "}
                  <h6> Action </h6>{" "}
                </th>
              </tr>
            </thead>
            <tbody className="grid_style">
              {NewRow2.map((element, rowId) => {
                return (
                  <ReadOnly NewRow2={NewRow2} element={element} rowId={rowId} setId={setId} handleEditFormChange={handleEditFormChange} deleteRow2={deleteRow2} />
                )
              })}
            </tbody>
          </Table>
          <button type="submit" className="mt-4"> Calculate </button>

        </form>
      </div>
    </>
  );
};

export default App;
