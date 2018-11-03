import React, { Component } from 'react';
import { Alert, Form,CardFooter,Card, CardBody, CardHeader, Col, Row,FormGroup,Button,
  Input,Label } from 'reactstrap';
  import Select from 'react-select';
  import ColorPicker from 'react-color-picker'
  import { ChromePicker } from 'react-color'
  import { SketchPicker } from 'react-color';
  import JsColor from './jscolor'
 
import 'react-color-picker/index.css'

class AddChartWalpaper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      displayColorPicker: false,
      background: '#fff',
      settings: {
        background_color: '#000000'
      }
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
                     <SketchPicker
                          color={ this.state.background }
                          onChangeComplete={ this.handleChangeComplete }
                        />

                     </Col>
                    <Col xs="2" md="2">
                   
                    <span id="view" style = {{'background-color': this.state.background, 'padding':'7px', 'border':'thin solid'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    {/* <JsColor id="visitorsWidgetBackgroundColor" label="Message background color" value={this.state.settings.background_color} onChange={(selected) => { this.setState({ settings: { ...this.state.settings, background_color: selected } }) }} />
      */}
                   </Col>
                   </Row>
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

