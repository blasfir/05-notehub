import axios from 'axios';
import type { Note, newNote } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

/*interface NOTEHUBResponse {
  results: Note[];
  page: number;
  total_pages: number;
}*/

/*interface NOTEHUBResponse {
    notes: Note[];
}*/

/*export const fetchNotes = async (query: string, page: number, perPage: number): Promise<NOTEHUBResponse>  => {
    const config = {
        params: { query, page, perPage },
        headers: {
        Authorization: `Bearer ${TOKEN}`,
        },
    };
    const response = await axios.get(BASE_URL, config);  
    return response.data;
};*/

export const fetchNotes = async () => {
    const config = {
        headers: {
        Authorization: `Bearer ${TOKEN}`,
        },
    };
    const response = await axios.get(BASE_URL, config);  
    console.log(response.data);
    return response.data;

};

export const createNote = async (note: newNote): Promise<Note> => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  };  
  const response = await axios.post(BASE_URL, note, config);
  return response.data;
};

export const deleteNote = async (Id: string): Promise<Note> => {
    const config = {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    };
    const response = await axios.delete(`${BASE_URL}/${Id}`, config)
    return response.data;
};

