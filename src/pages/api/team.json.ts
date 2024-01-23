import {getCollection} from 'astro:content';
const teams = await getCollection("teams");

export const GET = async() => {
    return new Response(
        JSON.stringify(teams)
    )
}