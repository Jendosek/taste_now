import { Link } from 'react-router-dom';
import './style.css';
import PageTitle from '../../components/pageTitle/PageTitle';

const Success = () => {
  return (
    <div className='success-page'>
        <PageTitle title="Order received" />
      <h1>Order Received!</h1>
      <p>Your delicious food is on its way. Thank you for choosing Taste Now!</p>
      <Link to="/" className='success-back-link'>
        Back to Home
      </Link>
    </div>
  );
};

export default Success;