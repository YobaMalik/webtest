import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter as Router, Route, Switch, Link  } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

var dataPipe = [
  { id: "Расчетное давление р =", value: '2' },
  { id: "Расчетная температура T =",  value: '5' },
  { id: "Допускаемое напряжение G =", value: '4' },
  { id: "Наружный диаметр =", value: '4' },
  { id: "Толщина", value: '4' }
];

function rowClassNameFormat(row, rowIdx) {
  // row is whole row object
  // rowIdx is index of row
  console.log(row)
  return row['name'] === 'George Michael' ?
      'GeorgeMichael-Row' : 'Other-Row';
}

class Table1 extends React.Component {
  render() {
      const cellEditProp = {
          mode: 'click', // 'dbclick' for trigger by double-click
          nonEditableColums: function () {
              return [1];
          }
      }
      
      return (
          <div>
              <BootstrapTable
                  data={this.props.data}
                  cellEdit={cellEditProp}
                  trClassName={rowClassNameFormat}>

                  <TableHeaderColumn isKey={ true} dataField='id'>
                      ID
        </TableHeaderColumn>
                  <TableHeaderColumn dataField='value' type=''>
                      Value
        </TableHeaderColumn>

              </BootstrapTable>

          </div>
      );
  }
}


class TestTable extends React.Component {
  render() {
      return (
          <>
            <div  className="App" >
              <p className="Table-header">Basic Table</p>
              <Table1 data={dataPipe} />
            </div>
          </>
      );
  }
}