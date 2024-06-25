import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ params }) => {
  const { id } = params;
  const response = await apiRequest.get("/post/" + id);
  return response.data;
};

export const listPageLoader = async ({ request }) => {
  const location = request.url.split("?")[1];
  const postPromsie = apiRequest.get("/post/?" + location);
  return defer({
    postResponse: postPromsie,
  })
};
