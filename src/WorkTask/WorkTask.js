import React from 'react';
import ReactDOM from 'react-dom';


export class WorkTaskId extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  componentDidMount(){
    this.fetchInitialData();
  }
  
  fetchInitialData = () =>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch('http://192.168.12.152:8443/GetWorkTasks', requestOptions)
    .then(async response => {
      let data = await response.json();
      this.setState({data: data})
      if(!response.ok){
        alert("Безделье - это игрушка дьявола");
      }
    })
    .catch(error => {
      console.log(error);
    })
}
  render() {

    if (this.state.data === null) {
      return (
          <div>Подрочи-ка сучара ебаная </div>
      );
    } else {
      this.state.data.forEach(element => {
        console.log(element["id"]);
      });
      return (
        <form>
          <select>
            {this.state.data.map(element => {
              return (<option value = {element["id"]}> {element["id"]} </option>);
            }
            )}
          </select>
        </form>

      );
    }
  }
}

export class WorkTaskInfo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        project: "",
        taskId: "",
        taskExecutor: "",
        issueDate: "",
        productionDate: "",
        comment: ""
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      this.setState({
        [target.name]: target.value
      });
    }
  
    componentDidMount(){
      this.fetchInitialData();
    }
    
    fetchInitialData = () =>{
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
      };
      fetch('http://192.168.12.152:8443/GetWorkTasks', requestOptions)
      .then(async response => {
        let data = await response.json();
        console.log(data);
        if(!response.ok){
          alert("Безделье - это игрушка дьявола");
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

    fetchData = () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
              project: this.state.project,
              taskId: this.state.taskId,
              taskExecutor: this.state.taskExecutor,
              issueDate: this.state.issueDate,
              productionDate: this.state.productionDate, 
              comment: this.state.comment
            })
        };
        fetch('http://192.168.12.152:8443/SaveWorkTask', requestOptions)
        .then(async response => {
          console.log(response);
          let data = await response.json();
          if(response.ok){
            alert("Создано");
          } else{
            alert("Безделье - это игрушка дьявола");
          }
        })
        .catch(error => {
          console.log(error);
        })
    }


    render() {
      return (
        <form>

          <label>
            Комментарий
            <input
              name="comment"
              type="text"
              value={this.state.comment}
              onChange={this.handleInputChange} />
          </label>

          <br />

          <label>
            Проект
            <input
              name="project"
              type="text"
              value={this.state.project}
              onChange={this.handleInputChange} />
          </label>

          <br />

          <label>
            Номер задачи:
            <input
              name="taskId"
              type="text"
              value={this.state.taskId}
              onChange={this.handleInputChange} />
          </label>
          
          <div>
            <button onClick={this.fetchData}>
              Ежже
            </button>
          </div>
        </form>
        
      );
    }
  }