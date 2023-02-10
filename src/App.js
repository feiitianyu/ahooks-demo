import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/login';
import Main from './pages/main';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path='/login' component={Login} /> */}
        <Route path='/admin' component={Main} />
        <Redirect to='/login' />
      </Switch>
    </div>
  );
}

export default App;
