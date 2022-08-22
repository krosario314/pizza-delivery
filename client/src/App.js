import './App.css';
import { useState } from "react";
import { NavBar } from "./components/navBar"
import { HomePage } from "./pages/HomePage";
import { Footer } from "./components/Footer";
import { OrderPage } from "./pages/OrderPage";
import EmployeePage from "./pages/EmployeePage";
import { AddPizza } from "./pages/AddPizza";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Login } from "./pages/Login";
import  Cart  from "./pages/Cart";
import { Signup } from "./pages/Signup";
import reactDOM from "react-dom";
import { BrowserRouter, Route, Routes} from "react-router-dom";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});




// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });


function App() {

  
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavBar />
          <Routes>
            {/* <Route path = "/checkout" element={<Checkout />}></Route> */}
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/orderpage" element={<OrderPage />}></Route>
            <Route path="/employeepage" element={<EmployeePage />}></Route>
            <Route path="/checkout" element={<Cart />}></Route>
          </Routes>
        <Footer />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
