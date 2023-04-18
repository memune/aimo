import React from 'react';
import MemoForm from './MemoForm';
import supabase from '../supabaseClient';

const MemoItem = ({ memo, fetchMemos }) => {
  const handleDelete = async () => {
    const { error } = await supabase.from('aimo').delete().match({ id: memo.id });

    if (error) {
      console.error('Error deleting memo:', error);
    } else {
      fetchMemos();
    }
  };

  return (
    <div>
      <h2>{memo.title}</h2>
      <p>{memo.content}</p>
      <MemoForm memo={memo} fetchMemos={fetchMemos} />
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default MemoItem;
