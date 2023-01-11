import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/setting/Setting";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import TopBar from "./topbar/TopBar";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SinglePost from "./singlePost/SinglePost";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user}= useContext(Context)
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route  exact path="/" element= {<Home/>} />
        <Route  path="/register"  element= {user? <Home/>:<Register/>} />
        <Route  path="/login" element= {user? <Home/>:<Login/>} />
        <Route  path="/write" element= {user?<Write/>:<Register/>} />
        <Route  path="/setting" element= {user?<Setting/> :<Register/>} />
        <Route  path="/post/:postId" element= {<Single/>} />
      </Routes>

    </Router>
  );
}

export default App;
