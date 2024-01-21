import React from 'react';

const Card = (props) => {
    const pays = props.pays;

    const NumberFormat = (valeur)=> {               //Cette fonction joue le role de séparateur de millier
        return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return (
        <li className="card">
            <img src={pays.flags.png} alt="drapeau"/>
            <div className="data-container">
                <ul>
                    <li>{pays.name.common}</li>
                    <li>{pays.capital}</li>
                    <li>nbr: {NumberFormat (pays.population)}</li>
                </ul>
            </div>
        </li>
        
    );
};

export default Card;