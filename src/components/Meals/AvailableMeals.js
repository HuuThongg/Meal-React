import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";



const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchMeals = async()=>{
      setError(null)
        const response = await fetch(
          "https://react-http-a7947-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const responseData = await response.json();
        const loadedMeals = [];
        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }
        setMeals(loadedMeals);
      
      
      
      setIsLoading(false)
    }
    // console.log(responseData);
    fetchMeals().catch( error=>{
        setIsLoading(false);
        setError(error.message);
    });
  },[])

  if(isLoading){
    return <section className={classes.Mealsloading}><p>Loading...</p></section>
  }
  if(error){
    return (
      <section className={classes.Mealsloading}>
        <p className={classes.MealsError}>"error something wentwrong"</p>
      </section>
    );
  }


  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
