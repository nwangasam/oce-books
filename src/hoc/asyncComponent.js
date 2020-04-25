import React, { Component } from 'react';
import Spinner from '../components/Spinner';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
      error: null,
    };

    componentDidMount() {
      importComponent()
        .then((comp) => {
          this.setState({ component: comp.default });
        })
        .catch((error) => {
          this.setState({ error: error });
        });
    }

    render() {
      const Comp = this.state.component;

      return Comp ? <Comp {...this.props} /> : <Spinner />;
    }
  };
};

export default asyncComponent;
