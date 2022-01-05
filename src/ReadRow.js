import React from 'react'

const ReadRow = ({ key1, setId, value, column, NewRow2, handleEditFormSubmit }) => {
    return (

         // onMouseOut we are calling that event because if we don't do it like this way then we need call it on a button click so every time user enter's value in any row, will need to click the button first and then can enter data into new row 

        <tr key={value.id} onClick={(event) => setId(event, value)} onMouseOut={handleEditFormSubmit}>

            {/* Now again the <td> depends on the number of object's column array is having, If there are two objects in the column array then two columns with two td's will be there. */}
            {column.map((index, key2) => (

                // The value in the td should the current row's so the defaultValue is given like this. 
                (<td> <input type='text' name={index.header} defaultValue={NewRow2[key1][index.header] || ''} className="form-control" readOnly /> </td>)

            ))}

        </tr>
    )
}

export default ReadRow
