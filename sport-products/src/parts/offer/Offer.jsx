import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './offer.css';
import { BiArrowToRight } from 'react-icons/bi';
import { BiArrowToLeft } from 'react-icons/bi';



function HorizontalItems() {
    const [data, setData] = useState([]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post("http://localhost:5000/fetchdata");
                setData(result.data);
            } catch (err) {
                alert("Error fetching data");
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const nextIndex = (currentItemIndex + 1) % data.length;
            setCurrentItemIndex(nextIndex);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [currentItemIndex, data]);

    const showItem = (index) => {
        if (index >= 0 && index < data.length) {
            setCurrentItemIndex(index);
        }
    };

    return (
        <div>
            <div className='item-container '> 
                <div className="main-container1  bg-light">
                <button className='previous btn btn-light' onClick={() => showItem((currentItemIndex - 1 + data.length) % data.length)}> <BiArrowToLeft style={{fontSize:"3rem"}}/></button>
                    <div className='main-container m-5 p-5'>
                    {data.slice(currentItemIndex, currentItemIndex + 2).map((user, index) => (
                        <div   key={index} className={`   item ${index === 0 ? 'active' : 'inactive'}`}>
                            <div className='product-container-items flex-sm-column pt-1 m-4'>
                                <h1>{user.username}</h1>
                                <div>{user.email}</div>
                                 
                        
                            </div>
                        </div>
                    ))}
                    </div>
                    <button className='next btn btn-light' onClick={() => showItem((currentItemIndex + 1) % data.length)}>< BiArrowToRight style={{fontSize:"3rem"}}/></button>
                </div>
                   
            </div>
        </div>
    );
}

export default HorizontalItems;
