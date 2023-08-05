import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface IPizzas {
    imageUrl: string,
    name: string,
    price: string
}

const FullPizza = () => {
    const [pizza, setPizza] = useState<IPizzas>()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://648b18e717f1536d65ea596a.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                alert('Ошибка, такой пиццы нет')
                navigate('/')
            }
        }
        fetchPizza()
    }, [])

    if (!pizza) {
        return <>'Загрузка...'</>
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt="" />
            <h2>{pizza.name}</h2>
            <h4>{pizza.price}</h4>
        </div>
    )
}

export default FullPizza