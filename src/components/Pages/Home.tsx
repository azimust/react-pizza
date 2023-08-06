import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Categories from '../Categories';
import PizzaBlock from '../PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';
import Sort, { sortList } from '../Sort';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../../redux/slices/filterSlice';
import qs from 'qs'
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizzas, setItems } from '../../redux/slices/pizzaSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = useRef(false)

    const { sort, categoryId, page, searchValue } = useSelector(state => state.filter)
    const { items, status } = useSelector(state => state.pizza)

    const handleCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const handlePage = (page: number) => {
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
        if (!window.location.search) {
            fetchPizzas()
        }
    }, [categoryId, sort.sortProperty, page, searchValue])

    useEffect(() => {
        getPizzas()
    }, [categoryId, sort.sortProperty, page, searchValue])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
            if (sort) {
                params.sort = sort;
            }
            dispatch(setFilters(params));
        }
        isMounted.current = true;
    }, [])

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
                        : items.map((pizza) => <Link key={pizza.id} to={`pizza/${pizza.id}`}><PizzaBlock {...pizza} image={pizza.imageUrl} /></Link>)
                    }
                </div>
            )}
            <Pagination page={page} handlePage={handlePage} />
        </div>
    )
}

export default Home