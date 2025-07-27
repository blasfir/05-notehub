import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from "../../services/noteService";

/*interface Props {
  page: number;
  perPage: number;
}*/

interface NoteListProps {
    notes: Note[];
    isLoading: boolean;
  isError: boolean;
}

export default function NoteList({ notes, isLoading, isError }: NoteListProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
    
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>An error occurred while loading.</p>;
  if (notes.length === 0) return <p>No notes found.</p>;

    
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => deleteMutation.mutate(Number(note.id))} disabled={deleteMutation.status === 'pending'}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

