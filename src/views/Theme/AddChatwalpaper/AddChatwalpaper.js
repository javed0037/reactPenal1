import React, { Component } from 'react';
import { Alert, Form,CardFooter,Card, CardBody, CardHeader, Col, Row,FormGroup,Button,
  Input,Label } from 'reactstrap';
  import Select from 'react-select';
  import ColorPicker from 'react-color-picker'
  import { ChromePicker } from 'react-color'
  import { SketchPicker } from 'react-color';
 
import 'react-color-picker/index.css'

class AddChartWalpaper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      displayColorPicker: false,
      background: '#fff',
    };

    this.onDismiss = this.onDismiss.bind(this);
  }
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };
  onDismiss() {
    this.setState({ visible: false });
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
                <i className="fa fa-align-justify"></i><strong>Add New Color</strong>   
                  </CardHeader>
                   <CardBody>
                   <FormGroup>
                   {/* <input type="text" placeholder="Select Color" id="colorcode" name="code"> */}
                     <Row>
                     <Col xs="3" md="3  "> 
                     {/* <SketchPicker
                          color={ this.state.background }
                          onChangeComplete={ this.handleChangeComplete }
                        /> */}
                     <Input type="color" color={ this.state.background }  id="colorcode" value={this.state.value} onChangeComplete={ this.handleChangeComplete } name="code" placeholder="Select Color" />
                     </Col>
                    <Col xs="2" md="2"><Input type="text"  id="colorcode" value={this.state.value} onChange={this.handleChange} name="code" /></Col></Row>
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

export default AddChartWalpaper;
