import 'skatejs-web-components';
import * as skate from 'skatejs';


customElements.define('x-hello', class extends skate.Component {
  static get props () {
    return {
      name: { attribute: true }
    };
  }
  renderCallback () {
    return skate.h('div', `Hello, ${this.name}`);
  }
});

customElements.define('x-hola', class extends skate.Component {
  static get props () {
    return {
      ref: { attribute: true }
    };
  }
  renderCallback () {
    return skate.h('x-hello', {name: 'Timothy'}, 'something here');
  }
});
