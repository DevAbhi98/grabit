import Restaurants from "./Restaurants";
import "../home.scss";

export default function NearbyRestaurants({ data, isPending }) {
  return (
    <div className="restaurant-div">
      <div>
        <h1>Nearby Restaurants</h1>
      </div>
      <Restaurants data={data} category="nearby" isPending={isPending} />
    </div>
  );
}
