import React, { Component } from 'react';
import { Alert, Card, CardBody, CardHeader,Form,CardFooter, Col, Row,FormGroup,Button,
  Input,Label } from 'reactstrap';
  import Select from 'react-select';
  import swal from 'sweetalert';
  var r = '';
class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Status2 : 3,
      status : '',
      name : '',
      email : '',
      phone : '',
      password : '',
      pinid : '',
      Status1  : [{label : 'Select Status' , value : 'Select Statu'},{label : 'Active',value : 'Active'},{label : 'Inactive', value  :'Inactive'}],
      visible: true
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  myFunction1(){
   r = Math.random().toString(36).substring(7);
   return r;
   console.log('there are r-0---------',r);
   
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.email]: e.target.value });
    this.setState({ [e.target.password]: e.target.value });
    this.setState({ [e.target.phone]: e.target.value });
    this.setState({ [e.target.pinid]: e.target.value });
  }
  // getString = (e){

  // }
  onSubmit = (e) => {
    e.preventDefault();
    console.log('there are the state=>', this.state)
    var parameter = this.props.match.params.ids;
    var user_ids = (parameter) ? parameter : 0; 
    var email = (this.state.email) ? this.state.email.toString() : "";
    var password = (this.state.password) ? this.state.password.toString() : "";
    var name = (this.state.name) ? this.state.name.toString() :    "";
    var phone = (this.state.phone) ? this.state.phone.toString() : "";
    var securePinid = (this.state.pinid) ? this.state.pinid.toString() : "";
    var Status1 = (this.state.Status2);
   
    var args1 = {
      "email": email,
      "username":  name,
      "phone" : phone,
      "password" : password,
      "status" : Status1,
      "securePinid" :  securePinid
    };

    var swaltitle = (user_ids == 0) ? "SAVE" : "UPDATE";
    var swaltext = (user_ids == 0) ? "Successfully save" : "Successfully update";

    var object1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args1)
    }
    var api_url = '';
    api_url = 'http://localhost:5000/admin/addNewuser';
   
    fetch(api_url, object1)
      .then(function (response) {
        console.log('there are the response',response);
        
        response.json().then(json => {
          console.log('there are the json---------', json.status,"jsonnnnn",json)
          if (json.status){
            swal({
              title: swaltitle,
              text:  json.message,
              icon:  "success",
            });
            window.location.href = '/#/theme/typography';
          }
          else {
            console.log("this is going on the way")
            swal({
              title: "Warning",
              text: json.message,
              icon: "warning",
            });
             window.location.href = '/#/theme/typography';
          }
        })


      }).catch(error => {
        console.log(error.toString());
        // swal({
        //   title: "Wrong!",
        //   text: error.toString(),
        //   icon: "error",
        // });
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
     <Form onSubmit={this.onSubmit}>
      <Card>
      <CardBody>
        <Row>
          <Col xs="12" md="12"> 
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Add New User</strong>   
                  </CardHeader>
                   <CardBody>
                   <FormGroup>
                
                  <h4 className="alert-heading">Name</h4>
                    <Input type="text" id="name" name="name" onChange={this.onChange}  value={this.state.name} placeholder="Enter name number " />
                    </FormGroup>   
                    <FormGroup>    
                   <h4 className="alert-heading">Email</h4>
                    
                   <Input type="email" id="email" name="email" value={this.state.email}  onChange={this.onChange} placeholder="Enter email" />
                   
                   </FormGroup>   
                    <FormGroup>    
                   <h4 className="alert-heading">phone</h4>
                    
                   <Input type="tel" id="phone" name="phone" value={this.state.phone} onChange={this.onChange} placeholder="Enter phone" />
                   
                   </FormGroup>   
                    <FormGroup>   
                   <h4 className="alert-heading">Password</h4>
                  
                    <Input type="password" id="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Enter password" />
                   
                    </FormGroup>   
                    <FormGroup>  
                    <h4 className="alert-heading">Secure Pin id</h4>
                    
                    <Input type="text" id= "pinid" name= "pinid" value={this.myFunction1()} onChange={this.getString} placeholder="Enter enter the pin Id" />
                     <br/>
                     <button onclick="myFunction1()">Generate Key</button>
                    </FormGroup>   
                     
                    <FormGroup> 
                   
                <h4 className="alert-heading">Status</h4>
                <Select defaultValue= "Active"  required className="dropdown-width"  
                  name="form-field-name"
                  value={{value: this.state.employeetype, 
                  label: this.state.employeetype}}
                  onChange={this.handleChange}
                  options={this.state.EmployeeList}
                />
                  </FormGroup> 
              </CardBody>
            </Card>
          </Col>
        </Row>
        </CardBody>
        <CardFooter>
        <Button type="submit" size="sm" color="primary">Submit</Button>
        </CardFooter>
        </Card>
      </Form>
      </div>
    );
  }
}

export default AddUser;
