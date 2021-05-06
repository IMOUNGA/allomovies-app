import React, {useState, useEffect} from 'react';
import {movies$} from '../api/movies';

import Posts from "./Posts";
import Pagine from "./Pagine";

// https://fr.reactjs.org/docs/hooks-rules.html

const Movies = () => {
    const [posts, setPosts] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [category, setCategory] = useState([]);

    const [loading, setLoading] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [loadOnce, setLoadOnce] = useState(true);
    const [deleteOnce, setDeleteOne] = useState(false);

    const radios = ["4", "8", "12"];

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => {


        setCurrentPage(pageNumber);

        console.log(pageNumber);
    }

    const deleteOneMovie = (id) => {
        setDeleteOne(id);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            if (loadOnce){
                await movies$.then(res => {
                    setPosts(res);
                    setLoading(false);
                })
                setLoadOnce(false);
            } else {
                setLoading(false)
            }
        }

        const getCategory = () => {
            let categories = Object.keys(posts).map((i) => posts[i].category);
            let categoriesFiltered = [...new Set(categories)];

            setCategory(categoriesFiltered);
        }

        const deleteMovie = () => {

            if (deleteOnce !== false){
                if(sortedData.length > 0) {
                    /** TODO a refaire: Pas propre du tout  **/
                    let indexOfMovie = sortedData.findIndex((movie) => {
                        return movie.id === `${deleteOnce}`;
                    })

                    let indexOfMoviePosts = posts.findIndex((movie) => {
                        return movie.id === `${deleteOnce}`;
                    })

                    sortedData.splice(indexOfMovie, 1);
                    posts.splice(indexOfMoviePosts, 1);

                    setPosts(posts);

                    setSortedData(sortedData);
                    setDeleteOne(false);
                } else {
                    let indexOfMovie = posts.findIndex((movie) => {
                        return movie.id === `${deleteOnce}`;
                    })

                    posts.splice(indexOfMovie, 1);

                    setPosts(posts);
                    setDeleteOne(false);
                }

            }
        }


        fetchPosts().catch((e) => console.error('fetchPosts function : ' + e));
        deleteMovie();
        getCategory();
    }, [posts, deleteOnce])

    /**
     * function sortedMovies
     * Permet de mettre a jour le tableau des genres selectionés
     */
    const sortedMovies = () => {
        const dataMovieObj = Object.keys(posts).map((i) => posts[i]);
        const sortedMovie = [];

        for (let data of dataMovieObj) {
            if (selectedFilter.includes(data.category)) {
                sortedMovie.push(data)
            }
        }

        setSortedData(sortedMovie);
    }

    /**
     * function updateSelectedFilter
     * @param e
     * Ajoute / Supprime un élément de la liste des filtres séléctionnés
     */
    const updateSelectedFilter = (e) => {
        const filter = e.target.value;
        const newFilters = selectedFilter;

        if (selectedFilter.includes(filter)) {
            const indexFilter = selectedFilter.indexOf(filter);

            newFilters.splice(indexFilter, 1);
            setSelectedFilter(newFilters);

        } else {

            newFilters.push(filter);
            setSelectedFilter(newFilters);
        }

        sortedMovies();
    }

    const isSorted = () => {
        return sortedData.length > 0 ? sortedData.length : posts.length
    }

    const postPerPageStyle = (e) => {
        styleCard(e).then(() => {
            const cards = document.querySelectorAll('.card');
            if (cards.length > 0){
                const classList = cards[0].classList;

                switch (classList) {
                    case classList.contains('img-4'):
                        classList.remove('img-4');
                        break;
                    case classList.contains('img-8'):
                        classList.remove('img-8');
                        break;
                    case classList.contains('img-12'):
                        classList.remove('card-12');
                        classList.remove('img-12');
                        break;
                    default:
                        break;
                }

                for (let card of cards){
                    card.classList.add('img-'+e.target.value);

                    if (e.target.value == 12){
                        card.classList.add('card-12');
                    }
                }
            }

        })
    }

    const styleCard = async (e) => {
        setPostsPerPage(e.target.value);
    }


    return (
        <div className="wrapper_movie">
            <h4>A voir</h4>
            <div className="filters">
                <p>Genre</p>
                <ul className="filters-list">
                    {category.map((filter) => {
                        return (
                            <li key={filter}>
                                <input type="checkbox" value={filter} id={filter}
                                       onChange={(e) => updateSelectedFilter(e)}/>
                                <label htmlFor={filter}>{filter}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="pagine-number">
                <p>Afficher par</p>
                <ul>
                    {radios.map((radio) => {
                        return (
                            <li key={radio}>
                                <input type="radio" value={radio} id={radio} checked={radio == postsPerPage} onChange={(e) => postPerPageStyle(e)}/>
                                <label htmlFor={radio}>{radio}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='cards'>
                <Posts posts={currentPosts}
                       loading={loading}
                       sortedData={sortedData}
                       postsPerPage={postsPerPage}
                       deleteOneMovie={deleteOneMovie}
                />
                <Pagine
                    postsPerPage={postsPerPage}
                    totalPosts={isSorted()}
                    paginate={paginate}
                    sortedData={sortedData}
                    currentPage={currentPage}
                />
            </div>
        </div>

    );

};

export default Movies;