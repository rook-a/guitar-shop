import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectSendCouponStatus, sendCoupon } from '../../store/order-slice/order-slice';

import { FetchStatus } from '../../utils/const';
import { SendCouponMessage } from '../../types/coupon';

const REG_EXP = /light-333|medium-444|height-555/gi;

function CouponForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const sendCouponStatus = useAppSelector(selectSendCouponStatus);
  const isFulfilled = sendCouponStatus === FetchStatus.Fulfilled;
  const isRejected = sendCouponStatus === FetchStatus.Rejected;
  const sendCouponMessage = (isFulfilled && SendCouponMessage.Success) || (isRejected && SendCouponMessage.Error);
  const [coupon, setCoupon] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (coupon === '') {
      setIsValid(false);
    }
  }, [coupon]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    const isValidValue = REG_EXP.test(value);

    setCoupon(value);
    setIsValid(!isValidValue);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(sendCoupon(coupon.trim()));
  };

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form className="coupon__form" id="coupon-form" method="post" action="/" onSubmit={handleSubmit}>
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input
            onChange={handleChange}
            value={coupon}
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            name="coupon"
          />
          <p
            className={cn('form-input__message', {
              'form-input__message--success': isFulfilled,
              'form-input__message--error': isRejected || isValid,
            })}>
            {sendCouponMessage}
            {isValid && SendCouponMessage.Error}
          </p>
        </div>
        <button className="button button--big coupon__button" type="submit" disabled={isValid}>
          Применить
        </button>
      </form>
    </div>
  );
}

export default CouponForm;
