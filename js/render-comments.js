const commentsList = document.querySelector('.social__comments');

const clearComments = function () {
  commentsList.innerHTML = '';
}

const renderComments = function (picture) {
  const comments = picture.comments;

  clearComments();

  const commentsListFragment = document.createDocumentFragment();

  comments.forEach(function (comment) {
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

    if (commentsListFragment.children.length < 5) {
      commentsListFragment.appendChild(commentElement);
    }
  });

  commentsList.appendChild(commentsListFragment);
}

export { clearComments, renderComments };
