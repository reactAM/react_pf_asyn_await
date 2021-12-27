import {Route} from "react-router-dom";
import "./css/style.css";
import Header from "./common/Header.js";
import Footer from "./common/Footer.js";
import Main from "./main/Main.js";
import Department from "./sub/Department.js";
import Board from "./sub/Board.js";
import Gallery from "./sub/Gallery.js";
import Location from "./sub/Location.js";
import Membership from "./sub/Membership.js";
import Youtube from "./sub/Youtube.js";

function App() {
  return (
    <div className="App"> 
      <Header />
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>

      <Route exact path="/" component={Main}></Route> 
      <Route exact path="/department" component={Department}></Route>
      <Route exact path="/board" component={Board}></Route>
      <Route exact path="/gallery" component={Gallery}></Route>
      <Route exact path="/youtube" component={Youtube}></Route>
      <Route exact path="/location" component={Location}></Route>
      <Route exact path="/membership" component={Membership}></Route>  
          
      <Footer />      
    </div>
  );
}

export default App;
