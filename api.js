import client from "./sanity";
// import SanityClient from "./sanity";

let sanityQuery = (query, params) => client.fetch(query, params);

export const getFeaturedRestaurants = () => {
  return sanityQuery(`
    *[_type=='featured']{
  ...,
  restaurants[]->{
    ...,
    dishes[]->{
      ...
    },
    type->{
    name
    }
  }
}
  `);
};

export const getCategories = () => {
  return sanityQuery(`
    *[_type=='category']
    `);
};

export const getFeaturedRestaurantById = (id) => {
  return sanityQuery(`
    *[_type=="featured" && _id=="${id}"]{
  ..., 
  restaurants[]->{
    ...,
    dishes[]->{
      ...
    },
    type->{
    name
    }
  }
    }
    `);
};
export const getRestaurantById = (id) => {
  return sanityQuery(`
    *[_type=="restaurant" && _id=="${id}"]{
  ...,
      dishes[]->{
        ...
      },
      type->{
      name
      }
    }
    `);
};
