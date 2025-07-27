export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface newNote {
  title: string;
  content: string;
  tag: string;
}

export const NoteTag = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
