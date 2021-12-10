import React from 'react'

const edit = ({ setId, NewRow2, handleEditFormChange, deleteRow2, NewRow, rowId }) => {
    return (
        <tr onClick={() => setId(NewRow.id)}>

            <td> <input type='text' className="form-control" /> </td>

            <td> <input type='text' className="form-control" /> </td>

            <td> <input type='text' className="form-control" /> </td>

            <td> <input type='text' className="form-control" /> </td>

            <td> <input type='text' className="form-control" /> </td>

            <td> <input type='text' name="Absolute_Viscosity" /></td>

            <td> <input type='text' name="Drop_Viscosity"/></td>

            <td> <i className="fa fa-trash viscocity_icons" onClick={() => deleteRow2(NewRow)}></i> </td>
        </tr>
    )
}

export default edit
