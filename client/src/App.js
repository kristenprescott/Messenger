import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ApolloProvider from "./ApolloProvider";

import "./App.scss";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  return (
    <ApolloProvider>
      <BrowserRouter>
        <Container className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
