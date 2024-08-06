import { ListItemSecondaryAction } from "@mui/material";
import { auth, database } from "../../firebase.js";
import { ref, child, set, get } from "firebase/database";

export async function fetchRestaurants() {
  const response = await fetch(
    "https://grabit-34a23-default-rtdb.firebaseio.com/popularrestaurants.json"
  );
  console.log("FetchingData");
  const data = await response.json();

  console.log(data);

  return data;
}

export async function fetchRestaurantById(id) {
  const response = await fetch(
    `https://grabit-34a23-default-rtdb.firebaseio.com/popularrestaurants/${id}.json`
  );
  const data = await response.json();
  return data;
}

export function getCartItems(restaurantId, onData) {
  let uid = "";

  if (
    localStorage.getItem("loggedIn") === "false" ||
    localStorage.getItem("loggedIn") === null
  ) {
    const user = {
      name: "Guest",
      email: "",
      uid: "guest",
    };

    localStorage.setItem("user", JSON.stringify(user));
    uid = "guest";
  } else {
    uid = JSON.parse(localStorage.getItem("user")).uid;
  }
  const db = ref(database, `users/${uid}/cart/`);
  get(child(db, restaurantId)).then((snapshot) => {
    if (snapshot.exists()) {
      let data = snapshot.val();
      console.log("CartItems", data);
      onData(data);
    } else {
      console.log("Data not available");
    }
  });
}

export function addItemToCart(cart, restaurantId) {
  let userId = "";

  if (
    localStorage.getItem("loggedIn") === "false" ||
    localStorage.getItem("loggedIn") === null
  ) {
    userId = "guest";
  } else {
    userId = JSON.parse(localStorage.getItem("user")).uid;
  }

  const db = ref(database, `users/${userId}/cart/`);

  set(db, cart);

  // console.log("CartItems", cart);
  // const uid = JSON.parse(localStorage.getItem("user")).uid;
  // const response = await fetch(
  //   `https://grabit-34a23-default-rtdb.firebaseio.com/users/${uid}/cart.json`,
  //   {
  //     method: "POST",
  //     body: JSON.stringify(cart),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // const data = await response.json();
  // return data;
}

export function updateItemToCart(item) {
  const uid = JSON.parse(localStorage.getItem("user")).uid;
  const db = ref(database, `users/${uid}/cart`);
  set(db, item);
}

export function fetchCartItems(onData) {
  let uid = "";

  console.log("IsLoggedIn", localStorage.getItem("loggedIn"));

  if (
    localStorage.getItem("loggedIn") === "false" ||
    localStorage.getItem("loggedIn") === null
  ) {
    uid = "guest";
  } else {
    uid = JSON.parse(localStorage.getItem("user")).uid;
  }

  if (uid) {
    get(child(ref(database), "users/" + uid + "/cart"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          console.log("CartItems", data);
          onData(data);
        } else {
          onData(null);
          console.log("Data not available");
        }
      })
      .catch((error) => {
        onData(null);
        console.error(error);
      });
  }
}
