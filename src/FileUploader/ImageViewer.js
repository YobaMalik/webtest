import React from 'react';

export class TestPic extends React.Component {
    constructor(props, pic, token) {
        super(props, pic, token);
        this.state = {
            pic: null,
            pictureId: 1,
            status1: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

   
    
    componentDidMount() {
   //     this.fetchData();
    }
    
    handleInputChange(event) {
      const target = event.target;
      this.setState({
        [target.name]: target.value
      });
    }



    fetchData = () => {
      this.setState(prevState => {
        return {pictureId: Number(prevState.pictureId) + 1}
     })

        const requestOptions = {
            crossDomain: true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              pictureId: this.state.pictureId
            })
        };
        fetch('http://192.168.12.152:8443/GetOnePic', requestOptions)
       /*.then(response => response.blob())
        .then(APIimage => {
          console.log(APIimage);
            const fileReaderInstance = new FileReader();
            fileReaderInstance.readAsDataURL(APIimage); 
            fileReaderInstance.onload = () => {
                   this.setState({pic: fileReaderInstance.result});
                  }

        })
    }*/
      .then(async response => { let data = await response.json();
      
        const fileReaderInstance = new FileReader();
    
        var blor =  new Blob([data.bytes]);
        console.log(blor);
        fileReaderInstance.readAsDataURL(blor); 
        fileReaderInstance.onload = () => {
               this.setState({pic: fileReaderInstance.result});
              }

      })
    }

    render() {
      /*  if (this.state.pic === null) {
          return (
              <div>Ждите </div>
          );
        } else {
*/
          return (
            <div>
                <img style={{height: '800px', width: '800px'}}  src={this.state.pic} 
               />
                <br/>

                <input
              name="pictureId"
              type="number"
              value={this.state.pictureId}
              onChange={this.handleInputChange} />
                
             <button onClick={this.fetchData}>
               Загрузить картинку
             </button>
         
           </div>
          );
        }
}

