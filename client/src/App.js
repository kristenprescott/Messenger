import { Container } from "react-bootstrap";

import ApolloProvider from "./ApolloProvider";

import "./App.scss";
import Register from "./Pages/Register";

function App() {
  return (
    <ApolloProvider>
      <Container className="App">
        <Register />
      </Container>
    </ApolloProvider>
  );
}

export default App;
