import { useState } from 'react';
import Table from "react-bootstrap/Table";
import './App.css'
import Edit from "./Edit";
import Read from "./Read"
import data from './data.json'
import { nanoid } from 'nanoid'

const App = () => {

  const row1 = [];

  const [row, setRow] = useState();
  const [NewRow2, setNewRow2] = useState(data);

  const [IntensificationRatio, setIntensificationRatio] = useState(0)

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
      Viscosity: editFormData.Fill_Time * editFormData.Peak_Inj_Press,
      Shear_Rate: 1 / editFormData.Fill_Time,
    }

    const newValues = [...NewRow2];

    const index = NewRow2.findIndex((value) => value.id === isRowId)

    newValues[index] = editedValue;

    setNewRow2(newValues);

    setIsRowId(null)

  }

  const addRow = (e) => {
    e.preventDefault();
    setRow(e.target.value);
  };

  const increaseRow = () => {
    for (let i = 0; i < parseInt(row); i++) {

      row1.push({
        id: nanoid(),
        Injection_Speed: "",
        Fill_Time: "",
        Peak_Inj_Press: "",
        Viscosity: "",
        Shear_Rate: ""
      })
    }

    setNewRow2([...NewRow2, ...row1]);
  };

  const deleteRow2 = (id) => {
    const updatedRows = [...NewRow2].filter((value) => {
      return value.id !== id;
    });
    setNewRow2(updatedRows);
  };

  const setId = (event, NewRow) => {

    event.preventDefault();

    setIsRowId(NewRow.id);

    const formValues = {
      Injection_Speed: NewRow.Injection_Speed,
      Fill_Time: NewRow.Fill_Time,
      Peak_Inj_Press: NewRow.Peak_Inj_Press,
    }

    setEditFormData(formValues);
  }

  return (
    <>
      <div>
        <form>
          <input type="text" onChange={addRow} placeholder="Enter Number Of Row's" /><br />
          <input type="text" onChange={(e) => setIntensificationRatio(e.target.value)} placeholder="Enter Intensification Ratio" /><br />
        </form>
        <button onClick={increaseRow}> Add </button>

      </div>
      <div className="container viscosity_table" onMouseOut={handleEditFormSubmit}>
        <form>
          <Table striped bordered hover responsive variant="light">
            <thead>
              <tr>

                <th>
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
              {NewRow2.map((NewRow, rowId) => (
                <>
                  {isRowId === NewRow.id ?
                    (
                      <Edit NewRow={NewRow} setId={setId} NewRow2={NewRow2} handleEditFormChange={handleEditFormChange} deleteRow2={deleteRow2} rowId={rowId} editFormData={editFormData} IntensificationRatio={IntensificationRatio} />
                    )
                    :
                    (<Read NewRow={NewRow} NewRow2={NewRow2} setId={setId} deleteRow2={deleteRow2} rowId={rowId} editFormData={editFormData} IntensificationRatio={IntensificationRatio}/>)
                  }
                </>

              ))}
            </tbody>
          </Table>
        </form>
      </div>
    </>
  );
};

export default App;
