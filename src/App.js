import { useState } from "react";
import Table from "react-bootstrap/Table";
import './App.css'

const App = () => {
  const row1 = [];
  const [row, setRow] = useState();
  const [NewRow, setNewRow] = useState([]);
  const [NewRow2, setNewRow2] = useState([0,1,2,3,4]);
  const [allRowsAdded, updateAllRows] = useState(0);

  const [IntensificationRatio, setIntensificationRatio] = useState()

  const [editFormData, setEditFormData] = useState({
    Injection_Speed: "",
    Fill_Time: "",
    Peak_Inj_Press: "",
    Viscosity: "",
    Shear_Rate: ""
  })

  const [editFormData2, setEditFormData2] = useState({
    Injection_Speed2: "",
    Fill_Time2: "",
    Peak_Inj_Press2: "",
    Viscosity2: "",
    Shear_Rate2: ""
  })

  const [isRowId, setIsRowId] = useState(null)

  // const [isRowId2, setIsRowId2] = useState(null)

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  // const handleEditFormChange2 = (event) => {
  //   event.preventDefault();

  //   const fieldName2 = event.target.getAttribute("name");
  //   const fieldValue2 = event.target.value;

  //   const newFormData2 = { ...editFormData2 };
  //   newFormData2[fieldName2] = fieldValue2;

  //   setEditFormData2(newFormData2);
  // }

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

      // const editedValue2 = {
      //   id: isRowId2,
      //   Injection_Speed2: editFormData2.Injection_Speed2,
      //   Fill_Time2: editFormData2.Fill_Time2,
      //   Peak_Inj_Press2: editFormData2.Peak_Inj_Press2,
      //   Viscosity2: editFormData2.Fill_Time2 * editFormData2.Peak_Inj_Press2 * IntensificationRatio,
      //   Shear_Rate2: 1 / editFormData2.Fill_Time2,
      // }

      const newValues = [...NewRow2];

      // const newValues2 = [...NewRow];

      const index = NewRow2.findIndex((value) => value === isRowId)

      // const index2 = NewRow.findIndex((value) => value === isRowId2)

      newValues[index] = editedValue;
      
      // newValues2[index2] = editedValue2;
      
      setNewRow2(newValues);

      // setNewRow(newValues2);
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

  // const deleteRow = (id) => {
  //   const updatedRows = [...NewRow].filter((rowId) => {
  //     return rowId !== id;
  //   });
  //   setNewRow(updatedRows);
  // };

  const deleteRow2 = (id) => {
    const updatedRows = [...NewRow2].filter((rowId) => {
      return rowId !== id;
    });
    setNewRow2(updatedRows);
  };

  const setId = (id) => {
    setIsRowId(id);
  }

  // const setId2 = (id) => {
  //   setIsRowId2(id);
  // }

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
              {NewRow2.map((element, rowId) => {
                return (
                  <tr key={rowId}>

                    <td> <input type='text' className="form-control" defaultValue={element.Injection_Speed} name="Injection_Speed" onChange={handleEditFormChange} onClick={() => setId(rowId)} /> </td>

                    <td> <input type='text' className="form-control" defaultValue={element.Fill_Time} name="Fill_Time" onChange={handleEditFormChange} onClick={() => setId(rowId)} /></td>

                    <td><input type='text' className="form-control" defaultValue={element.Peak_Inj_Press} name="Peak_Inj_Press" onChange={handleEditFormChange} onClick={() => setId(rowId)} /> </td>

                    <td> <input type='text' className="form-control" name="Viscosity" value={isNaN(Math.round(element.Viscosity)) ? '-' : Math.round(element.Viscosity)} readOnly/> </td>

                    <td>  <input type='text' className="form-control" name="Shear_Rate" value={isNaN(Number(element.Shear_Rate)) ? '-' : Number(element.Shear_Rate).toFixed(3)} readOnly/> </td>

                    <td> <input type='text' name="Absolute_Viscosity" value={ rowId === 0 ? '-' : (isNaN( Math.round(NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity) ) ? '-' : Math.round(NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity) )} className="form-control" readOnly/></td>

                    <td> <input type='text' name="Drop_Viscosity" value={ rowId === 0 ? '-' : (isNaN(Number( ( ( NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity ) * 100) / ( NewRow2[rowId - 1].Viscosity ) ) ) ? '-' : ( Number( ( ( NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity ) * 100) / ( NewRow2[rowId - 1].Viscosity ) ) ).toFixed(1) ) } className="form-control" readOnly/></td>

                    <td> <i className="fa fa-trash viscocity_icons" onClick={() => deleteRow2(element)}></i> </td>
                  </tr>
                )
              })}
              {/* {NewRow.map((element, rowId) => {
                return (
                  <tr key={rowId}>

                    <td> <input type='text' className="form-control" defaultValue={element.Injection_Speed2} name="Injection_Speed2" onChange={handleEditFormChange2} onClick={() => setId2(rowId)} /> </td>

                    <td> <input type='text' className="form-control" defaultValue={element.Fill_Time2} name="Fill_Time2" onChange={handleEditFormChange2} onClick={() => setId2(rowId)} /></td>

                    <td><input type='text' className="form-control" defaultValue={element.Peak_Inj_Press2} name="Peak_Inj_Press2" onChange={handleEditFormChange2} onClick={() => setId2(rowId)} /> </td>

                    <td> <input type='text' className="form-control" name="Viscosity2" value={isNaN(Math.round(element.Viscosity2)) ? '-' : Math.round(element.Viscosity2)} readOnly/> </td>

                    <td>  <input type='text' className="form-control" name="Shear_Rate2" value={isNaN(Number(element.Shear_Rate2)) ? '-' : Number(element.Shear_Rate2).toFixed(3)} readOnly/> </td>

                    <td> <input type='text' name="Absolute_Viscosity2" value={ rowId === 0 ? '-' : (isNaN( Math.round(NewRow[rowId - 1].Viscosity2 - NewRow[rowId].Viscosity2) ) ? '-' : Math.round(NewRow[rowId - 1].Viscosity2 - NewRow[rowId].Viscosity2) )} className="form-control" readOnly/></td>

                    <td> <input type='text' name="Drop_Viscosity2" value={ rowId === 0 ? '-' : (isNaN(Number( ( ( NewRow[rowId - 1].Viscosity2 - NewRow[rowId].Viscosity2 ) * 100) / ( NewRow[rowId - 1].Viscosity2 ) ) ) ? '-' : ( Number( ( ( NewRow[rowId - 1].Viscosity2 - NewRow[rowId].Viscosity2 ) * 100) / ( NewRow[rowId - 1].Viscosity2 ) ) ).toFixed(1) ) } className="form-control" readOnly/></td>

                    <td> <i className="fa fa-trash viscocity_icons" onClick={() => deleteRow(element)}></i> </td>
                  </tr>
                )
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
