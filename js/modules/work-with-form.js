import { HASHTAG_MAX_COUNT, VALID_HASHTAG, ERROR_MESSAGE } from './constant.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const imageOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('#upload-cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const body = document.querySelector('body');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const hashtagsList = (hashtags) => hashtags.trim().split(' ').filter((tag) => tag.trim().length);
const isHashtagValid = (hashtag) => hashtagsList(hashtag).every((tag) => VALID_HASHTAG.test(tag));
const isHashtagCountLimit = (hashtags) => hashtagsList(hashtags).length <= HASHTAG_MAX_COUNT;
const areHashtagsUnique = (hashtags) => {
  const lowercaseHashtags = hashtagsList(hashtags).map((tag) => tag.toLowerCase());
  return lowercaseHashtags.length === new Set(lowercaseHashtags).size;
};

pristine.addValidator(
  hashtagsField,
  isHashtagValid,
  ERROR_MESSAGE.NOT_VALID,
  2,
  true
);
pristine.addValidator(
  hashtagsField,
  isHashtagCountLimit,
  ERROR_MESSAGE.MAX_COUNT,
  2,
  true
);
pristine.addValidator(
  hashtagsField,
  areHashtagsUnique,
  ERROR_MESSAGE.NOT_UNIQUE,
  1,
  true
);

const onEscape = (evt) => {
  if(evt.key === 'Escape'){
    evt.preventDefault();
    closeUploadForm();
    document.removeEventListener('keydown', onEscape);
  }
};

function openUploadForm() {
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscape);
  closeButton.addEventListener('click', closeUploadForm);
}

function closeUploadForm() {
  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  closeButton.removeEventListener('keydown', onEscape);
}

uploadFile.addEventListener('input', openUploadForm);
uploadForm.addEventListener('submit', () => {});

descriptionField.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape'){
    evt.stopPropagation();
  }
});
hashtagsField.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape'){
    evt.stopPropagation();
  }
});
