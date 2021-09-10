import React from "react";
import Placeholder from "../assets/img/placeholder.png";

const Card = (props) => {
    const { item = {}, detailHandler } = props;

    const onError = (e) => {
        e.target.src = Placeholder;
    }

    const imagehandler = (e) => {
        const modal = document.getElementById("myModal");
        const modalImg = document.getElementById("img01");
        const captionText = document.getElementById("caption");

        modal.style.display = "block";
        modalImg.src = e.target.src;
        captionText.innerHTML = e.target.alt;
    }

    return (
        <div className="card m-auto pointer">
            <img
                src={item.Poster}
                alt={item.Title}
                className="w-10"
                onClick={(e) => imagehandler(e)}
                onError={(e) => onError(e)}
            />
            <div className="container">
                <h3 onClick={() => detailHandler(item.imdbID)}><b>{item.Title || '-'}</b></h3>
                <p className="capitalize">{item.Type} . {item.Year}</p>
            </div>
        </div>
    );
};

export default Card;
