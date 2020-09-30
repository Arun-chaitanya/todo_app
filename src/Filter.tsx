import React from 'react'
import './Filter.css'

interface FilterProps{
    filterNone:(event: React.MouseEvent<HTMLButtonElement>)=>void;
    filterPersonal:(event: React.MouseEvent<HTMLButtonElement>)=>void;
    filterWork:(event: React.MouseEvent<HTMLButtonElement>)=>void;
    filterShopping:(event: React.MouseEvent<HTMLButtonElement>)=>void;
    filterOthers:(event: React.MouseEvent<HTMLButtonElement>)=>void;
}

const Filter:React.FC<FilterProps> = ({filterNone,filterPersonal,filterWork,filterShopping,filterOthers}) => {
    return (
        <div className='filter'>
            <button className='button1' onClick={filterNone}>All</button>
            <button className='button2' onClick={filterPersonal}>Personal</button>
            <button className='button3' onClick={filterWork}>Work</button>
            <button className='button4' onClick={filterShopping}>Shopping</button>
            <button className='button5' onClick={filterOthers}>Others</button>
        </div>
    )
}

export default Filter
