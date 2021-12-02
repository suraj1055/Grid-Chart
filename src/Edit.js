import React from 'react'

const edit = ({ setId, NewRow2, handleEditFormChange, deleteRow2, NewRow, rowId }) => {
    return (
        <tr onClick={() => setId(NewRow.id)}>

            <td> <input type='text' className="form-control" name="Injection_Speed" defaultValue={NewRow2[rowId].Injection_Speed}  onChange={handleEditFormChange}/> </td>

            <td> <input type='text' className="form-control" name="Fill_Time" defaultValue={NewRow.Fill_Time} onChange={handleEditFormChange}/> </td>

            <td> <input type='text' className="form-control" name="Peak_Inj_Press" defaultValue={NewRow.Peak_Inj_Press} onChange={handleEditFormChange}/> </td>

            <td> <input type='text' className="form-control" name="Viscosity" value={ NewRow2[rowId].Viscosity === parseInt(0) ? ('-') : (Math.round(NewRow2[rowId].Viscosity) )} readOnly/> </td>

            <td> <input type='text' className="form-control" name="Shear_Rate" value={isNaN(Number(NewRow.Shear_Rate)) ? '-' : Number(NewRow.Shear_Rate).toFixed(3)} readOnly/> </td>

            <td> <input type='text' className="form-control" name="Absolute_Viscosity" value={ NewRow.id === 0 ? ('-') : ( NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity === 0 ? '-' : ( Math.round(NewRow2[rowId - 1].Viscosity - NewRow2[rowId].Viscosity) ) ) } readOnly/> </td>

            <td> <input type='text' className="form-control" name="Drop_Viscosity" value={ NewRow.id === 0 ? ('-') : ('yes') } readOnly/> </td>

            <td> <i className="fa fa-trash viscocity_icons" onClick={() => deleteRow2(NewRow)}></i> </td>
        </tr>
    )
}

export default edit
