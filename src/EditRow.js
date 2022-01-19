import React from 'react'

const EditRow = ({ handleEditFormChange, rowId, editFormData, }) => {
    return (

        // onMouseOut we are calling that event because if we don't do it like this way then we need call it on a button click so every time user enter's value in any row, will need to click the button first and then can enter data into new row 

        <tr key={rowId}>
            <td> <input type='text' className="form-control" name="Melt_Temp" value={editFormData.Melt_Temp} onChange={handleEditFormChange} /> </td>
            <td> <input type='text' className="form-control" name="Low" value={editFormData.Low} onChange={handleEditFormChange} /> </td>
            <td> <input type='text' className="form-control" name="High" value={editFormData.High} onChange={handleEditFormChange} /> </td>
        </tr>
    )
}

export default EditRow
