import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../../assets/img/empty-cart.png';
import s from './cartempty.module.scss';

const CartEmpty: React.FC = () => (
  <div className={s.cartempty}>
    <h2>
      Корзина пустая <span>😕</span>
    </h2>
    <p>
      Вероятно, вы ещё не заказывали пиццу.
      <br />
      Для того, чтобы заказать пиццу, перейди на главную страницу.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className={s.cartempty__btn}>
      <span>Вернуться назад</span>
    </Link>
  </div>
);

export default CartEmpty;
