import React from 'react';
import axios from 'axios';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';

// Get user input from path
// Parse input for geocode call

// geocoding call needs to go here . AIzaSyCLOfSGqZe0xwJF7ytbjZs9qrJlxDPg2Bk



// Call to Hiking Project API
async function phoneHome(slat, slong) {
    var link = "https://www.hikingproject.com/data/get-trails?";
    // var res = "";
    await axios.get(link, {
        params: {
            lat: slat,
            lon: slong,
            maxDistance: "30",
            key: "200747499-3d3cab16ebe912a88d76d82693eee11c",
        }
    }
    )
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
    // .finally(res=>{return (res)})
    // return res;
}