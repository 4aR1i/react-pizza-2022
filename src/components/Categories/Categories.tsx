import React from 'react';
import s from './categories.module.scss';

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  return (
    <div className={s.categories}>
      <ul>
        {categories.map((category, index) => (
          <li
            className={value === index ? `${s.active}` : ''}
            onClick={() => onChangeCategory(index)}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
