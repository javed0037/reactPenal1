import React, { Component } from 'react';
import { Input, Badge, Card, CardBody, CardHeader, Col, Row, Table,  FormGroup,
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

 
const divStyle = {
  margin: '40px',
  border: '5px solid pink'
};
const pStyle = {
  fontSize: '15px',
  textAlign: 'center'
};


class CharWalper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      offset: 0,
      pageno: 1,
      pageCount: 0
    };

  }

  componentDidMount() {
    this.listVendor();

  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let pno = selected + 1;
    this.setState(
      { pageno: pno },
      () => {
        this.listVendor();
      }
    );
  };


  listVendor = () => {
    var susername = (this.state.susername) ? this.state.susername : "";
    var smobileno = (this.state.smobileno) ? this.state.smobileno : "";
    var saddress = (this.state.saddress) ? this.state.saddress : "";
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }
    var parameter = this.props.match.params.ids;
    
    var user_ids = (parameter) ? parameter : 0;
    var pageno = this.state.pageno;
   // var api_url = `${config.API_URL}`;

   var api_url=`${config.API_URL}`;
   fetch(api_url+'/colorCode', object)
      .then(res => res.json())
      .then(json => {

        console.log("this is json ------------",json)
        if (json["results"].length > 0) {
          //var total_count = json["totalElements"];
          this.setState({
            products: json["results"],
           // pageCount: Math.ceil(total_count / PAGELIMIT)
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
    //e.preventDefault(); // <--- prevent form from submitting
    console.log("there are the pppppppppppppp,,,,,,,,,,,,,,",p.id)
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
          text: 'Vendor ' + p.email + ' is successfully ' + currentstatusname + '!',
          icon: 'success'
        }).then(function () {
          p.superadminid = sessionStorage.getItem('user_id');
          p.companyname = p.companyName;
          p.status = currentstatus;
          p.vendorid = p.userid;
          p.rolesentity = [
            {
              "name": "ROLE_VENDOR"

            }
          ];
          console.log(p, "there are the req param")

          ///////////////////////////
          var object = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
            },
            body: JSON.stringify(p)
          }
          var api_url = `${config.API_URL}`;
          fetch(api_url + '/deleteColor?id='+p.id, object)
            .then(res => res.json())
            .then(json => {
              currentform.listVendor();
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
        this.listVendor();
      }
    );
  }

  render() {
    const formthis = this;
    return (
      <div className="animated fadeIn">
      <h4>CHAT WALLPAPER LIST</h4>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              
              <CardBody>
                
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Color Code</th>
                      <th>Color Box</th>
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
                            <td>
                             
                            {p.code}

                           </td>
                            <td>
                              
                            <span id="view" style = {{'background-color': p.code, 'padding':'7px', 'border':'thin solid'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </td>
                            <td>
                              <BSNavLink
                                className="text-uppercase"
                                tag={NavLink}
                                to={'/theme/AddChatwalpaper/' + p.id}
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
                  breakLabel={<a href="">...</a>}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
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
          </Col>
        </Row>
      </div>

    );
  }
}

export default CharWalper;
