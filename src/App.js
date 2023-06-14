import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
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
            <PizzaBlock id={1} image='https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg' title='Чизбургер-пицца' price={395}/>
            <PizzaBlock id={2} image='https://dodopizza-a.akamaihd.net/static/Img/Products/9cf62eab14b64d6a8ce0a9f5710f4f76_292x292.webp' title='Песто' price={500}/>
            <PizzaBlock id={3} image='https://dodopizza-a.akamaihd.net/static/Img/Products/22eead365d6a451eb0e398a6bab07823_292x292.webp' title='Пепперони' price={600}/>
            <PizzaBlock id={4} image='https://dodopizza-a.akamaihd.net/static/Img/Products/ebbfdf6f8fa74935af77b784a1ff2e1d_292x292.webp' title='Аррива' price={445}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
