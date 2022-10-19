import React, { useRef } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, SearchPizzaParams } from '../redux/slices/pizzaSlice';
import Categories from '../components/Categories/Categories';
import Sort, { sortList } from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sceleton from '../components/Sceleton/Sceleton';

import s from '../scss/content.module.scss';

const Home: React.FC = () => {
  const isMounted = useRef(false);

  const { items, status } = useSelector((state: RootState) => state.pizza);
  const { categoryId, sort } = useSelector((state: RootState) => state.filter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChangeCategory = React.useCallback((index: number) => dispatch(setCategoryId(index)), []);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');

    dispatch(
      fetchPizzas({
        category,
        sortBy,
      }),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        sortProperty: sort.sortProperty,
        categoryId: categoryId,
      };
      const queryString = qs.stringify({ params, skipNulls: true });
      navigate(`/?${queryString}`);
    }

    if (!window.location.search) {
      dispatch(fetchPizzas({}));
    }
  }, [categoryId, sort.sortProperty]);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilter({
          categoryId: Number(params.category) ? Number(params.category) : 0,
          sort: sort || sortList[0],
        }),
      );
    }
    isMounted.current = true;
  }, []);

  return (
    <>
      <div className={s.content__top}>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2>Все пиццы</h2>
      {status === 'error' ? (
        <div className={s.content__error}>
          <h2>Произошла ошибка😕</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className={s.content__items}>{status === 'loading' ? [...new Array(6)].map((_, i) => <Sceleton key={i} />) : items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}</div>
      )}
    </>
  );
};

export default Home;
