import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../auth/authSlice';
import './authStyle.css';
import logo from '../../assets/img/header/icons/logo.svg';
import burgerBg from '../../assets/img/signUp/images/signup_burger.png';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            const user = userCredential.user;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            let username = "User";
            if (docSnap.exists()) {
                username = docSnap.data().username;
            }

            dispatch(login({
                uid: user.uid,
                email: user.email,
                username: username
            }));

            navigate('/');

        } catch (error) {
            console.error("Login error:", error);

            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setErrors({ email: "Invalid email or password" });
            } else {
                alert("Login failed: " + error.message);
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

                <div className="divider"><span>OR</span></div>

                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="email" name="email" placeholder="Email"
                            className={`auth-input ${errors.email ? 'error' : ''}`}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <span className="error-text" style={{ color: '#F72D57', fontSize: '12px', marginTop: '-15px', marginBottom: '15px', display: 'block' }}>{errors.email}</span>}
                    </div>
                    <div>
                        <input
                            type="password" name="password" placeholder="Password"
                            className={`auth-input ${errors.password ? 'error' : ''}`}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.password && <span className="error-text" style={{ color: '#F72D57', fontSize: '12px', marginTop: '-15px', marginBottom: '15px', display: 'block' }}>{errors.password}</span>}
                    </div>
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