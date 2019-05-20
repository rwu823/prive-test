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
    };
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
    const { children } = this.props;
    return (
      <div>
        <JsonForms
          schema={this.state.dataSchema}
          uischema={this.state.dataUISchema}
          // schema={
          //   {
          //     'type': 'object',
          //     'props': {
          //       'auto-complete': {
          //         'type': 'string',
          //         'minLength': 3,
          //         'description': 'Find launches... via SpaceX API'
          //       },
          //     },
          //   }
          // }
          // uischema={
          //   {
          //     'type': 'VerticalLayout',
          //     'elements': [
          //       {
          //         'type': 'Control',
          //         'scope': '#/props/auto-complete'
          //       }
          //     ]
          //   }
          // }
        />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: getData(state),
});

export default connect(mapStateToProps)(JsonFormComponent);
