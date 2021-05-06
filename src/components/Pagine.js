import React, {useState, useEffect} from 'react';

const Pagine = ({postsPerPage, totalPosts, paginate, currentPage}) => {
    const pageNumbers = [];
    const [position, setPosition] = useState(currentPage);
    console.log('True currentPage -> ' + currentPage);

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {

        const paginePrevNext = () => {

            console.log('pageNumbers = ' + pageNumbers.length);
            console.log('position = ' + position)
            console.log('currentPage = ' + currentPage);

            if (position > 0 || position < pageNumbers.length) {
                console.log('Next / Prev');
                paginate(position);
            }

        }

        const disabledButton = () => {
            const buttonLeft = document.querySelector('.page-link-left');
            const buttonRight = document.querySelector('.page-link-right');

            if (pageNumbers)

                if (buttonLeft.hasAttribute('disabled')) buttonLeft.removeAttribute('disabled');
            if (buttonRight.hasAttribute('disabled')) buttonRight.removeAttribute('disabled');

            if (position === 1) {
                buttonLeft.setAttribute('disabled', 'true');
            } else if (position === pageNumbers.length) {
                buttonRight.setAttribute('disabled', 'true');
            }

        }


        paginePrevNext();
        disabledButton();

    }, [pageNumbers, position])


    return (
        <div>
            <nav>
                <ul className='pagination'>
                    <button className="page-link-button page-link-left" onClick={() => {
                        setPosition(position - 1);
                    }}>Précedent
                    </button>
                    <button className="page-link-button page-link-right" onClick={() => {
                        setPosition(position + 1);
                    }}>Suivant
                    </button>
                </ul>
            </nav>
        </div>
    );
};

export default Pagine;