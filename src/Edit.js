import React from 'react'

const edit = ({ setId, NewRow2, handleEditFormChange, deleteRow2, NewRow, rowId }) => {
    return (
        <tr onClick={() => setId(NewRow.id)}>

            <td> {NewRow.id} </td>

            <td> <input type='text' className="form-control" name="Injection_Speed" defaultValue={NewRow.Injection_Speed}  onChange={handleEditFormChange}/> </td>

            <td> <input type='text' className="form-control" name="Fill_Time" defaultValue={NewRow.Fill_Time} onChange={handleEditFormChange}/> </td>

            <td> <input type='text' className="form-control" name="Peak_Inj_Press" defaultValue={NewRow.Peak_Inj_Press} onChange={handleEditFormChange}/> </td>

            <td> <input type='text' className="form-control" name="Viscosity" value={isNaN(Math.round(NewRow.Viscosity)) ? '-' : Math.round(NewRow.Viscosity)} readOnly/> </td>

            <td> <input type='text' className="form-control" name="Shear_Rate" value={isNaN(Number(NewRow.Shear_Rate)) ? '-' : Number(NewRow.Shear_Rate).toFixed(3)} readOnly/> </td>

            <td> <input type='text' className="form-control" name="Absolute_Viscosity" value={rowId === 0 ? '-' : (isNaN(Math.round(NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity)) ? '-' : Math.round(NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity))} readOnly/> </td>

            <td> <input type='text' className="form-control" name="Drop_Viscosity" value={rowId === 0 ? '-' : (isNaN(Number(((NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity) * 100) / (NewRow2[rowId - 1].Viscosity))) ? '-' : (Number(((NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity) * 100) / (NewRow2[rowId - 1].Viscosity))).toFixed(1))} readOnly/> </td>

            <td> <i className="fa fa-trash viscocity_icons" onClick={() => deleteRow2(NewRow)}></i> </td>
        </tr>
    )
}

export default edit
