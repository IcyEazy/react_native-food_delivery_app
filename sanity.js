// import { SanityClient } from "@sanity/client";
import { createClient } from "@sanity/client";
import imageBuilder from "@sanity/image-url";

// const client = SanityClient({
//   projectId: "waxy09vo",
//   dataset: "production",
//   apiVersion: "2022-03-10",
//   useCdn: true,
// });
const client = createClient({
  projectId: "waxy09vo",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
});

const builder = imageBuilder(client);

export const imageUrlFor = (source) => {
  return builder.image(source);
};

export default client;

// sanity cors add http://localhost:3000
