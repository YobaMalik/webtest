import React from 'react';

export class FileUploader extends React.Component {
    constructor(props, pic, token) {
        super(props, pic, token);
        this.state = {
            formData: null,
            pictureId: ""
        };

      //  this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
    }
       
    handleInputChange(event) {
      this.setState({
        formData: event.target.files[0] 
      });
    }

    handleInputValueChange(event) {
      const target = event.target;
      this.setState({
        [target.name]: target.value
      });
    }

    fetchPicUpdateData = () => {

     var formData = new FormData();
     formData.append('file',this.state.formData);

     const requestOptions = {
          mode: 'no-cors',
          method: 'POST',
          body: formData
        };
        fetch('http://192.168.12.152:8443/SaveImage', requestOptions)
        .then(async response => { let data = await response.json();
            alert("сохранено " + data.id)
        }
        
        ).catch(error => {
          console.log(error);
        })
    }

    fetchDonwload = () => {
      console.log(this.state.pictureId);
      const requestOptions = {
          crossDomain: true,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: this.state.pictureId,
            fileName: "",
            responseStatus: ""
          })
        };
        fetch('http://192.168.12.152:8443/UploadOneImage', requestOptions)
        .then( async response => { let data = await response.json();
        console.log(data);
        }

        //  alert("сохранено")
        ).catch(error => {
          console.log(error);
        })
    }

    render() {
          return (            
          <div>
            <div>
              <input 
              type="file"
              onChange={this.handleInputChange}
              />
              <button onClick={this.fetchPicUpdateData}>
              Сохранить
              </button>
            </div>
            
            <div>
              <input
                name="pictureId"
                type="number"
                value={this.state.pictureId}
                onChange={this.handleInputValueChange} />
              <button onClick={this.fetchDonwload}>
                Скачать картинку
              </button>
            </div>

          </div>
          );
        }
}
