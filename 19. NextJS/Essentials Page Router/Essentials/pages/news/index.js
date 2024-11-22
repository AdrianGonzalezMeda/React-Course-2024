import Link from "next/link";

const NewsPage = () => {
    return (
        <>
            <h1>The news page</h1>
            <ul>
                <li>
                    <Link href='/news/next-js-framework'>
                        NextJs is a great Framework
                    </Link>
                </li>
                <li>
                    <Link href='/news/something-else'>
                        Something else
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default NewsPage;
