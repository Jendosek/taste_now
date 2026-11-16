import Hero from "./components/hero/Hero";
import BlogList from "../../features/blogList/BlogList";
import PageTitle from '../../components/pageTitle/PageTitle';

const Blog = () => {
    return (
        <div>
            <PageTitle title="Blog" />
            <Hero />
            <BlogList />
        </div>
    )
}

export default Blog;