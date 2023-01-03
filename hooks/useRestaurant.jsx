import { useContext } from "react";
import RestaurantContext from "../context/RestaurantProvider";

export default function useRestaurant (){
    return useContext(RestaurantContext)
}