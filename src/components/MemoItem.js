import React, { useState } from 'react';
import MemoForm from './MemoForm';
import supabase from '../supabaseClient';

const MemoItem = ({ memo, fetchMemos }) => {

    const [isEditing, setIsEditing] = useState(false);

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
      <p>{memo.content}</p>
      {isEditing ? (
        <MemoForm memo={memo} fetchMemos={fetchMemos} setIsEditing={setIsEditing} />
      ) : (
        <button onClick={() => setIsEditing(true)}>수정</button>
      )}
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default MemoItem;
