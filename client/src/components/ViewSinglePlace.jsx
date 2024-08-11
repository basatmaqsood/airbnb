/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AddNewPlace from "./AddNewPlace";

function ViewSinglePlace({ id }) {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    axios
      .get(`/places/${id}`)
      .then((res) => {
        if (res.data === null) {
          alert("Place not found. You'll be redirected to the home page.");
          setRedirect(true);
        }
        setPlace(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert(
          "Failed to Load the data. You'll be redirected to the home page."
        );
        setRedirect(true);
      });
  }, []);


  if (redirect) {
    return <Navigate to="/" />;
  }
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return <AddNewPlace place={place} id={id}/>
  }
}

export default ViewSinglePlace;
