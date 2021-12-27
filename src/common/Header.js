import {NavLink} from "react-router-dom";

function Header(){
  const active = {color: "aqua"};
  return (  
    <header>
      <div className="inner">
        <h1>
        <NavLink activeStyle={active} exact to="/">DCODELAB</NavLink>
        </h1>

        <ul id="gnb">
          <li><NavLink activeStyle={active} exact to="/department">DEPARTMENT</NavLink></li>
          <li><NavLink activeStyle={active} exact to="/board">BOARD</NavLink></li>
          <li><NavLink activeStyle={active} exact to="/gallery">GALLERY</NavLink></li>
          <li><NavLink activeStyle={active} exact to="/youtube">YOUTUBE</NavLink></li>
          <li><NavLink activeStyle={active} exact to="/location">LOCATION</NavLink></li>
          <li><NavLink activeStyle={active} exact to="/membership">MEMBERSHIP</NavLink></li>
        </ul>
      </div>
    </header>
  )
}

export default Header;