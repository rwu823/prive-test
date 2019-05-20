import uniqid from 'uniqid';

class BaseWidget extends HTMLElement {

  static get observedAttributes() {
    return [
      'initdata',
      'schema',
      'uischema',
    ];
  }

  get initData() { return this.state.initData; }
  get schema() { return this.state.schema; }
  get uiSchema() { return this.state.uiSchema; }
  set initData(value) { this.setInitData(value); }
  set schema(value) { this.setSchema(value); }
  set uiSchema(value) { this.setUISchema(value); }

  constructor() {
    super();

    const id = uniqid();
    const mountPoint = document.createElement('div');
    mountPoint.setAttribute("id", "json-form");
    this.appendChild(mountPoint);

    this.state = {
      id: id,
      mountPoint: mountPoint,
      initData: null,
      schema: null,
      uiSchema: null,
      // host:'http://203.142.91.70:8080/SlyAWS/restful/comparisontool/',
    };

    this.id = id;
    this.element = this;
  }

  setState(state, rerender = true) {
    const keys = Object.keys(state);
    for (let key of keys) {
      // console.log('>>update_state<<', key, '>>from<<', this.state[key], '>>to<<', state[key]);
      this.state[key] = state[key];
    }
    this.state = { ...this.state };

    if (this.state.schema && this.state.uiSchema) {
      this.render();
    }
  }

  setInitData(initData, rerender = true) {
    this.setState({ initData: initData }, rerender);
  }

  setSchema(schema, rerender = true) {
    this.setState({ schema: schema }, rerender);
  }

  setUISchema(uiSchema, rerender = true) {
    this.setState({ uiSchema: uiSchema }, rerender);
  }

  connectedCallback() {
    const attrsToSet = (BaseWidget.observedAttributes || []).filter(attr => this.getAttribute(attr));

    for (let attribute of attrsToSet) {
      this.attributeChangedCallback(attribute, this.state[attribute], this.getAttribute(attribute), false);
    }

    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue, rerender = true) {
    if (oldValue === newValue || this.state[name] === newValue) {
      return;
    }

    switch (name) {
      case "initdata" :
        this.setInitData(newValue, false);
        break;
      case "schema" :
        this.setSchema(newValue, false);
        break;
      case "uischema" :
        this.setUISchema(newValue, false);
        break;
      default: break;
    }
  }

}

export default BaseWidget;