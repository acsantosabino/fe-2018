import React, {Component} from 'react'
import {FormGroup, FormControl, ControlLabel, HelpBlock, Button, Radio, Col, Panel, Row, Form,} from 'react-bootstrap'


// teste de aplicacao

class DadosDemograficos extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleChange = this.handleChange.bind(this);
  
      this.state = {
        value: ''
      };
    }
  
    getValidationState() {
      const length = this.state.value.length;
      if (length > 10) return 'success';
      else if (length > 5) return 'warning';
      else if (length > 0) return 'error';
      return null;
    }
  
    handleChange(e) {
      this.setState({ value: e.target.value });
    }
  
    render() {
      return (
        <div>
          <h2>Dados Demográficos</h2>
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Mãe</ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="nome completo da mãe"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              <ControlLabel>Pai</ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="nome completo do pai"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
            </FormGroup>
          </form>
        </div>
      );
    }
  }
  
  // render(<DadosDemograficos />);
  export default DadosDemograficos;