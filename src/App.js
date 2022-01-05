import React, { useState } from 'react'
// column and Newrow2 array are holding this data.
import { data, data2 } from './data.js'
import { ChartComponent, LineSeries, SeriesCollectionDirective, SeriesDirective, Category, DataLabel, Inject } from '@syncfusion/ej2-react-charts';

// Generates random id's
import { nanoid } from 'nanoid';
import Grid from './Grid.js';
import './App.css';
import { Button } from 'reactstrap';

const App = () => {

    // Array's required for column/row generation and storing data

    // Will store the name of our header as the user enter's.
    const [header, setHeader] = useState();

    // Is an Array which store's object's/json on which we apply map function and generate columns.
    const [column, setColumn] = useState(data);

    //A Variable which stores the name of Y-axis.
    const [grid2, setGrid2] = useState("");

    // An object in which we Initially store the new values entered in row/column.
    const [editFormData, setEditFormData] = useState();

    //When clicked on row set's the id of that row in itself and help's to switch between editable and readOnly row.
    const [isRowId, setIsRowId] = useState(null)

    //Main Array in which all the entered data will be stored and passed to chart.
    const [NewRow2, setNewRow2] = useState(data2);

    // Event's to deal with column/row generation.

    // Will set the header variable.
    const addHeader = (e) => {
        e.preventDefault();
        setHeader(e.target.value)
    }

    // Will store a new Object in the column Array with an id and the above header.
    const addColumn = () => {
        if (!header) {

        }
        else {
            const newColumn = { id: nanoid(), header: header }
            setColumn([...column, newColumn]);
            setHeader("");
        }
    };

    // As clicked on the delete icon id of the column get's passed and it filter's out that column.
    const deleteColumn = (id) => {
        const updatedColumns = column.filter((index) => {
            return index.id !== id;
        })
        setColumn(updatedColumns)
    }

    // Event's to add data into the array/objects

    // As the user enter's data in the row this event get's call and get's the name of that input field and value and initially stores in editFormData.
    const handleEditFormChange = (event) => {

        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData }
        newFormData[fieldName] = fieldValue

        setEditFormData(newFormData)
    }

    // Set's the id of the row, value is coming from Grid Component map function
    const setId = (event, value) => {

        event.preventDefault();

        setIsRowId(value.id);

        // To store the current row object
        const formValues = Object.assign({}, value)

        setEditFormData(formValues);

    }

    // Once the data in inside editFormData then using isRowId we check exactly in which row data has been entered and replace that row object with the newObject created over here.
    const handleEditFormSubmit = (event) => {

        event.preventDefault()

        // A local object is which we put editFormData with the id of that respective row.
        const editedValue = { id: isRowId }

        const newObject = Object.assign(editedValue, editFormData);

        //Storing the Row's Array in a new local array
        const newValues = [...NewRow2];

        // Checking in which row has data
        const index = NewRow2.findIndex((value) => value.id === isRowId);

        //Replacing the object with new object
        newValues[index] = newObject;

        //Finally storing the local array in our main array after the changes has been done
        setNewRow2(newValues);

        setIsRowId(null);

    }

    // Just to check whether the data has entered in the array once done storing the data
    const showArray = () => {
        console.log(NewRow2)
    }

    return (
        <>
            {/* Input field and a button so that user can add new column's. */}
            <div className='mb-4'>
                <input type="text" className='m-4' placeholder="Enter Column Header" name="header" onChange={addHeader} />
                <Button color="primary" onClick={addColumn}> Add </Button>
            </div>

            {/* Grid Component */}
            <div className='Grid m-4'>
                <Grid deleteColumn={deleteColumn} column={column} addHeader={addHeader} setHeader={setHeader} addColumn={addColumn} NewRow2={NewRow2} handleEditFormChange={handleEditFormChange} handleEditFormSubmit={handleEditFormSubmit} setId={setId} isRowId={isRowId} editFormData={editFormData} />
            </div>

            {/* Button just to show the Array on the console so that we can check new values have got added */}
            <div>
                <Button color="primary" className='m-4' onClick={showArray}> Show Array on Console </Button>

                {/* Drop Down so that user can select which column's data should displayed on the chart */}
                <select className='m-4' onClick={(e) => setGrid2(e.target.value)}>
                    {column.map((value, key) => (
                        <option>
                            {value.id === 0 ? '-' :  value.header }
                        </option>
                    ))}
                </select>
            </div>

            <div>
                {/* grid2 will be varying because user will be changing the Y-axis so the title will be changed */}
                <ChartComponent width="1000" title="Cold Runner" primaryXAxis={{ valueType: "Category", title: "Time" }} primaryYAxis={{ title: `${grid2}` }}>
                    <Inject services={[LineSeries, Category, DataLabel]} />
                    <SeriesCollectionDirective>

                        {/* NewRow2 is the name of the Array which contains our data and again grid2 will be varying */}
                        <SeriesDirective type="Line" dataSource={NewRow2} xName="Time" yName={grid2} marker={{ dataLabel: { visible: true }, visible: true }} ></SeriesDirective>

                    </SeriesCollectionDirective>

                </ChartComponent>
            </div>

        </>
    )
}

export default App
