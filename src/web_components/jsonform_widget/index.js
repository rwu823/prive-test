import { Actions, rankWith, scopeEndsWith } from '@jsonforms/core';
import {
  materialFields,
  materialRenderers,
} from '@jsonforms/material-renderers';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import JsonFormComponent from '../../components/widgets/jsonform_widget/JsonFormComponent';
import AutoComplete from './AutoComplete';
import BaseWidget from './BaseWidget';
import createStore from './redux/createStore';

const data = {};
const schema = {};
const uischema = {};

const store = createStore({
  jsonforms: {
    renderers: materialRenderers,
    fields: materialFields,
  },
});

store.dispatch(Actions.init(data, schema, uischema));
store.dispatch(
  Actions.registerRenderer(
    rankWith(Number.MAX_VALUE, scopeEndsWith('underlyings')),
    AutoComplete,
  ),
);

class JsonFormWidget extends BaseWidget {
  render() {
    if (document.getElementById('json-form')) {
      ReactDOM.unmountComponentAtNode(this.state.mountPoint);
    }

    this.component = null;
    ReactDOM.render(
      <Provider store={store}>
        <JsonFormComponent
          ref={ref => (this.component = ref)}
          {...this.state}
        />
      </Provider>,
      this.state.mountPoint,
      () => {},
    );
  }
}

customElements.define('json-form', JsonFormWidget);
