import React, { useState, useEffect } from 'react';
import MemoItem from './MemoItem';
import MemoForm from './MemoForm';
import supabase from '../supabaseClient';

const MemoList = () => {
  const [memos, setMemos] = useState([]);

  // 메모 데이터를 불러오는 함수
  const fetchMemos = async () => {
    const { data, error } = await supabase.from('aimo').select('*').order('id', { ascending: false });

    if (error) {
      console.error('Error fetching memos:', error);
    } else {
      setMemos(data);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  return (
    <div>
      <h1>TARAE</h1>
      
      <div className="input-area">
        <MemoForm fetchMemos={fetchMemos} />
      </div>

      <div className="list-area">
        {memos.map((memo) => (
          <MemoItem key={memo.id} memo={memo} fetchMemos={fetchMemos} />
        ))}
      </div>

    </div>
  );
};

export default MemoList;
