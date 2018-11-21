import React, { Component } from 'react';
import { Input, Badge, Card, CardBody, CardHeader,Form, Col, Row, Table,  FormGroup,
        Label } from 'reactstrap';
import config from '../../../config';
import dateFormat from 'dateformat';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import {
  NavLink as BSNavLink,
  Button
} from 'reactstrap';
import swal from 'sweetalert';
// import {displaytotalrows,previousPage,nextPage,arry_data,OnClickPage,displaytotalpage,
//   PagingCurrent,PagingNext,PagingPrevious} from '../../../Controllers/Paging';

import ReactPaginate from 'react-paginate';
import { PAGELIMIT } from '../../../Controllers/Comman';
var size;
class VendorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '',
      products: [],
      offset: 0,
      pageno: 1,
      pageCount: 0,
      status :  3,
      username :'',
      phoneno : '',
      email : '',
      Status1  : [{label : 'SelectStatus' , value : 'selectStatus'},{label : 'Active',value : 'Active'},{label : 'Inactive', value  :'Inactive'}],
    };
  }
  componentDidMount() {
    this.userlist();
  }

  handlePageClick = (data) => {
    console.log("there are the page handle. ....",data)
    let selected = data.selected;
    let pno = selected + 1;
    this.setState(
      { pageno: pno },
      () => {
        this.userlist();
      }
    );
  };
  handleChange = (e) => {
    console.log("e value=",e.value)
    var val1=(e.value == "selectStatus")?3:(e.value == "Active")?1:0;
    this.setState({ status: val1 },()=>{
      this.getData();
    });
    
  }
  

  getData = () => {
    console.log("state====",this.state.status)
    var name = (this.state.name) ? this.state.name : "";
    var phone = (this.state.phone) ? this.state.phone : "";
    var email = (this.state.email) ? this.state.email : "";
    var Status1 = (this.state.status == 3)? "":(this.state.status===0)?0:1;
    var args1 = {
      "email": email,
      "name": name,
      "phone" : phone,
      "status" : Status1
    };
    console.log("args1====",args1)
    var object = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }
    
    var pageno = this.state.pageno;   
    var api_url = `${config.API_URL}`;
    fetch(api_url + '/getUserDetails1?npp='+PAGELIMIT+'&page='+pageno, object)
      .then(res => res.json())
      .then(json => {
   
        if (json.responsePayload.results.length > 0) {
          var total_count = json.responsePayload.totalpages;

          this.setState({
            products: json.responsePayload.results,
            pageCount: Math.ceil(total_count / PAGELIMIT)
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


  userlist = () => {
    console.log("state====",this.state.status)
    var name = (this.state.name) ? this.state.name : "";
    var phone = (this.state.phone) ? this.state.phone : "";
    var email = (this.state.email) ? this.state.email : "";
    var Status1 = (this.state.status)? (this.state.status):((this.state.status===0)?0:"");
    var args1 = {
      "email": email,
      "name": name,
      "phone" : phone,
      "status" : Status1
    };

    console.log("args1====",args1)
    var object = {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
     // body: JSON.stringify(args1)
    }
    
    var pageno = this.state.pageno;   
    var api_url = `${config.API_URL}`;
    fetch(api_url + '/getUserWithPagination?npp='+PAGELIMIT+'&page='+pageno, object)
      .then(res => res.json())
      .then(json => {
        console.log("there are all result get====",json)
   
        if (json.responsePayload.results.length > 0) {
          var total_count = json.responsePayload.totalpages;

          this.setState({
            products: json.responsePayload.results,
            pageCount: Math.ceil(total_count / PAGELIMIT)
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


  statusupdate = (p, dt) => {
    var currentform = this;
    var currentstatus = (dt) ? dt : ((p.status === 1) ? 2 : 1);
    var currentstatusname = (dt) ? "delete" : ((p.status === 1) ? "inactive" : "active");
    var currentStatusTitle = (dt) ? "Delete" : ((p.status === 1) ? "Inactive" : "Active");

    swal({
      title: "Are you sure?",
      text: "You want to " + currentstatusname + " '" + p.email + "'!",
      icon: "warning",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        swal({
          title: currentStatusTitle + "!",
          text: 'user ' + p.email + ' is successfully ' + currentstatusname + '!',
          icon: 'success'
        }).then(function () {
          console.log(p, "there are the req param")

          var object = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
            },
          }
          var api_url = `${config.API_URL}`;
          fetch(api_url + '/deleteUser?userid='+p.userid, object)
           
            .then(res => res.json())

            .then(json => {
              currentform.userlist();
            }).catch(error => {

            });
        });
      } else {
        swal("Cancelled", "It is cancelled.", "error");
      }
    })
  };

  onSearch = (e) => {
    this.setState(
      { [e.target.name]: e.target.value },
      () => {
        console.log("there are the goinf on")
        this.getData();
      }
    );
  }

  render() {
    const formthis = this;
    const { selectedOption1 } = this.state;
    var test1 = (this.state.status === 3)?'SelectStatus':(this.state.status === 1)?'Active' :'Inactive';
    return (
      <div className="animated fadeIn">
     
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="6" lg="6">
                    <Input type="text" id="name" name="name" value={this.state.name} onChange={this.onSearch} placeholder="Enter Name" />
                  </Col>   
                  <Col xs="6" lg="6">
                    <Input type="email" id="email" name="email" value={this.state.email} onChange={this.onSearch} placeholder="Enter email" />
                  </Col>
                  <br/>
                  </Row>
                  <Row>
                  <Col xs="6" lg="6">
                  <Input type="phone"  id="phone" name="phone" value={this.state.phone} onChange={this.onSearch} placeholder="Phone Number" />
                  </Col>
                  <Col xs="6" lg="6">
                  <Select className="dropdown-width"
                          name="form-field-name"
                          value={{label : test1,value : test1}}
                          onChange={this.handleChange}
                          options={this.state.Status1}
                        />
                  </Col>
                </Row>
              </CardHeader>
              </Card>
              </Col> 
              <CardBody>
              <Row>
                  <Col xs="10" lg="10">
                </Col>
                <Col xs="2" lg="2">
                <h4><a href= "/#/AddUser"> <Button type="submit" size="sm" color="primary"><i className="fa fa-plus"></i> Add User</Button></a></h4>
                </Col>
                </Row>
                </CardBody>
                <Card>
                <CardBody>
                <p><strong>User</strong></p>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Id</th>  
                      <th>Status</th>
                      <th>Status</th>
                      <th>View</th>
                      <th>Edit</th>
                      <th>Delete</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.products.map(function (p, index, ) {
                        return (
                          <tr>
                            <td>{p.id}</td>
                            <td>{p.userid}</td>
                            <td>
                             
                            <input
                                  type="radio"
                                  value="medium"
                                 checked={p.status == 1}    
                                 
                                  />

                            </td>
                            <td>
                             
                             <Badge className="pointer" color={(p.status == 1) ? "success" :"danger"}>{(p.status == 1) ? "Active" : "Inactive"}</Badge>
                           </td>
                            <td>
                              <BSNavLink
                                className="text-uppercase"
                                tag={NavLink}
                                to={'/Details/' +p.id}
                                activeClassName="active"
                                exact="true">
                                <i class="icon-eye icons font-1xl d-block mt-0"></i>
                              </BSNavLink>
                            </td>
                            <td>
                              <BSNavLink
                                className="text-uppercase"
                                tag={NavLink}
                                to={'/EditProfile/' + p.id}
                                activeClassName="active"
                                exact="true">
                                <i class="cui-note icons font-1xl d-block mt-0"></i>
                              </BSNavLink>
                            </td>


                            <td>
                              <Badge className="pointer1" onClick={() => formthis.statusupdate(p, 3)}><i class="fa fa-trash" aria-hidden="true"></i></Badge>


                            </td>


                          </tr>
                        )
                      })
                    }

                  </tbody>
                </Table>
                <ReactPaginate previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={<a href=""></a>}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={0}
                  pageRangeDisplayed={10}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages page-item"}
                  activeClassName={"active"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousLinkClassName={"page-link"}
                  nextLinkClassName={"page-link"}
                />
              </CardBody>
            </Card>
        

      </div>

    );
  }
}

export default VendorList;
