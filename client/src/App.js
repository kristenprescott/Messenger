// import { Container } from "react-bootstrap";
import { BrowserRouter, Switch } from "react-router-dom";

import ApolloProvider from "./ApolloProvider";
import { AuthProvider } from "./Context/auth";
import { MessageProvider } from "./Context/message";
import DynamicRoute from "./util/DynamicRoute";

import "./App.scss";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <BrowserRouter>
            {/* <Container className="App"> */}
            <Switch>
              <DynamicRoute exact path="/" component={Home} authenticated />
              <DynamicRoute path="/register" component={Register} guest />
              <DynamicRoute path="/login" component={Login} guest />
            </Switch>
            {/* </Container> */}
          </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
