import React, { useState} from 'react';
// column and Newrow2 array are holding this data.
import { data2 } from './data.js';
import {
  ChartComponent,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Category,
  DataLabel,
  Inject,
} from '@syncfusion/ej2-react-charts';

import Grid from './Grid.js';
import './App.css';
import { Button } from 'reactstrap';

const App = () => {
  // Array's required for column/row generation and storing data

  // An object in which we Initially store the new values entered in row/column.
  const [editFormData, setEditFormData] = useState({
    Melt_Temp: "",
    Low: "",
    High: ""
  })

  //When clicked on row set's the id of that row in itself and help's to switch between editable and readOnly row.
  const [isRowId, setIsRowId] = useState(null);

  //Main Array in which all the entered data will be stored and passed to chart.
  const [NewRow2, setNewRow2] = useState(data2);

  const [Melting, setMelting] = useState("Melt Temp");
  const [Hydraulic, setHydraulic] = useState("Hydraulic");
  var centerPoints = [];
  const [chartData, setChartData] = useState([]);


  // Event's to add data into the array/objects

  // As the user enter's data in the row this event get's call and get's the name of that input field and value and initially stores in editFormData.
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  // Set's the id of the row, value is coming from Grid Component map function
  const setId = (event, NewRow) => {

    event.preventDefault();

    setIsRowId(NewRow.id);

    const formValues = {
      Melt_Temp: NewRow.Melt_Temp,
      Low: NewRow.Low,
      High: NewRow.High,
    }

    setEditFormData(formValues);
  }

  // Once the data in inside editFormData then using isRowId we check exactly in which row data has been entered and replace that row object with the newObject created over here.
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedValue = {
      id: isRowId,
      Melt_Temp: editFormData.Melt_Temp,
      Low: editFormData.Low,
      High: editFormData.High
    }

    const newValues = [...NewRow2];

    const index = NewRow2.findIndex((value) => value.id === isRowId)

    newValues[index] = editedValue;

    setNewRow2(newValues);

    setIsRowId(null);
  }

  // Just to check whether the data has entered in the array once done storing the data
  const showArray = () => {
    setChartData(polygonData)

    console.log(polygonData)
    console.log(centerPoints)

    center(Coordinates);
  };

  // An object which will be used to plot the polygon the data we are getting from NewRow2 array
  const polygonData = [
    { x: parseFloat(NewRow2[0]["Melt_Temp"]), y: parseFloat(NewRow2[0]["Low"]) },
    { x: parseFloat(NewRow2[1]["Melt_Temp"]), y: parseFloat(NewRow2[1]["Low"]) },
    { x: parseFloat(NewRow2[1]["Melt_Temp"]), y: parseFloat(NewRow2[1]["High"]) },
    { x: parseFloat(NewRow2[0]["Melt_Temp"]), y: parseFloat(NewRow2[0]["High"]) },
    { x: parseFloat(NewRow2[0]["Melt_Temp"]), y: parseFloat(NewRow2[0]["Low"]) }
  ]

  // The array which we pass in the function below to get the values of centroid.
  var Coordinates = [
    { x: parseFloat(NewRow2[0]["Melt_Temp"]), y: parseFloat(NewRow2[0]["Low"]) },
    { x: parseFloat(NewRow2[1]["Melt_Temp"]), y: parseFloat(NewRow2[1]["Low"]) },
    { x: parseFloat(NewRow2[1]["Melt_Temp"]), y: parseFloat(NewRow2[1]["High"]) },
    { x: parseFloat(NewRow2[0]["Melt_Temp"]), y: parseFloat(NewRow2[0]["High"]) },
    { x: parseFloat(NewRow2[0]["Melt_Temp"]), y: parseFloat(NewRow2[0]["Low"]) }
  ]

  // Event to calculate the centroid of the polygon it gives the center coordinate
  function center(Coordinates) {

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    function Region(points) {
      this.points = points || [];
      this.length = points.length;
    }

    Region.prototype.area = function () {
      var area = 0,
        i,
        j,
        point1,
        point2;

      for (i = 0, j = this.length - 1; i < this.length; j = i, i++) {
        point1 = this.points[i];
        point2 = this.points[j];
        area += point1.x * point2.y;
        area -= point1.y * point2.x;
      }
      area /= 2;

      return area;
    };

    Region.prototype.centroid = function () {
      var x = 0,
        y = 0,
        i,
        j,
        f,
        point1,
        point2;

      for (i = 0, j = this.length - 1; i < this.length; j = i, i++) {
        point1 = this.points[i];
        point2 = this.points[j];
        f = point1.x * point2.y - point2.x * point1.y;
        x += (point1.x + point2.x) * f;
        y += (point1.y + point2.y) * f;
      }

      f = this.area() * 6;

      return new Point(Number(x / f).toFixed(0), Number(y / f).toFixed(1));
    };

    var polygon = Coordinates,
      region = new Region(polygon);

    centerPoints.push(region.centroid())
  }

  return (
    <>

      {/* Grid Component */}
      <div className="Grid m-4">
        <Grid
         Melting={Melting} Hydraulic={Hydraulic} NewRow2={NewRow2} setId={setId} handleEditFormChange={handleEditFormChange} handleEditFormSubmit={handleEditFormSubmit} isRowId={isRowId} editFormData={editFormData}
        />
      </div>

      {/* Button just to show the Array on the console so that we can check new values have got added and to call that function to calculate the centroid*/}
      <div>
        <Button color="primary" className="m-4" onClick={showArray}>
          {' '}
          Show Graph
        </Button>
      </div>

      <div>
        <ChartComponent title="Cosmetic Process Study" width="1100" primaryXAxis={{ valueType: "Category", title: 'Melting' }} primaryYAxis={{ title: 'Hydraulic' }}>

          <Inject services={[LineSeries, Category, DataLabel]} />

          <SeriesCollectionDirective>

            <SeriesDirective type="Line" dataSource={chartData} xName="x" yName="y" marker={{ visible: true }} ></SeriesDirective>

            <SeriesDirective type="Line" dataSource={centerPoints} xName="x" yName="y" marker={{ dataLabel: { visible: true }, visible: true }} ></SeriesDirective>

          </SeriesCollectionDirective>

        </ChartComponent>
      </div>
    </>
  );
};

export default App;
