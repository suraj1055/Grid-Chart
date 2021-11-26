import { useState } from "react";
import Table from "react-bootstrap/Table";
import './App.css'

const App = () => {
  const row1 = [];
  const [row, setRow] = useState();
  const [NewRow, setNewRow] = useState([]);
  const [NewRow2, setNewRow2] = useState([1, 2, 3, 4, 5]);
  const [allRowsAdded, updateAllRows] = useState(0);

  const [IntensificationRatio, setIntensificationRatio] = useState()
  const [editFormData, setEditFormData] = useState({
    Injection_Speed: "",
    Fill_Time: "",
    Peak_Inj_Press: ""
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
        Peak_Inj_Press: editFormData.Peak_Inj_Press
      }

      const newValues = [...NewRow2];

      const index = NewRow2.findIndex((value) => value === isRowId)

      newValues[index] = editedValue;
      
      setNewRow2(newValues);
      console.log(NewRow2)
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
    setNewRow([...NewRow, ...row1]);

  };

  const deleteRow = (id) => {
    const updatedRows = [...NewRow].filter((rowId) => {
      return rowId !== id;
    });
    setNewRow(updatedRows);
  };

  const deleteRow2 = (id) => {
    const updatedRows = [...NewRow2].filter((rowId) => {
      return rowId !== id;
    });
    setNewRow2(updatedRows);
  };

  const demo = (id) => {
    setIsRowId(id)
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
        <form onSubmit={handleEditFormSubmit} >
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
              {NewRow2.map((rowId) => {
                return (
                  <tr key={rowId}>

                    <td> <input type='text' className="form-control" defaultValue={rowId.Injection_Speed} name="Injection_Speed" onChange={handleEditFormChange} onClick={() => demo(rowId)} /> </td>

                    <td> <input type='text' className="form-control" defaultValue={rowId.Fill_Time} name="Fill_Time" onChange={handleEditFormChange} onClick={() => demo(rowId)} /></td>

                    <td><input type='text' className="form-control" defaultValue={rowId.Peak_Inj_Press} name="Peak_Inj_Press" onChange={handleEditFormChange} onClick={() => demo(rowId)} /> </td>

                    <td> {Math.round(rowId.Fill_Time * rowId.Peak_Inj_Press * IntensificationRatio)} </td>

                    <td> {(1 / rowId.Fill_Time).toFixed(3)} </td>

                    <td> <input type='text' className="form-control" readOnly /></td>

                    <td> <input type='text' className="form-control" readOnly /></td>

                    <td> <i className="fa fa-trash viscocity_icons" onClick={() => deleteRow2(rowId)}></i> </td>
                  </tr>
                )
              })}
              {/* {NewRow.map((rowId) => {
              return (
                <tr key={rowId}>
                  <td> {rowId} </td>
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
            })} */}
            </tbody>
          </Table>
          <button type="submit"> Calculate </button>
        </form>
      </div>
    </>
  );
};

export default App;
