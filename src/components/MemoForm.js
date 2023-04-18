import React, { useState } from 'react';
import supabase from '../supabaseClient';

const MemoForm = ({ memo, fetchMemos }) => {
  const [title, setTitle] = useState(memo ? memo.title : '');
  const [content, setContent] = useState(memo ? memo.content : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (memo) {
            // 기존 메모 수정
        const { data, error } = await supabase
        .from('aimo')
        .update({ title, content, updated_at: new Date() })
        .match({ id: memo.id });

    if (error) {
        console.error('Error updating memo:', error);
    } else {
        fetchMemos();
    }
      } else {
        // 새 메모 생성
        const { data, error } = await supabase
          .from('aimo')
          .insert([{ title, content, updated_at: new Date() }]);
    
        if (error) {
          console.error('Error creating memo:', error);
        } else {
          // 폼 초기화
          setTitle('');
          setContent('');
          fetchMemos();
        }
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">{memo ? '수정' : '추가'}</button>
    </form>
  );
};

export default MemoForm;
