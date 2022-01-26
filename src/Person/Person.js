import React from 'react';
import ReactDOM from 'react-dom';

export class ButtonTestClass extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          request: "",
          error: ""
      };
  }
  
  componentDidMount(){
    this.fetchData();
  }
  
  fetchData = () =>{
      const requestOptions = {
        crossDomain:true,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
      };
      fetch('http://192.168.12.152:8443/GetOnePerson', requestOptions)
      .then(async response => {
        let data = await response.json();
        console.log (data);
        if(response.ok){
          this.setState({request: data});
          console.log(data);
        } else{
          this.setState({ error: response.status });
        }
      })
      .catch(error => {
        console.log(error);
      })

  }
  
  render() {
    if (this.state.request === null) {
      return (
          <div>Подрочи-ка сучара ебаная </div>
      );
    } else {
      const person  = this.state.request;
      return (
        <div>
          <button onClick={this.fetchData}>
            Запрос
          </button>
          Имя: 
          <input defaultValue={person["firstName"]} />
        </div>
      );
    }
  }
  }


export class Entity extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          request: null
      };
  }
  
  fetchData = () =>{
    
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'}
      };
      fetch('http://192.168.12.152:8443/GetOnePerson', requestOptions)
      .then(async response => {
        let data = await response.json();
        if(response.ok){
          this.setState({request: data});
          console.log(data);
        } else{
          this.setState({ error: response.status });
        }
      })
      .catch(error => {
        console.log(error);
      })
  
  }
  
  render() {
  
    if (this.state.request === null) {
      return (
        <button onClick={this.fetchData}>
        Запрос
      </button>
      );
    } else {
      const person  = this.state.request;
      return (
        <div>
          <button onClick={this.fetchData}>
            Запрос
          </button>
          <div>Имя: {person.firstName }</div>
          <div>Фамилия: {person.lastName}</div>
          <div>Отчество: {person.middleName}</div>
          <div>E-mail: {person.email}</div>
        </div>
      );
    }
  }
  }

  export class PeopleInfo extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
          quantity: null,
          error: null
      };
  }
  
  changeQuantity(e){
    this.setState({ quantity: e.target.value});
}
  
  fetchData = () =>{
    console.log(this.state.quantity);
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({
            quantity: this.state.quantity,
            message: "",
            phone: ""
          })
      };
      fetch('http://192.168.12.152:8443/CreatePeopleInfo', requestOptions)
      .then(async response => {
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
        <div>
          <button onClick={this.fetchData}>
            Ежже
          </button>
          Количество: 
          <input type="number" onChange={ this.changeQuantity.bind(this) }/>
         
        </div>
      );
    }
  
}