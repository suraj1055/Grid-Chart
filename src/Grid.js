import React from 'react';
import Table from 'react-bootstrap/Table';
import './App.css';
import EditRow from './EditRow';
import ReadRow from './ReadRow';

const Grid = ({ column, deleteColumn, NewRow2, deleteRow2, handleEditFormChange, handleEditFormSubmit, setId, isRowId }) => {
    return (
        <>
            <div className="Cold-Grid-Container">
                <form autoComplete="off">
                    <div className="cold_table">

                        {/* This is a Bootstrap Table */}
                        
                        <Table striped bordered hover responsive variant="light">

                            {/* Using column Array So that we can Generate column's  */}

                            <thead>
                                <tr>

                                    {/* Mapping over column array because as the object is pushed in the column array new column's gets generated in the table */}

                                    {column.map((value, key) => (
                                        <>

                                            {/* Since two columns are going to be static we are checking which column array object is having delete key as true, we'll display delete icon to that column only. */}

                                            {value.delete === false ? (<th>
                                                <div className="table-heading-content">
                                                    <div className="table-heading">
                                                        <h6> {value.header} </h6>
                                                    </div>
                                                </div>
                                            </th>) : (<th>
                                                <div className="table-heading-content">
                                                    <div className="table-heading">
                                                        <h6> {value.header} </h6>
                                                    </div>
                                                    <div className="table-heading-icons">
                                                        <div> <i className="fa fa-trash" onClick={() => deleteColumn(value.id)} ></i> </div>
                                                    </div>
                                                </div>
                                            </th>)}
                                        </>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="grid_style">

                                {/* Now here initially Five row's will be displayed because there are Five objects in the NewRow2 Array and the rest as user clicks on any row isRowId gets set and according to that here Editable and Readonly Row gets displayes */}

                                {NewRow2.map((value, key1) => (
                                    <>
                                        {isRowId === value.id ?
                                            (<EditRow key1={key1} setId={setId} value={value} column={column} NewRow2={NewRow2} handleEditFormChange={handleEditFormChange} deleteRow2={deleteRow2} handleEditFormSubmit={handleEditFormSubmit} />)
                                            :
                                            (<ReadRow key1={key1} setId={setId} value={value} column={column} NewRow2={NewRow2} handleEditFormChange={handleEditFormChange} deleteRow2={deleteRow2} handleEditFormSubmit={handleEditFormSubmit} />)
                                        }
                                    </>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Grid
