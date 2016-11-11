import React, { Component } from 'react';
import Layout from './Layout';
import Counter from './Counter';
import LocaleSwitcher  from './LocaleSwitcher';
import Greeter  from './Greeter';

//setting language support
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
counterpart.registerTranslations('en', {
  example: {
    greeting: 'Hello %(name)s! How are you today?'
  }
});

counterpart.registerTranslations('de', {
  example: {
    greeting: 'Hallo, %(name)s! Wie geht\'s dir heute so?'
  }
});

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

export default class App extends Component {
  render() {
    return (
      <Layout>
      	 <LocaleSwitcher />
      	 <Greeter with={{ name: "Martin" }} component="h1" />
        <Counter />
      </Layout>
    );
  }
}
