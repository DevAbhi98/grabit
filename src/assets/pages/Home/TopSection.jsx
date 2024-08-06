import logo from "../../images/logo.svg";
import magnifier from "../../images/magnifier.svg";
import noodles from "../../images/noodles.png";
import shushi from "../../images/shushi.png";
import pasta from "../../images/pasta.png";
import veggies from "../../images/veggies.png";
import waffles from "../../images/waffles.png";
import chips from "../../images/chips.png";
import "./home.scss";

export default function TopSection() {
  return (
    <div className="top-div">
      <div className="logo-div">
        <img src={logo} />
        <h1>GrabIt!</h1>
      </div>

      <div className="food-div">
        <div className="text-div">
          <h1>Order, Enjoy, Repeat: Your Culinary Adventure Starts Here!</h1>
          <div className="searchbar-div">
            <input placeholder="Search food items" id="search-bar"></input>
            <img className="magnifier" src={magnifier}></img>
          </div>
        </div>
        <img src={noodles} className="img-1" />
        <img src={shushi} className="img-2" />
        <img src={pasta} className="img-3" />
        <img src={veggies} className="img-4" />
        <img src={waffles} className="img-5" />
        <img src={chips} className="img-6" />
      </div>
    </div>
  );
}
