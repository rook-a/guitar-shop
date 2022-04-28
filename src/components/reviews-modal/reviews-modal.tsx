import { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectSendCommentStatus, sendCommentAction } from '../../store/comments-slice/comments-slice';
import { selectGuitar } from '../../store/guitars-slice/guitars-slice';
import { FetchStatus, RatingLabelMap } from '../../utils/const';

const REG_EXP_NAME = /^[аА-яЯaA-zZ'][аА-яЯaA-zZ -' ]+[аА-яЯaA-zZ']?$/i;
const REG_EXP_RATING = /[1-5]/;
const REG_EXP_TEXT = /[аА-яЯaA-zZ]{3}/i;

interface ReviewsModalProps {
  className: string;
  onModalCloseClick: () => void;
}

interface LoginField {
  value: string;
  regexp: RegExp;
  error: boolean;
  errorText: string;
}

type InitialState = { [key: string]: LoginField };

function ReviewsModal({ className, onModalCloseClick }: ReviewsModalProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const guitar = useAppSelector(selectGuitar);
  const sendCommentStatus = useAppSelector(selectSendCommentStatus);
  const inputFocus = useRef<HTMLInputElement>(null);
  const [formState, setFormState] = useState<InitialState>({
    name: {
      value: '',
      regexp: REG_EXP_NAME,
      error: false,
      errorText: 'Заполните поле',
    },
    rating: {
      value: '0',
      regexp: REG_EXP_RATING,
      error: false,
      errorText: 'Поставьте оценку',
    },
    advantage: {
      value: '',
      regexp: REG_EXP_TEXT,
      error: false,
      errorText: 'Заполните поле',
    },
    disadvantage: {
      value: '',
      regexp: REG_EXP_TEXT,
      error: false,
      errorText: 'Заполните поле',
    },
    comment: {
      value: '',
      regexp: REG_EXP_TEXT,
      error: false,
      errorText: 'Заполните поле',
    },
  });

  useEffect(() => {
    inputFocus.current?.focus();
  }, []);

  if (!guitar) {
    return null;
  }

  const { name, id } = guitar;
  const ratingLabelMapRevers: [string, string][] = Object.entries(RatingLabelMap).reverse();
  const isValid = Object.values(formState).some(({ error }) => error);
  const isFormDisabled = sendCommentStatus === FetchStatus.Pending;

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = evt.target;

    const regExp = formState[name].regexp;
    const isValid = regExp.test(value);

    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        error: !isValid,
        value,
      },
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const data = {
      guitarId: id,
      userName: formState.name.value,
      advantage: formState.advantage.value,
      disadvantage: formState.disadvantage.value,
      comment: formState.comment.value,
      rating: Number(formState.rating.value),
    };

    dispatch(sendCommentAction(data));
  };

  return (
    <div className={`modal modal--review ${className}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onModalCloseClick} />
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
          <form className="form-review" onSubmit={handleSubmit}>
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">
                  Ваше Имя
                </label>
                <input
                  onChange={handleChange}
                  ref={inputFocus}
                  className="form-review__input form-review__input--name"
                  id="user-name"
                  type="text"
                  autoComplete="off"
                  name="name"
                  value={formState.name.value}
                  required
                  disabled={isFormDisabled}
                />
                {formState.name.error && <p className="form-review__warning">{formState.name.errorText}</p>}
              </div>
              <div>
                <span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  {ratingLabelMapRevers.map(([value, title]) => (
                    <Fragment key={title}>
                      <input
                        onChange={handleChange}
                        className="visually-hidden"
                        id={`star-${value}`}
                        name="rating"
                        type="radio"
                        value={value}
                        required
                        disabled={isFormDisabled}
                      />
                      <label className="rate__label" htmlFor={`star-${value}`} title={title} />
                    </Fragment>
                  ))}
                  {formState.rating.error && <p className="rate__message">{formState.rating.errorText}</p>}
                </div>
              </div>
            </div>
            <label className="form-review__label form-review__label--required" htmlFor="adv">
              Достоинства
            </label>
            <input
              onChange={handleChange}
              className="form-review__input"
              id="adv"
              type="text"
              autoComplete="off"
              name="advantage"
              value={formState.advantage.value}
              required
              disabled={isFormDisabled}
            />
            {formState.advantage.error && <p className="form-review__warning">{formState.advantage.errorText}</p>}

            <label className="form-review__label form-review__label--required" htmlFor="disadv">
              Недостатки
            </label>
            <input
              onChange={handleChange}
              className="form-review__input"
              id="disadv"
              type="text"
              autoComplete="off"
              name="disadvantage"
              value={formState.disadvantage.value}
              required
              disabled={isFormDisabled}
            />
            {formState.disadvantage.error && <p className="form-review__warning">{formState.disadvantage.errorText}</p>}

            <label className="form-review__label form-review__label--required" htmlFor="comment">
              Комментарий
            </label>
            <textarea
              onChange={handleChange}
              className="form-review__input form-review__input--textarea"
              id="comment"
              rows={10}
              autoComplete="off"
              name="comment"
              value={formState.comment.value}
              required
              disabled={isFormDisabled}
            />
            {formState.comment.error && <p className="form-review__warning">{formState.comment.errorText}</p>}

            <button
              className="button button--medium-20 form-review__button"
              type="submit"
              disabled={isValid || isFormDisabled}>
              Отправить отзыв
            </button>
          </form>
          <button
            onClick={onModalCloseClick}
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть">
            <span className="button-cross__icon" />
            <span className="modal__close-btn-interactive-area" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewsModal;
