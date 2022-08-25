import React from 'react';

import s from './notfoundblock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={s.root}>
      <h1 >
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={s.discription}>К сожалению данная страница осутствует в нашем интернет-магазине</p>
    </div>
  );
}

export default NotFoundBlock;
