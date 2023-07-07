import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Categories from '../Categories';
import PizzaBlock from '../PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';
import Sort, { sortList } from '../Sort';
import Pagination from '../Pagination';
import { SearchContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, setItems } from '../../redux/slices/pizzaSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { sort, categoryId, page } = useSelector(state => state.filter)
    const { items, status } = useSelector(state => state.pizza)

    const { searchValue } = useContext(SearchContext);

    const handleCategory = useCallback((idx) => {
        dispatch(setCategoryId(idx))
    }, [])

    const handlePage = page => {
        dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
        const search = searchValue ? searchValue : '';

        try {
            dispatch(
                fetchPizzas({
                    category,
                    sortBy,
                    order,
                    search,
                    page
                })
            )
        } catch (error) {
            console.log(error);
            alert("Ошибка при получении пицц")
        }
    }

    useEffect(() => {
        if (isMounted.current) {
            const params = {
                categoryId: categoryId > 0 ? categoryId : null,
                sortProperty: sort.sortProperty,
                page
            }

            const queryString = qs.stringify(params, { skipNulls: true })

            navigate(`/?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, page, searchValue])

    useEffect(() => {
        getPizzas()
    }, [categoryId, sort.sortProperty, page, searchValue])

    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, page])

    return (
        <div className='container'>
            <div className="content__top">
                <Categories categoryId={categoryId} handleCategory={handleCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2>Произошла ошибка</h2>
                    <p>Не удалось получить пиццы</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading'
                        ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
                        : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} image={pizza.imageUrl} />)
                    }
                </div>
            )}
            <Pagination page={page} handlePage={handlePage} />
        </div>
    )
}

export default Home