import React from 'react';

export class TestPic extends React.Component {
    constructor(props, pic, token) {
        super(props, pic, token);
        this.state = {
            pic: null,
            pictureId: 1,
            statusInfo: "",
            localDate: "",
            locationInfo: "",
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            scale: 1
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    componentDidMount() {
   //     this.fetchData();
    }

    onScroll = (e) => {
    //  e.document.body.style.overflow = 'hidden';
    //  console.log(e.deltaY ==53);
    //  const x = this.state.x;
    //  const y = this.state.y;
      const scale = this.state.scale;
      const delta = e.deltaY * -0.005;
      const newScale = scale + delta;
  
  //   const ratio = 1 - newScale / scale;
  
      this.setState({
        scale: newScale
       // x: x + (e.clientX - x) * ratio,
       // y: y + (e.clientY - y) * ratio
      });
  //    e.document.body.style.overflow = '';
    };
    
    handleInputChange(event) {
      const target = event.target;
      this.setState({
        [target.name]: target.value
      });
    }

    fetchPicUpdateData = () => {
      const requestOptions = {
          crossDomain: true,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pictureId: this.state.pictureId,
            status: this.state.statusInfo,
            pic:""
          })
        };
        fetch('http://192.168.12.152:8443/UpdateFileInfo', requestOptions)
        .then(
        //  alert("сохранено")
        ).catch(error => {
          console.log(error);
        })
    }

    fetchPicData = () => {

        const requestOptions = {
            crossDomain: true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              pictureId: this.state.pictureId
            })
        };
        fetch('http://192.168.12.152:8443/GetOnePic', requestOptions)
        .then(async response => { let data = await response.json();
        const fileReaderInstance = new FileReader();
        const Buffer = require('buffer').Buffer;
        var blob =  new Blob([Buffer.from(data.bytes, "base64")]);
        fileReaderInstance.readAsDataURL(blob); 
        fileReaderInstance.onload = () => {
                var img = new Image();
                img.src = fileReaderInstance.result;
                img.onload = () => {
                  this.setState({pic: fileReaderInstance.result, 
                    statusInfo: data.status !== null ? data.status : "",
                    height: img.height,
                    width: img.width,
                    localDate: data.localDate,
                    locationInfo: data.locationInfo
                  });
                }
               
              }
        
      }).catch(error => {
        console.log(error);
      })
      this.setState(prevState => {
        return {pictureId: Number(prevState.pictureId) + 1}
     })
    }

    render() {
          return (            
          <div>

            <div>
              
              <br/>

              <input
                name="pictureId"
                type="number"
                value={this.state.pictureId}
                onChange={this.handleInputChange} />
              <button onClick={this.fetchPicData}>
                Загрузить картинку
              </button>

              <br/>
              <div>
                Данные по фото:
                <br/>
                Дата создания: {this.state.localDate}
                <br/>
                Расположение: {this.state.locationInfo}
              </div>
              
              <input
                name="statusInfo"
                type="text"
                value={this.state.statusInfo}
                onChange={this.handleInputChange} 
              />

              <button onClick={this.fetchPicUpdateData}>
                Изменить статус
              </button> 
              
            </div>

            <div onWheelCapture={evnt => {
              if(evnt.altKey) return this.onScroll(evnt); 
            }
              }>
              <img
               resize="contain"
                src={this.state.pic}
                alt="Фото"
                style={{
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  height: '80vh',
      
                  transformOrigin: "0 0",
                  transform: `translate(${this.state.x}px, ${this.state.y}px) scale(${this.state.scale})`
                }}
              />
            </div>
            

          </div>
          );
        }
}
/*
            height: '100vh',
                  height: this.state.height, 
                  width: this.state.width, 
                  35077
*/
