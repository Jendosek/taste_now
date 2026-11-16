import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../../utils/isAdmin';
import AdminPanel from './AdminPanel';
import PageTitle from '../../components/pageTitle/PageTitle';

const AdminRoute = () => {
    const { user } = useSelector((state) => state.auth);
    if (!isAdmin(user)) return <Navigate to="/" replace />;
    return (
        <>
            <PageTitle title="Admin panel" />
            <AdminPanel />
        </>
    );
};

export default AdminRoute;
