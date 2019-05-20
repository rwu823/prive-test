import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions, getData } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';

class JsonFormComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSchema: {},
      dataUISchema: {}
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {

  }

  async componentWillMount() {
    const data = { data: JSON.parse(this.props.initData) };
    this.props.dispatch(Actions.init(data, {}, {}));

    this.setState({
      dataSchema: JSON.parse(this.props.schema),
      dataUISchema: JSON.parse(this.props.uiSchema)
    });
  }

  render() {
    // render resultData in json-form tag
    window.document.getElementById(this.props.id).setAttribute('resultData', JSON.stringify(this.props.data.data, null, 2));

    return (
      <div>
        <JsonForms
          schema={this.state.dataSchema}
          uischema={this.state.dataUISchema}
          path="data"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: getData(state),
});

export default connect(mapStateToProps)(JsonFormComponent);