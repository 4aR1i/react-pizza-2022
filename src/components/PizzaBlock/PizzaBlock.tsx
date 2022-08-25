import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import s from './pizzablock.module.scss';

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, imageUrl, title, types, sizes, price }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((obj: any) => obj.id === id));
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const typeNames = ['тонкое', 'традиционное'];
  const sizeNames = ['26', '30', '40'];

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      imageUrl,
      title,
      price,
      type: typeNames[activeType],
      size: sizeNames[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className={s.pizzaBlock__wrapper}>
      <div className={s.pizzaBlock}>
        <a href="/">
          <img className={s.pizzaBlock__image} src={imageUrl} alt="Pizza" />
          <h4 className={s.pizzaBlock__title}>{title}</h4>
        </a>
        <div className={s.pizzaBlock__selector}>
          <ul>
            {types.map((typeId) => (
              <li
                className={activeType === typeId ? `${s.active}` : ''}
                onClick={() => setActiveType(typeId)}
                key={typeId}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                className={activeSize === i ? `${s.active}` : ''}
                onClick={() => setActiveSize(i)}
                key={i}
              >
                {size} см
              </li>
            ))}
          </ul>
        </div>
        <div className={s.pizzaBlock__bottom}>
          <div className={s.pizzaBlock__price}>от {price} ₽</div>
          <button onClick={onClickAdd} className={s.button}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="#fe5f1e"
              ></path>
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
