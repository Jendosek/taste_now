import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import './authStyle.css';
import logo from '../../assets/img/header/icons/logo.svg';
import burgerBg from '../../assets/img/signUp/images/signup_burger.png';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loadUserProfile } from '../../utils/userProfile';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // Set when another page sends the user here (e.g. checkout without login).
    const notice = location.state?.message;
    const redirectTo = location.state?.from || '/';

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newErrors = {};

        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const profile = await loadUserProfile(userCredential.user);

            dispatch(login({
                ...profile,
                username: profile.username || "User"
            }));

            navigate(redirectTo, { replace: true });

        } catch (error) {
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setErrors({ email: "Invalid email or password" });
            } else {
                setErrors({ form: "Login failed. Please try again later." });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <img src={logo} alt="Logo" className="auth-logo" />

                <h1 className="auth-title">Login</h1>
                <p className="auth-subtitle">Sign in with your account</p>

                {notice && <p className="auth-notice">{notice}</p>}

                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email" name="email" placeholder="Email"
                            className={`auth-input ${errors.email ? 'error' : ''}`}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error-text-reg">{errors.email}</span>}
                    </div>
                    <div>
                        <input
                            type="password" name="password" placeholder="Password"
                            className={`auth-input ${errors.password ? 'error' : ''}`}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="error-text-reg">{errors.password}</span>}
                    </div>
                    {errors.form && <span className="error-text-reg">{errors.form}</span>}
                    <button type="submit" className="btn-auth" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="auth-footer-text">
                    <p>Don't have an account? <Link to="/signup" className="btn-switch">Sign up here</Link></p>
                </div>
            </div>

            <div className="auth-right">
                <img src={burgerBg} alt="Burger" className="auth-image" />
            </div>
        </div>
    );
};

export default Login;