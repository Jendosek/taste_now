import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../auth/authSlice';
import './authStyle.css';
import { ReactComponent as Logo } from '../../assets/img/header/icons/logo.svg'
import burgerBg from '../../assets/img/signUp/images/signup_burger.png';
import { ReactComponent as GoogleIcon } from '../../assets/img/signUp/icons/google_icon.svg';
import { ReactComponent as FacebookIcon } from '../../assets/img/signUp/icons/facebook_icon.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/img/signUp/icons/linkedin_icon.svg';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newErrors = {};

        if (!formData.username.trim()) newErrors.username = "Username is required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", formData.username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setErrors({ username: "This username is already taken" });
                setIsLoading(false);
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                username: formData.username,
                email: formData.email,
                createdAt: new Date().toISOString()
            });

            const serializableUser = {
                uid: user.uid,
                email: user.email,
                username: formData.username
            };

            dispatch(login(serializableUser));

            navigate('/');

        } catch (error) {
            console.error("Error signing up:", error);

            if (error.code === 'auth/email-already-in-use') {
                setErrors({ email: "This email is already in use" });
            } else {
                alert("Something went wrong: " + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <Logo className="auth-logo" />

                <h1 className="auth-title">Sign up</h1>

                <p className="auth-subtitle">Signup using social networks</p>

                <div className="social-icons">
                    <div className="social-icon"><GoogleIcon className='social-icon-svg' /></div>
                    <div className="social-icon"><FacebookIcon className='social-icon-svg' /></div>
                    <div className="social-icon"><LinkedinIcon className='social-icon-svg' /></div>
                </div>

                <div className="divider"><span>OR</span></div>

                <form onSubmit={handleSignUp}>
                    <div>
                        <input
                            type="text" name="username" placeholder="Username"
                            className={`auth-input ${errors.username ? 'error' : ''}`}
                            onChange={handleChange}
                        />
                        {errors.username && <span className="error-text-reg">{errors.username}</span>}
                    </div>
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
                    <div>
                        <input
                            type="password" name="confirmPassword" placeholder="Confirm Password"
                            className={`auth-input ${errors.confirmPassword ? 'error' : ''}`}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <span className="error-text-reg">{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit" className="btn-auth" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Sign up'}
                    </button>
                </form>
                <p className="auth-footer-text">Already have an account? <Link to="/login" className="btn-switch">Login here</Link></p>


            </div>

            <div className="auth-right">
                <img src={burgerBg} alt="Burger" className="auth-image" />
            </div>
        </div>
    );
};

export default SignUp;