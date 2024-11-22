import { useRouter } from "next/router"

const DetailPage = () => {
    // Hook to access to the url data
    const router = useRouter();

    const newsId = router.query.slug;

    // fetch to the backend

    return (
        <div>
            <h1>{router.query.slug}</h1>
        </div>
    )
}

export default DetailPage
