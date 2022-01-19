import React from 'react';
import Table from 'react-bootstrap/Table';
import './App.css';
import EditRow from './EditRow';
import ReadRow from './ReadRow';

const Grid = ({ Melting, Hydraulic, NewRow2, setId, handleEditFormChange, handleEditFormSubmit, isRowId, editFormData }) => {
    return (
        <>
            <div className="Cold-Grid-Container">
                <form autoComplete="off">
                    <div className="cold_table">

                        {/* This is a Bootstrap Table */}

                        <Table striped bordered hover responsive variant="light">
                            <thead>
                                <tr>
                                    <th> <h6> {Melting} </h6> </th>

                                    <th> <h6> Low {Hydraulic} </h6> </th>

                                    <th> <h6> High {Hydraulic} </h6> </th>
                                </tr>
                            </thead>
                            <tbody className="grid_style" onMouseOut={handleEditFormSubmit}>
                                {NewRow2.map((NewRow, rowId) => (
                                    <>
                                        {isRowId === NewRow.id ?
                                            (
                                                <EditRow NewRow={NewRow} setId={setId} NewRow2={NewRow2} handleEditFormChange={handleEditFormChange} rowId={rowId} editFormData={editFormData} />
                                            )
                                            :
                                            (
                                                <ReadRow NewRow={NewRow} NewRow2={NewRow2} setId={setId} rowId={rowId} editFormData={editFormData} />
                                            )}
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
