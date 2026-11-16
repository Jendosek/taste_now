import { Link } from 'react-router-dom';
import './style.css';
import PageTitle from '../../components/pageTitle/PageTitle';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <PageTitle title="Page not found" noIndex />
            <div className="error-code">404</div>
            <h1 className="error-title">Oops! Page not found</h1>
            <p className="error-text">
                It seems the page you are looking for has been eaten <br />
                or currently is under construction.
            </p>
            <Link to="/" className="btn-home">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;