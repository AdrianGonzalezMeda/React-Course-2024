import '../styles/globals.css';
import Layout from '../components/layout/Layout.js';

// Root component

function MyApp({ Component, pageProps }) {
    // Set the layout on all pages
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp
