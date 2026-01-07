import type { GenreData } from "../types/media.types";
import { BASE_URL } from "./api";

async function fetchGenres(){
  try {
   
    const response = await fetch(`${BASE_URL}/genre/movie/list?language=en`);
      if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const genres =  await response.json()
        return genres
  } catch (error) {

        console.error('Error fetching movies', error)
  }
}

export default function genreConversion(ids: number[]){
    const fetchedGenres: GenreData[] = fetchGenres();
    for(){
      
    }

}