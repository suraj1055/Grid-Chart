import React from 'react'

const ReadRow = ({ setId, NewRow, rowId }) => {
    return (

         <tr key={rowId} onClick={(event) => setId(event, NewRow)}>
                <td> <input type='text' className="form-control" defaultValue={NewRow.Melt_Temp} /> </td>
                <td> <input type='text' className="form-control" defaultValue={NewRow.Low} /> </td>
                <td> <input type='text' className="form-control" defaultValue={NewRow.High} /> </td>
            </tr>
    )
}

export default ReadRow
