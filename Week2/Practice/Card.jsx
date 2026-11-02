import React from "react";
import styles from "./Card.module.css";
export default function Card({title,description}){
  return (
    <div className={
        styles.cardContainer
        }>
      <h3 className={
        styles.cardTitle
        }>{title}</h3>
      <p className={
        styles.cardText}>{description}</p>
      <button className={
        styles.cardButton}>Learn More</button>
    </div>
  );
}