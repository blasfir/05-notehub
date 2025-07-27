import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
//import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';
import { fetchNotes } from '../../services/noteService'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);  
    
  const { data, isLoading } = useQuery({
        queryKey: ['notes'],
        queryFn: fetchNotes,
  }) 
    
  //const [page, setPage] = useState(1);
  //const perPage = 12;  

  return (
      <div className={css.app}>
        <header className={css.toolbar}>
              <SearchBox/>
              <button className={css.button} onClick={openModal}>
                   Create note +
              </button>
          </header>
          {isLoading && <strong>Loading...</strong>}
          {data && !isLoading && <NoteList notes={data} />}
          {isModalOpen && (
              <Modal onClose={closeModal}>
                  <NoteForm onClose={closeModal}/>
              </Modal>  
          )}
      </div>
  );
}

