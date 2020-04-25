import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import './index.css';

import Logo from './components/Logo';
import Menu from './components/Menu';
import Typography from './components/Typography';

import AsyncComponent from './hoc/asyncComponent';

const AsyncSupport = AsyncComponent(() => {
  return import('./containers/Support');
})

const AsynRequestBook = AsyncComponent(() => {
  return import('./containers/RequestBook')
})


function App(props) {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact render={(props) => <AsynRequestBook {...props} />} />
        <Route path="/support" component={AsyncSupport} />
        <Route path="/suggest" render={() => <h1>How would we suggest a book for you?</h1>} />
      </Switch>
    </Layout>
  );
}

function Layout(props) {
  return (
    <div className="Layout">
      <Header />
        {props.children}
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <Logo />
      <Link
        to={'/support'}
        className="Button">SUPPORT</Link>
      <Menu />
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <Typography type='p' config={{ className: "paragraph-1" }}>I'm not sure what book to read :(</Typography>
      <Link 
          to={{ pathname: '/suggest-book' }}
          className="ButtonSmall">SUGGEST A BOOK FOR ME</Link>
    </footer>
  )
}



export default App;
