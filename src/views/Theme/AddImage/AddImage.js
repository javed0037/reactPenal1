import React from 'react'
const axios = require("axios");
const config1  = require('../../../config');
class AddImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        let url = 'http://localhost:5000/v1/apis/contactUs'
        axios.post(url, formData, config)
            .then((response) => {
                console.log("there are the response",response);
                alert("The file is successfully uploaded");
            }).catch((error) => {
            });
    }
    onChange(e) {
        console.log("there are the file -----------",e.target.files[0])
        this.setState({ file: e.target.files[0] });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default AddImage