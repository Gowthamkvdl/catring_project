import React from "react";
import "./listPage.css";
import Filter from "../../components/filter/filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";

const listPage = () => {
  return (
    <div className="listPage container">
      <div className="row">
        <div className="col-12 col-md-7">
          <div className="filter">
            <Filter />
          </div>
          <div className="cards mb-5">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className="col-5 map">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default listPage;
