import React, { Suspense, useState } from "react";
import "./listPage.css";
import Filter from "../../components/filter/filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";
import BackBtn from "../../components/backBtn/BackBtn";
import NoData from "../../components/noData/NoData";

const ListPage = () => {
  const posts = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPost, setTotalPost] = useState(0);

  const initialQuery = {
    location: searchParams.get("location") || "",
    date: searchParams.get("date") || "",
    maxWorkingDays: searchParams.get("maxWorkingDays") || "100",
    minSalary: searchParams.get("minSalary") || "0",
    limit: searchParams.get("limit") || "5",
  };

  const [query, setQuery] = useState(initialQuery);

  const loadMore = () => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      limit: (Number(prevQuery.limit) || 0) + 5,
    }));
  };

  return (
    <div className="listPage container">
      <div className="d-flex flex-row mx-auto">
        <div className="filterAndCards">
        <BackBtn color={"#ffffff"} link={"/"} />
          <div className="filter">
            <Filter query={query} setQuery={setQuery} loadMore={loadMore} />
          </div>
          <div className="cards mb-5">
            <Suspense
              fallback={
                <div>
                  <Loader message={"Loading jobs for you..."} />
                </div>
              }
            >
              <Await
                resolve={posts.postResponse}
                errorElement={
                  <div>
                    <ErrorComponent />
                  </div>
                }
              >
                {(postResponse) =>
                  postResponse.data.postData.length > 0 ? (
                    (setTotalPost(postResponse.data.postData.length),
                    postResponse.data.postData.map((post) => (
                      <Card item={post} key={post.postId} />
                    )))
                  ) : (
                    <div>
                      {setTotalPost(0)}
                      <NoData heading={"No jobs found"} text={"No jobs found. Please use the filter to find suitable jobs."} />
                      
                    </div>
                  )
                }
              </Await>
              <div
                className={`btn btn-yellow mt-3 d-flex justify-content-center mx-1 ${
                  totalPost < query.limit ? "d-none" : ""
                }`}
                onClick={loadMore}
              >
                Show more jobs
              </div>
            </Suspense>
          </div>
        </div>
        <div className="listPageMap d-none d-md-block">
          <Suspense
            fallback={
              <div>
                <Loader message={"Loading Map..."}></Loader>
              </div>
            }
          >
            <Await resolve={posts.postResponse} errorElement={<p></p>}>
              {(postResponse) => (
                <Map className="map" items={postResponse.data.postData} />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
