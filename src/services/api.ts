import { createClient } from '@supabase/supabase-js';

export { BASE_URL, IMAGE_PATH, appendParams } from './config';
export const MEDIA_PATH = import.meta.env.VITE_BASE_MEDIA_URL

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)


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
