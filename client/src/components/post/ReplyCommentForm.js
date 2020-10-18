import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, addCommentinside } from '../../actions/post';

const ReplyCommentForm = ({ postId, addCommentinside, xmark }) => {
  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addCommentinside(postId, { text });
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="15"
          rows="2"
          placeholder="Reply the comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
        <button onClick={xmark} type="button" className="btn btn-danger">
          <i className="fas fa-times" />
        </button>
      </form>
    </div>
  );
};

export default connect(null, { addCommentinside })(ReplyCommentForm);
