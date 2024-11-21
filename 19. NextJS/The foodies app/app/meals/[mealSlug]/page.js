const MealDetailPage = ({ params }) => {
    return (
        <main>
            <h1>Meal Detail</h1>
            {params.mealSlug}
        </main>
    )
}

export default MealDetailPage
