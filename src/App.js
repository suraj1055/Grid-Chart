import { useState } from "react";
import Table from "react-bootstrap/Table";
import './App.css'

const App = () => {
  const row1 = [];
  const [row, setRow] = useState();
  const [NewRow, setNewRow] = useState([]);
  const [NewRow2, setNewRow2] = useState([0,1,2,3,4]);
  const [allRowsAdded, updateAllRows] = useState(0);
  const [viscosity, setViscosity] = useState([]);

  const [IntensificationRatio, setIntensificationRatio] = useState()
  const [editFormData, setEditFormData] = useState({
    Injection_Speed: "",
    Fill_Time: "",
    Peak_Inj_Press: "",
    Viscosity: "",
    Shear_Rate: "",
    Absolute_Drop_Viscosity: ""
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
        Shear_Rate: 1 / editFormData.Fill_Time
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
    for (let i = 1; i < parseInt(row); i++) {
      row1[i+5] = allRowsAdded + i;
    }
    updateAllRows((allRowsAdded) => allRowsAdded + parseInt(row));
    setNewRow([...NewRow, ...row1]);

  };

  const deleteRow = (id) => {
    const updatedRows = [...NewRow].filter((rowId) => {
      return rowId !== id;
    });
    setNewRow(updatedRows);
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
        <form >
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
                  <tr key={rowId}>

                    <td> <input type='text' className="form-control" defaultValue={element.Injection_Speed} name="Injection_Speed" onChange={handleEditFormChange} onClick={() => demo(rowId)} /> </td>

                    <td> <input type='text' className="form-control" defaultValue={element.Fill_Time} name="Fill_Time" onChange={handleEditFormChange} onClick={() => demo(rowId)}/></td>

                    <td><input type='text' className="form-control" defaultValue={element.Peak_Inj_Press} name="Peak_Inj_Press" onChange={handleEditFormChange} onClick={() => demo(rowId)}/> </td>

                    <td> <input type='text' className="form-control" name="Viscosity" value={isNaN(Math.round(element.Viscosity)) ? '-' : Math.round(element.Viscosity) } onChange={handleEditFormChange} onClick={() => demo(rowId)} readOnly/> </td>

                    <td>  <input type='text' className="form-control" name="Shear_Rate" value={isNaN(Number(element.Shear_Rate).toFixed(3)) ? '-' : Number(element.Shear_Rate).toFixed(3)} readOnly /> </td>

                    <td> <input type='text' className="form-control" readOnly /></td>

                    <td> <input type='text' className="form-control" readOnly /></td>

                    <td> <i className="fa fa-trash viscocity_icons" onClick={() => deleteRow2(element)}></i> </td>
                  </tr>
                )
              })}
              {NewRow.map((rowId) => {
              return (
                <tr key={rowId}>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <input type="text" className="form-control" />
                  </td>
                  <td>
                    <input type="text" className="form-control" readOnly />
                  </td>
                  <td>
                    <input type="text" className="form-control" readOnly />
                  </td>
                  <td>
                    <input type="text" className="form-control" readOnly />
                  </td>
                  <td>
                    <input type="text" className="form-control" readOnly />
                  </td>
                  <td>
                    <i
                      className="fa fa-trash viscocity_icons"
                      onClick={() => deleteRow(rowId)}
                    >
                    </i>
                  </td>
                </tr>
              );
            })}
            </tbody>
          </Table>
         
        </form>
      </div>
    </>
  );
};

export default App;
