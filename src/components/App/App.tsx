import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';
import { useDebounce } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import type { NOTEHUBResponse } from "../../services/noteService";
import type { Note } from '../../types/note';
import { useEffect } from 'react'; 

export default function App() {
 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false); 
  
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");    
  const [debouncedSearch] = useDebounce(search, 500);  
  
  const { data, isLoading, isError } = useQuery<NOTEHUBResponse>({
     queryKey: ["notes", page, debouncedSearch],
     queryFn: () => fetchNotes(page, 12, debouncedSearch),
     placeholderData: (prevData) => prevData,
  });
    
  useEffect(() => {
     if (data?.totalPages !== undefined) {
       setPageCount(data.totalPages);
     }
   }, [data]);

   const notes: Note[] = data?.notes || [];

   const handleSearchChange = (newSearch: string) => {
     setPage(1);
     setSearch(newSearch);
   };


  return (
      <div className={css.app}>
        <header className={css.toolbar}>
              <SearchBox value={search} onChange={handleSearchChange}  />
              {notes.length > 0 && (
                  <Pagination
                     currentPage={page}
                     onPageChange={setPage}
                     pageCount={pageCount}
                  />
              )}
              <button className={css.button} onClick={openModal} type="button">
                   Create note +
              </button>
          </header>
          {isLoading && <strong>Loading...</strong>}
          {notes.length > 0 && (
             <NoteList notes={notes} isLoading={isLoading} isError={isError} />
          )}
          {isModalOpen && (
              <Modal onClose={closeModal}>
                  <NoteForm onSuccess={closeModal} onCancel={closeModal} />
              </Modal>  
          )}
      </div>
  );
}

