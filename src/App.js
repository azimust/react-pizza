import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';
import { useEffect, useState } from 'react';

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('https://648b18e717f1536d65ea596a.mockapi.io/items')
    .then(res => res.json())
    .then(arr => setPizzas(arr))
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => {
              return <PizzaBlock key={pizza.id} {...pizza} image={pizza.imageUrl}/>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
