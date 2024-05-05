// import React from 'react';
// import './App.css';
// import {BrowserRouter, Route, Routes} from 'react-router-dom'
// import LoginSignup from './Components/Loginsignup/LoginSignup';

// function App(){
//     return(
//      <BrowserRouter>
//      <Routes>
//         <Route path='/' element={<LoginSignup/>}></Route>
//      </Routes>
//      </BrowserRouter>   
//     )
// }

// export default App

import React from "react";
import LoginSignup from "./Components/Loginsignup/LoginSignup";



function App(){
    return(
        <div>
            <LoginSignup/>
            </div>
    )
}

export default App;