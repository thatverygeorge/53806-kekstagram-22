const COMMENTS_TO_ADD = 5;

const commentsList = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureSocialCommentCount = document.querySelector('.social__comment-count');

const createCommentElement = function (comment) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentElementImage = document.createElement('img');
  commentElementImage.classList.add('social__picture');
  commentElementImage.src = comment.avatar;
  commentElementImage.alt = comment.name;
  commentElementImage.width = '35';
  commentElementImage.height = '35';

  commentElement.appendChild(commentElementImage);

  const commentElementParagraph = document.createElement('p');
  commentElementParagraph.classList.add('social__text');
  commentElementParagraph.textContent = comment.message;

  commentElement.appendChild(commentElementParagraph);

  return commentElement;
}

const clearComments = function () {
  commentsList.innerHTML = '';
}

const renderComments = function (picture) {
  const comments = picture.comments;

  return function () {
    let currentNumberOfComments = commentsList.children.length;

    const commentsListFragment = document.createDocumentFragment();

    comments
      .slice(currentNumberOfComments, currentNumberOfComments + COMMENTS_TO_ADD)
      .forEach(function (comment) {
        const commentElement = createCommentElement(comment);
        commentsListFragment.appendChild(commentElement);
      });

    commentsList.appendChild(commentsListFragment);

    currentNumberOfComments = commentsList.children.length;

    if (currentNumberOfComments === comments.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }

    const commentCountHTML = `${currentNumberOfComments} из <span class="comments-count">${comments.length}</span> комментариев`;
    bigPictureSocialCommentCount.innerHTML = commentCountHTML;
  }
}

export { clearComments, renderComments };
