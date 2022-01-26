import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Entity, PeopleInfo} from './Person/Person';
import {WorkTaskInfo, WorkTaskId} from './WorkTask/WorkTask'
import {TestPic} from './FileUploader/ImageViewer'

ReactDOM.render(
  <Entity />,
  document.getElementById('Person info')
);

ReactDOM.render(
  <PeopleInfo />,
  document.getElementById('PeopleInfo')
);
/*
ReactDOM.render(
  <WorkTaskId />,
  document.getElementById('WorkTaskId')
);
*/
ReactDOM.render(
  <WorkTaskInfo />,
  document.getElementById('WorkTaskInfo')
);

ReactDOM.render(
  <TestPic/>,
  document.getElementById('TestElem')
);

