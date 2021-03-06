import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';



const bar = {
  labels: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','20','21','22','23','24','25','26','27','28','29','30'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const doughnut = {
  labels: [
    'Red',
    'Green',
    'Yellow',
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

const radar = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};

const pie = {
  labels: [
    'Red',
    'Green',
    'Yellow',
  ],
  datasets: [
    {
      data: [1000, 5, 1],
      backgroundColor: [
        '#FF6384',
        '#33cc33',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

const polar = {
  datasets: [
    {
      data: [
        11,
        16,
        7,
        3,
        14,
      ],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
        '#36A2EB',
      ],
      label: 'My dataset' // for legend
    }],
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Grey',
    'Blue',
  ],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser : ''
    };
  }
  componentDidMount() {
    this.userlist();
  }
  userlist = () => {
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       // 'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }
    
    var apiUrl = "";
    apiUrl   =  'http://localhost:5000/user/getUser'  
    fetch(apiUrl, object)
      .then(res => res.json())
      .then(json => {
        console.log("there are the json ",json)
        if (json.data.length > 0) {
          var total_count = json.data.length;
            console.log("total_count---------------",total_count);
            this.setState({allUser: total_count});
            
          

        }
        else {
          this.setState({
            allUser: 0
          })
        }
      }).catch(error => {
        console.log("error-->>", error)
      });
  }

  render() {
    return (
      <div className="animated fadeIn">

        <CardColumns className="cols-2">
          <Card>

            <CardHeader>
              All User
              <div className="card-header-actions">
                
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
              <h4 color = 'red'><strong>{this.state.allUser}</strong></h4>
              <br/>
              <h4><strong><a href =  '/#/theme/typography'> All users</a> </strong></h4>
              </div>
             
            </CardBody>
            <br/><br/><br/>
            <CardHeader>
              changes
              
            </CardHeader>
          </Card>         
          <Card>
            <CardHeader>
             User
              <div className="card-header-actions">
                
                  <small className="text-muted">docs</small>
               
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card>          
        </CardColumns>
        <CardColumns className="cols-2"></CardColumns>
        <Card>
            <CardHeader>
              User Registration in last month
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar} options={options} />
              </div>
            </CardBody>
          </Card>
      </div>
    );
  }
}

export default Charts;
