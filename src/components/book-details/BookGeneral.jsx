import React from 'react';
import EditBook from '../EditBook';

function BookGeneral({ book, id }) {
  return (
    <div className="bookGeneral">
      <h1>수정하기</h1>
      <p>책: {book.title}</p>
      <hr />
      <EditBook book={book} id={id} />
    </div>
  );
}

export default BookGeneral;
