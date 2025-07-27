import axios from 'axios';
import type { Note, newNote } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface NOTEHUBResponse {
  notes: Note[];
  totalPages: number;
}

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

export const fetchNotes = async (page: number = 1, perPage: number = 12, search: string = ""): Promise<NOTEHUBResponse> => {
    const config = {
        headers: {
        Authorization: `Bearer ${TOKEN}`,
        },
    };
    const params = new URLSearchParams({
        page: String(page),
        perPage: String(perPage),
    });
    if (search) params.append("search", search);
    const response = await axios.get<NOTEHUBResponse>(`${BASE_URL}?${params.toString()}`, config);
    return response.data;

};

export const createNote = async (note: newNote): Promise<Note> => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };  
  const response = await axios.post<Note>(BASE_URL, note, config);
  return response.data;
};

export interface dN {
  note: Note;
}

export const deleteNote = async (Id: number): Promise<Note> => {
    const config = {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    };
    const response = await axios.delete<dN>(`${BASE_URL}/${Id}`, config)
    return response.data.note;
};

