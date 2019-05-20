import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Actions, jsonformsReducer } from '@jsonforms/core';
import { materialFields, materialRenderers } from '@jsonforms/material-renderers';

import JsonFormComponent from '../../components/widgets/jsonform_widget/JsonFormComponent';
import BaseWidget from './BaseWidget';

const data = {};
const schema = {};
const uischema = {};

const store = createStore(
  combineReducers({ jsonforms: jsonformsReducer() }),
  {
    jsonforms: {
      renderers: materialRenderers,
      fields: materialFields,
    },
  },
);

store.dispatch(Actions.init(data, schema, uischema));

class JsonFormWidget extends BaseWidget {
  render() {
    if (document.getElementById("json-form")) {
      ReactDOM.unmountComponentAtNode(this.state.mountPoint);
    }

    this.component = null;
    ReactDOM.render(
      <Provider store={store}>
        <JsonFormComponent ref={ref => this.component = ref} {...this.state} />
      </Provider>,
      this.state.mountPoint,
      () => {},
    );
  }

}

customElements.define('json-form', JsonFormWidget);
