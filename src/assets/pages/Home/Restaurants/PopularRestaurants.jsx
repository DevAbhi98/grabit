import RestaurantCard from "./RestaurantCard";
import Restaurants from "./Restaurants";
import "../home.scss";
import { useQuery } from "@tanstack/react-query";
import { ShimmerPostList, ShimmerSimpleGallery } from "react-shimmer-effects";

export default function PopularRestaurants({ data, isPending }) {
  return (
    <div className="restaurant-div">
      <div>
        <h1>Popular Restaurants</h1>
      </div>
      <Restaurants data={data} category="popular" isPending={isPending} />
    </div>
  );
}
