import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Card from './Card';

const Countries = () => {
    const [data, setdata] = useState([]); // la variable data ne peut être modifié que grace à la fonction setdata
    const [sortedData, setSortedData] = useState([]); // Ce tableau va contenir les pays rangé par ordre decroissant de peuplement
    const [playOnce, setPlayOnce] = useState(true); // Cette variable a pour role d'éviter à la fonction UseEffect de 
                                         //se repeter à l'infini (requete permanente) à cause de [data]
    const [rangeValue, setRangeValue] = useState(25);
    const [selectedRadio, setselectedRadio]= useState("");
    const radio = ["Africa","America","Asia","Europe","Oceania"]

   
        useEffect(()=>{
            if(playOnce){
            axios
             .get("https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags") //Le lien de l'API
             .then((res)=>setdata(res.data));//Onrecupere les donne de l'API et on le donne à la variable data
             setPlayOnce(false);
        //console.log(data);//On affiche à la console les infos
            }

        const sortedCountry = ()=> {
            const cardObj = Object.keys(data).map((i)=>data[i]); // convertir data en object
            const sortedArray = cardObj.sort((a,b)=>{
                return b.population - a.population; //Ranger par ordre décroissant en fonction de nombre de population
            }); //Si c'était a.population - b.population alors l'ordre de rangement serait croissant
            console.log(sortedArray); //Observer sur la console que les pays ont bien été classé comme prevu au depart
            sortedArray.length  = rangeValue; //le nombre de pays à afficher
            setSortedData(sortedArray); // mettre à jour le tableau
        }
        sortedCountry();
        }, [data, playOnce, rangeValue]);
    
    
    return (
        <div className="countries">
            <div className="sort-container">
                <input type="range" min="1" max= "250" value={rangeValue} onChange= {(e)=> setRangeValue(e.target.value)}/> 
            
            <ul> 
                {radio.map((rad)=>{
                    return (
                      <li key={rad}>
                          <input type="radio" value= {rad} checked= {rad===selectedRadio} id={rad} onChange= {(e)=> setselectedRadio(e.target.value)}/>  
                          <label htmlFor={rad}>{rad}</label>
                     </li>
                    );
                })}
            </ul>
            </div>
            
            <div className="cancel">
                {selectedRadio && <h5 onClick={()=> setselectedRadio("")}>Annuler la recherche</h5>}
            </div>

            <ul className="countries-list"> 
                {sortedData
                    .filter((country)=> country.region.includes(selectedRadio)) //Filtrer les pays par region(continent)
                    .map((country)=>(
                    <Card pays={country}/> //Il envoie tous les informations concernant un pays à la fois
                ))}
            </ul>
            
        </div>

        
    );
};

export default Countries;