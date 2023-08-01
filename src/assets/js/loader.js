import { auth, app } from "../../firebase"; // Assuming you have imported the necessary Firebase modules

// Function to fetch user data from the database and save it in localStorage
export const fetchData = (key) => {
  // Check if the user is authenticated
  const user = auth.currentUser;

  if (user) {
    // User is authenticated, fetch the user data from the database
    app.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // User data found in the database
          const userData = doc.data();
          // Save the user data in localStorage
          localStorage.setItem(key, JSON.stringify(userData));
        } else {
          // User data not found in the database
          console.log("User data not found.");
        }
      })
      .catch((error) => {
        // Handle any errors that occurred while fetching user data from the database
        console.error("Error fetching user data:", error);
      });
  } else {
    // User is not authenticated
    console.log("User is not authenticated.");
  }
};
