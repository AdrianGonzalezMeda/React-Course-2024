// NextJS makes the routes with the folders on the App directory, but each folders requires to have an page.js file 
// to works as a new route. If you create a folder without a page.js nextJs router simply ignores the folder
const AboutPage = () => {
    return (
        <main>
            <h1>About Us</h1>
        </main>
    )
}

export default AboutPage
