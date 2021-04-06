import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Stitching from "./pages/stitching/Stitching/Stitching";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/menu" exact component={Menu} />

        {/* <Route path="/cutting/:page" exact component={Cutting} />
        <Route path="/cutting/:page/:id" exact component={Cutting} /> */}

        <Route path="/stitching/:page" exact component={Stitching} />
        <Route path="/stitching/:page/:id" exact component={Stitching} />

        {/* <Route path="/checking/:page" exact component={Checking} />
        <Route path="/checking/:page/:id" exact component={Checking} /> */}

        {/* <Redirect from="/cutting" to="/cutting/home" /> */}
        <Redirect from="/stitching" to="/stitching/home" />
        {/* <Redirect from="/checking" to="/checking/home" /> */}
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
