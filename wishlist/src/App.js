import React from 'react';
import './App.scss';
import LoginForm from "./login/LoginForm/LoginForm";
import Loader from "./ui/Loader/Loader";
import Error from "./ui/Error/Error";
import RegisterForm from "./login/RegisterForm/RegisterForm";

function App() {
  return (
    <div className="App">
      <Loader/>
      <Error/>
      <LoginForm/>
      or
      <RegisterForm/>
    </div>
  );
}

export default App;
