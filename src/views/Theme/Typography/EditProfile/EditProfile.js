import React, { Component } from 'react';
import { Alert, Card, CardBody, CardHeader, Col, Row,FormGroup,Button,
  Input,Label } from 'reactstrap';
  import Select from 'react-select';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products : [],
      visible: true,
      EmployeeList : [{label  : '3 Month',value : 3},{label  : '6 Month',value : 6},{label  : '12 Month',value : 12}],
      Status  : [{label : 'Active',value : 1},{label : 'Inactive', value  :2},{label : 'Select Status' , value : 3}],
      Wipe  : [{label : 'Select Status' , value : 3},{label : 'Yes',value : 1},{label : 'No', value  :2}]
    };

    this.onDismiss = this.onDismiss.bind(this);
  }
  componentDidMount() {
    this.getUserDetails();
    
  }

  onDismiss() {
    this.setState({ visible: false });
  }
  getUserDetails = () => {
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       // 'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }
    var parameter = this.props.match.params.ids;
    var user_ids = (parameter) ? parameter : 0;

    var apiUrl = "";
    apiUrl   =  'http://localhost:5000/getUserDetails?userid='+user_ids
       
    fetch(apiUrl, object)
      .then(res => res.json())
      .then(json => {

        console.log("js json-------",json)
         console.log('data',json.results)
        if (json.results.length > 0) {
          // var total_count = json["totalpages"];
          // console.log("total_counttotal_count---------------",total_count);
          
          this.setState({
            products: json.results,
            
          });
        }
        else {
          this.setState({
            products: [],
          })
        }
      }).catch(error => {
        console.log("error-->>", error)
      });
  }
  render() {
      console.log('there are employee state ****',this.state.EmployeeList)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Edit Profile</strong>
              
              </CardHeader>
              <CardBody>            
                 
                    <h4>Name</h4>
                    <Input type="text" id="susername" name="susername" value={(this.state.products[0])?(this.state.products[0].name) : ''} onChange={this.onSearch} placeholder="name" />
                    <h4>Email</h4>
                    <Input type="text" id="susername" name="susername" value={(this.state.products[0])?(this.state.products[0].email) : ''} onChange={this.onSearch} placeholder="email" />
                    <h4>Phone</h4>
                    <Input type="text" id="susername" name="susername" value={(this.state.products[0])?(this.state.products[0].phone) : ''} onChange={this.onSearch} placeholder="About us" />
                    <br/>  <br/>  <br/>
                    <h4 className="alert-heading">Expire date</h4>
                    
                    <Select  defaultValue= "Active"required className="dropdown-width"  
                    name="form-field-name"
                    defaultValue = {"gfjdgjd"}
                    onChange={this.handleChange}
                    options={this.state.EmployeeList}        
                    />
                     <br/>
                    <h4 className="alert-heading">Phone wipe</h4>
                    <Select defaultValue= "Active"required className="dropdown-width"  
                    name="form-field-name"
                    
                    onChange={this.handleChange}
                    options={this.state.Status}
                    /> <br/>
                    <h4 className="alert-heading">Status</h4>
                    
                    <Select defaultValue= "Active"required className="dropdown-width"  
                    name="form-field-name"
                    onChange={this.handleChange}
                    options={this.state.Wipe}
                    />     
              </CardBody>
            </Card>
          </Col>
  
        </Row>
        <Button type="submit" size="sm" color="primary">Submit</Button>
      </div>
    );
  }
}

export default EditProfile;
