import React, { useRef } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setFilter } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import Categories from '../components/Categories/Categories';
import Sort, { sortList } from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sceleton from '../components/Sceleton/Sceleton';

import s from '../scss/content.module.scss';

const Home: React.FC = () => {
  const isMounted = useRef(false);

  const { items, status } = useSelector((state) => state.pizza);
  const { categoryId, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    dispatch(fetchPizzas({ category, sort }));

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilter({
          ...params,
          sort,
        }),
      );
    }
  }, []);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort]);

  return (
    <>
      <div className={s.content__top}>
        <Categories
          value={categoryId}
          onChangeCategory={(index: number) => dispatch(setCategoryId(index))}
        />
        <Sort />
      </div>
      <h2>Все пиццы</h2>
      {status === 'error' ? (
        <div className={s.content__error}>
          <h2>Произошла ошибка😕</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className={s.content__items}>
          {status === 'loading'
            ? [...new Array(6)].map((_, i) => <Sceleton key={i} />)
            : items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
        </div>
      )}
    </>
  );
}

export default Home;
