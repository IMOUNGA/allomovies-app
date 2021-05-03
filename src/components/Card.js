import React, { useState, useEffect} from 'react';

import DeleteImage from '../assets/poubelle.png';

const Card = ({ movie, setDeleteMovieCard }) => {
    const [like, setLike] = useState(movie.likes);
    const [dislike, setDislike] = useState(movie.dislikes);
    const [vote, setVote] = useState(null);


    const ratioLikesDislike = () => {
        let likes = movie.likes, dislikes = movie.dislikes, score = likes + dislikes;
        let percent = Math.round((likes * 100) / score);

        return percent +'%';
    }

    const [ratioLikes, setRatioLikes] = useState(ratioLikesDislike());


    useEffect(() => {
        movie.likes = like;
        setRatioLikes(ratioLikesDislike());
        return () => {
            movie.likes = like;
            setRatioLikes(ratioLikesDislike());

        }
    }, [like])

    useEffect(() => {
        movie.dislikes = dislike;
        setRatioLikes(ratioLikesDislike());
        return () => {
            movie.dislikes = dislike;
            setRatioLikes(ratioLikesDislike());
        }
    }, [dislike])

    const voteLikeDislike = (e) => {
        let button = e.target;
        let buttonName = e.target.dataset.name;

        if (vote !== null) {
            document.querySelector('.button-active').classList.remove('button-active');
        }

        switch (vote) {
            case null:
                if (buttonName == 'like'){
                    setLike(like + 1);
                    setVote(true);
                    button.classList.add('button-active');
                } else {
                    setDislike(dislike +1);
                    setVote(false);
                    button.classList.add('button-active');
                }
                break;
            case true:
                if (buttonName == 'like'){
                    setLike(like - 1);
                    setVote(null);
                    button.classList.remove('button-active');
                } else {
                    setDislike(dislike + 1);
                    setLike(like - 1);
                    setVote(false);
                    button.classList.add('button-active');
                }
                break;
            case false:
                if (buttonName == 'like'){
                    setLike(like + 1);
                    setDislike(dislike - 1);
                    setVote(true);
                    button.classList.add('button-active');
                } else {
                    setDislike(dislike - 1);
                    setVote(null);
                    button.classList.remove('button-active');
                }
                break;
            default:
                break;
        }
    }


    return (
        <li className="card">
            <img src={movie.banner} alt="Movie banner"/>
            <div className="card-infos-container">
                <ul>
                    <li><button className="button-delete" onClick={() => setDeleteMovieCard(movie.id)}></button></li>
                    <li className="movie-title">{movie.title}</li>
                    <li>{movie.category}</li>
                    <li className="likes-dislikes-infos-container">
                        <div className="likes-dislikes dislikes-infos">
                            <button id="button-dislike" data-name="dislike" onClick={(e) => voteLikeDislike(e)} />
                            {dislike}
                        </div>
                        <div className="likes-dislikes likes-infos">
                            <button id="button-like" data-name="like" onClick={(e) => voteLikeDislike(e)} />
                            {like}
                        </div>
                    </li>
                    <li className="ratio-bar-wrapper">
                        <div className="ratio-bar" style={{width: ratioLikes}}></div>
                    </li>
                </ul>
            </div>
        </li>

    );
};

export default Card;