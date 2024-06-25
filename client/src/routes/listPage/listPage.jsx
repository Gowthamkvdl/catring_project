import React, { Suspense, useState } from "react";
import "./listPage.css";
import Filter from "../../components/filter/filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";

const ListPage = () => {
  const posts = useLoaderData();
  const [error, setError] = useState("");

  return (
    <div className="listPage container">
      <div className="row">
        <div className="col-12 col-md-7">
          <div className="filter">
            <Filter />
          </div>
          <div className="cards mb-5">
            <Suspense fallback={<div>Loading...</div>}>
              <Await
                resolve={posts.postResponse}
                errorElement={
                  <div>Some error happened. Please try again later.</div>
                }
              >
                {(postResponse) =>
                  postResponse.data.length > 0 ? (
                    postResponse.data.map((post) => (
                      <Card item={post} key={post.postId} />
                    ))
                  ) : (
                    <div>
                      No jobs found. Please use the filter to find suitable
                      jobs.
                    </div>
                  )
                }
              </Await>
            </Suspense>
          </div>
        </div>
        <div className="col-md-5 d-md-block d-none  map-container">
          <div className="map">
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={posts.postResponse}
                errorElement={<p>Error loading Map!</p>}
              >
                {(postResponse) => <Map items={postResponse.data} />}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
