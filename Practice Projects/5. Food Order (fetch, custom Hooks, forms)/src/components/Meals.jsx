import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import ErrorMsg from "./UI/ErrorMsg.jsx";

// Recordatorio: los objetos al igual que las funciones se vuelven a crear cada vez que la funcion del componente 
// se ejecutam, causando que cambie su identificador. Por lo que declarandola fuera nos aseguramos de que no se vuelve 
// a crear, ya que el segundo parametro de useHttp lo usamos como dependencia en la funcion sendRequest
const requestConfig = {};
const Meals = () => {
    const { data: loadedMeals, isLoading, error } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center">Loading meals...</p>
    }

    if (error) {
        return <ErrorMsg title="Failed to fetch meals" message={error} />
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    )
}

export default Meals
