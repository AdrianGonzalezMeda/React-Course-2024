// NextJs provides props, params is the dynamic part of the url /blog/[slug]
const BlogPostPage = ({ params }) => {
    return (
        <main>
            <h1>Blog Post</h1>
            {params.slug}
        </main>
    )
}

export default BlogPostPage
