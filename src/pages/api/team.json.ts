import { getCollection } from "astro:content";
const teams = await getCollection("teams");

export const GET = async () => {
  console.log(teams[0].data.social);
  return new Response(JSON.stringify(teams));
};
