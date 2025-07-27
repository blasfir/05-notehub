//import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
//import { fetchNotes, deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

/*interface Props {
  page: number;
  perPage: number;
}*/

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

