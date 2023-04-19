import React, { useState } from 'react';
import supabase from '../supabaseClient';

const MemoForm = ({ memo, fetchMemos, setIsEditing }) => {
  const [content, setContent] = useState(memo ? memo.content : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (memo) {
            // 기존 메모 수정
        const { data, error } = await supabase
        .from('aimo')
        .update({ content, updated_at: new Date() })
        .match({ id: memo.id });

    if (error) {
        console.error('Error updating memo:', error);
    } else {
        setIsEditing(false);
        fetchMemos();
    }
      } else {
        // 새 메모 생성
        const { data, error } = await supabase
          .from('aimo')
          .insert([{ content, updated_at: new Date() }]);
    
        if (error) {
          console.error('Error creating memo:', error);
        } else {
          // 폼 초기화
          setContent('');
          fetchMemos();
        }
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">{memo ? '' : 'Leave a mark'}</button>
    </form>
  );
};

export default MemoForm;
