import PopularRestaurants from "./Restaurants/PopularRestaurants";
import NearbyRestaurants from "./Restaurants/NearbyRestaurants";
import TopSection from "./TopSection";
import MainFooter from "./Footer/MainFooter";
import "./home.scss";
import Backdrop from "../../components/Backdrop";
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurants } from "../../../util/http";
import { useDispatch } from "react-redux";
import { restaurantActions } from "../../../store/slices/restaurants-slice";
import { useEffect } from "react";
import { uiActions } from "../../../store/slices/ui-slice";

export default function Home() {
  const dispatch = useDispatch(0);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  useEffect(() => {
    if (data) {
      if (data.length > 0)
        dispatch(restaurantActions.saveRestaurants({ restaurants: data }));
    }
  }, [data]);

  useEffect(() => {
    dispatch(uiActions.setOnHomePage({ onHomePage: true }));
  }, []);

  return (
    <>
      <Backdrop />
      <div className="main-section">
        <TopSection />

        <PopularRestaurants data={data && data} isPending={isPending} />

        <NearbyRestaurants data={data && data} isPending={isPending} />

        {/* {isMobile ? <MobileFooter /> : <MainFooter />} */}
      </div>
    </>
  );
}
