import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment, EditComment } from '../../actions/post';
import ReplyCommentForm from '../post/ReplyCommentForm';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => {
  const [Show, setShow] = useState(false);
  const [edit, setEdit] = useState(true);
  const [texte, setText] = useState(text);
  var additional = () => {
    setShow(false);
  };
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <input
          className="my-1"
          disabled={edit}
          value={texte}
          onChange={(e) => setText(e.target.value)}
        />

        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <div>
            <button
              onClick={() => deleteComment(postId, _id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
            {edit ? (
              <Link
                onClick={() => {
                  setEdit(false);
                }}
              >
                Edit
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  EditComment(postId, _id, { texte });
                  setEdit(true);
                }}
                className="btn btn-dark my-1"
              >
                Save
              </button>
            )}
            <a
              style={{ marginLeft: '15px', cursor: 'pointer' }}
              onClick={() => {
                setShow(true);
              }}
            >
              Reply
            </a>
            {Show ? (
              <ReplyCommentForm postId={postId} xmark={additional} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
