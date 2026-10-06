export { BASE_URL, tmdbImage, appendParams } from './config';
export type { TmdbImageSize } from './config';
export const MEDIA_PATH = import.meta.env.VITE_BASE_MEDIA_URL

export const fetchMovies = async(URL: string) => {
    try {
        const response = await fetch(URL)
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data =  await response.json()
        return data
    }
    catch(error) {
        console.error('Error fetching movies', error)
    }
}

export default fetchMovies
