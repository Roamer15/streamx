export const API_KEY = import.meta.env.VITE_BASE_API_KEY
export const BASE_URL = import.meta.env.VITE_BASE_BASE_URL
export const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280'
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