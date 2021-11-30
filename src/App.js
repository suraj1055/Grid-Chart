import { useState } from "react";
import Table from "react-bootstrap/Table";
import './App.css'

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

  // const deleteRow2 = (id) => {
  //   const updatedRows = [...NewRow2].filter((rowId) => {
  //     return rowId !== id;
  //   });
  //   setNewRow2(updatedRows);
  // };

  const deleteRow2 = (id) => {

    const newValues = [...NewRow2];

    const index = NewRow2.findIndex((value) => value === id);

    newValues.splice(index, 1);

    setNewRow2(newValues);

    console.log(id);
  };

  const setId = (id) => {
    setIsRowId(id);
  }

  return (
    <>
      <div>
        <form>
          <input type="text" onChange={addRow} placeholder="Enter Number Of Row's" /><br />
          <input type="text" onChange={(e) => setIntensificationRatio(e.target.value)} placeholder="Enter Intensification Ratio" />
        </form>
        <button onClick={increaseRow}> Add </button>

      </div>
      <div className="container">
        <form onSubmit={handleEditFormSubmit}>
          <Table striped bordered hover responsive variant="light">
            <thead>
              <tr>
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
                  <tr key={rowId} onClick={() => setId(rowId)}>

                    <td> <input type='text' className="form-control" value={NewRow2[rowId].Injection_Speed} name="Injection_Speed" onChange={handleEditFormChange} /> </td>

                    <td> <input type='text' className="form-control" value={NewRow2[rowId].Fill_Time} name="Fill_Time" onChange={handleEditFormChange} /> </td>

                    <td><input type='text' className="form-control" value={NewRow2[rowId].Peak_Inj_Press} name="Peak_Inj_Press" onChange={handleEditFormChange} /> </td>

                    <td> <input type='text' className="form-control" name="Viscosity" value={isNaN(Math.round(NewRow2[rowId].Viscosity)) ? '-' : Math.round(element.Viscosity)} readOnly /> </td>

                    <td>  <input type='text' className="form-control" name="Shear_Rate" value={isNaN(Number(element.Shear_Rate)) ? '-' : Number(element.Shear_Rate).toFixed(3)} readOnly /> </td>

                    <td> <input type='text' name="Absolute_Viscosity" value={rowId === 0 ? '-' : (isNaN(Math.round(NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity)) ? '-' : Math.round(NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity))} className="form-control" readOnly /></td>

                    <td> <input type='text' name="Drop_Viscosity" value={rowId === 0 ? '-' : (isNaN(Number(((NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity) * 100) / (NewRow2[rowId - 1].Viscosity))) ? '-' : (Number(((NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity) * 100) / (NewRow2[rowId - 1].Viscosity))).toFixed(1))} className="form-control" readOnly /></td>

                    <td> <i className="fa fa-trash viscocity_icons" onClick={() => deleteRow2(element)}></i> </td>
                  </tr>
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
