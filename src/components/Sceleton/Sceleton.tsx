import React from 'react';
import ContentLoader from 'react-content-loader';
import s from '../PizzaBlock/pizzablock.module.scss';

const Sceleton: React.FC = () => {
  return (
    <ContentLoader className={`${s.pizzaBlock} ${s.sceleton}`} speed={2} width={315} height={515} viewBox="0 0 315 515" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
      <rect x="527" y="237" rx="3" ry="3" width="88" height="6" />
      <rect x="569" y="235" rx="3" ry="3" width="52" height="6" />
      <rect x="422" y="239" rx="3" ry="3" width="410" height="6" />
      <rect x="-257" y="-71" rx="3" ry="3" width="380" height="6" />
      <rect x="440" y="226" rx="3" ry="3" width="178" height="6" />
      <circle cx="579" cy="229" r="20" />
      <circle cx="603" cy="235" r="67" />
      <rect x="478" y="574" rx="0" ry="0" width="260" height="29" />
      <rect x="0" y="305" rx="10" ry="10" width="270" height="80" />
      <rect x="160" y="399" rx="10" ry="10" width="110" height="30" />
      <rect x="0" y="265" rx="10" ry="10" width="270" height="28" />
      <circle cx="133" cy="125" r="125" />
      <rect x="0" y="400" rx="10" ry="10" width="91" height="30" />
    </ContentLoader>
  );
};

export default Sceleton;
