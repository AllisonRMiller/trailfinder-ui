import React from 'react';
import axios from 'axios';


async function phoneHome(slat,slong) {
    var link = "https://www.hikingproject.com/data/get-trails?";
    var res = "";
    await axios.get(link, {
        params: {
            lat: slat,
        lon: slong
        maxDistance: "30";
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