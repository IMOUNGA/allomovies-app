import React from 'react';

const Pagine = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div>
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <button onClick={(e) => paginate(e, number)} className='page-link'>
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagine;