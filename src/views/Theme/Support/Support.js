import React, { Component } from 'react';
import { Alert, Card, CardBody, CardFooter,CardHeader, Col,Form, Row,FormGroup,Button,
  Input,Label } from 'reactstrap';
  import Select from 'react-select';
  import swal from 'sweetalert';
  import config from '../../../config';

class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      susername : '',
      title : '',
      description : '',
      id :'',
      Status1  : [{label : 'Select Status' , value : 'Select Statu'},{label : 'Active',value : 'Active'},{label : 'Inactive', value  :'Inactive'}],
      name : '',
      offset: 0,
    
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    this.getAboutus();

  }
  getAboutus = (e) => {
    
    var object = {
       method: 'GET',
       headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }
    var api_url = `${config.API_URL}`;
    fetch(api_url + '/getAboutUs?id=4', object)
      .then(res => res.json())
      .then(json => {
        console.log("this is json ------------",json.results.length)
        console.log("this is json ------------",json.results[0].description)
        if (json.results.length > 0) {
          this.setState({
            title : json.results[0].title,
            description : json.results[0].description,
            Status2 : json.results[0].status

          });
        }
        else {
          this.setState({
            products: [],

            pageCount: 0
          })
        }
      }).catch(error => {
        console.log("error-->>", error)
      });
  }

  onSubmit = (e) => {
    e.preventDefault();

    var parameter = this.props.match.params.ids;
    var user_ids = (parameter) ? parameter : 0;
    var title = (this.state.title) ? this.state.title.toString() : "";
    var description = (this.state.description) ? this.state.description.toString() :    "";    
    var Status1 = (this.state.Status2);
   
    var args1 = {
      "title": title,
      "description":  description,
      "Status" : Status1,
      "userid" : 4
    };

    var swaltitle = (user_ids == 0) ? "SAVE" : "UPDATE";
    var swaltext = (user_ids == 0) ? "Successfully save" : "Successfully update";

    var object1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }
    var api_url = '';
    var api_url = `${config.API_URL}`;
    fetch(api_url + '/updateaboutUs', object1)
      .then(function (response) {
        console.log('there are the response',response);
        
        response.json().then(json => {
          if (json.status){
            swal({
              title: swaltitle,
              text:  swaltext,
              icon:  "success",
            }); 
            window.location.href = '/#/theme/typography';
          }
          else {
            swal({
              title: "Warning",
              text: json.message,
              icon: "warning",
            }); 
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
  handleChange = (e) => {
    var val1=(e.value=="Active")?1:0;
    this.setState({ Status2: val1 });
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
   
  }
  onDismiss() {
    this.setState({ visible: false });
  }


  render() {
    var test1 = (this.state.Status2 === 1)?'Active' :'Inactive';
    console.log('test1=',test1,"Status2=",this.state.Status2)
    return (
      <div className="animated fadeIn">
     <Form onSubmit={this.onSubmit}>
      <Card>
      <CardBody>
        <Row>
          <Col xs="12" md="12"> 
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Support</strong>   
                  </CardHeader>
                   <CardBody>
                   <FormGroup>           
                   <Label htmlFor="title">Title</Label>
                    <Input type="text" id="title" name="title" required value = {this.state.title} onChange={this.onChange}  placeholder="Enter name number " />
                    </FormGroup>   
                    <FormGroup>    
                    <Label htmlFor="description">Description</Label>        
                    <Input type  = "textarea" id = "description" name="description" required value={this.state.description} onChange={this.onChange}/>  
                    </FormGroup>                     
                    <FormGroup> 
                     <Label htmlFor="status">Status</Label> 
                        <Select className="dropdown-width"
                          name="form-field-name"
                          value={{label : test1,value : test1}}
                          onChange={this.handleChange}
                          options={this.state.Status1}
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

export default Alerts;
