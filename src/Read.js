import React from 'react'

const Read = ({ rowId, setId, NewRow2, handleEditFormChange, element, deleteRow2, editableRow }) => {
    return (

        <tr key={rowId} onClick={() => setId(rowId)}>

            <td> {rowId} </td>

            <td> <input type='text' className="form-control" defaultValue={NewRow2[rowId].Injection_Speed} name="Injection_Speed" onClick={() => { editableRow(rowId) }} readOnly/> </td>

            <td> <input type='text' className="form-control" defaultValue={NewRow2[rowId].Fill_Time} name="Fill_Time" readOnly/></td>

            <td><input type='text' className="form-control" defaultValue={NewRow2[rowId].Peak_Inj_Press} name="Peak_Inj_Press" readOnly/> </td>

            <td> <input type='text' className="form-control" name="Viscosity" value={isNaN(Math.round(element.Viscosity)) ? '-' : Math.round(element.Viscosity)} readOnly /> </td>

            <td>  <input type='text' className="form-control" name="Shear_Rate" value={isNaN(Number(element.Shear_Rate)) ? '-' : Number(element.Shear_Rate).toFixed(3)} readOnly /> </td>

            <td> <input type='text' name="Absolute_Viscosity" value={rowId === 0 ? '-' : (isNaN(Math.round(NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity)) ? '-' : Math.round(NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity))} className="form-control" readOnly /></td>

            <td> <input type='text' name="Drop_Viscosity" value={rowId === 0 ? '-' : (isNaN(Number(((NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity) * 100) / (NewRow2[rowId - 1].Viscosity))) ? '-' : (Number(((NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity) * 100) / (NewRow2[rowId - 1].Viscosity))).toFixed(1))} className="form-control" readOnly /></td>

            <td> <i className="fa fa-trash viscocity_icons" onClick={() => deleteRow2(element)}></i> </td>
        </tr>

    )
}

export default Read
