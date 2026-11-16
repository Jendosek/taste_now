import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import './authStyle.css';
import Logo from '../../assets/img/header/icons/logo.svg?react'
import burgerBg from '../../assets/img/signUp/images/signup_burger.png';
import GoogleIcon from '../../assets/img/signUp/icons/google_icon.svg?react';
import FacebookIcon from '../../assets/img/signUp/icons/facebook_icon.svg?react';
import LinkedinIcon from '../../assets/img/signUp/icons/linkedin_icon.svg?react';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, writeBatch } from 'firebase/firestore';

// Must match the /usernames rule in firestore.rules.
const USERNAME_REGEX = /^[A-Za-z0-9_.-]{3,20}$/;

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

        const username = formData.username.trim();
        if (!username) {
            newErrors.username = "Username is required";
        } else if (!USERNAME_REGEX.test(username)) {
            newErrors.username = "3-20 characters: letters, numbers, . _ -";
        }

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
            const usernameRef = doc(db, "usernames", username.toLowerCase());
            const usernameSnap = await getDoc(usernameRef);

            if (usernameSnap.exists()) {
                setErrors({ username: "This username is already taken" });
                setIsLoading(false);
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Profile + username reservation are written atomically.
            // If the name was taken in the meantime, the rules reject the batch.
            try {
                const batch = writeBatch(db);
                batch.set(doc(db, "users", user.uid), {
                    uid: user.uid,
                    username,
                    email: user.email,
                    createdAt: new Date().toISOString()
                });
                batch.set(usernameRef, { uid: user.uid });
                await batch.commit();
            } catch (batchError) {
                await user.delete().catch(() => {});
                setErrors(batchError.code === 'permission-denied'
                    ? { username: "This username is already taken" }
                    : { form: "Could not create your account. Please try again." });
                return;
            }

            const serializableUser = {
                uid: user.uid,
                email: user.email,
                username,
                isAdmin: false
            };

            dispatch(login(serializableUser));

            navigate('/');

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrors({ email: "This email is already in use" });
            } else {
                setErrors({ form: "Something went wrong. Please try again later." });
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
                    <div className="social-icon" title="Google sign-up: coming soon"><GoogleIcon className='social-icon-svg' /></div>
                    <div className="social-icon" title="Facebook sign-up: coming soon"><FacebookIcon className='social-icon-svg' /></div>
                    <div className="social-icon" title="LinkedIn sign-up: coming soon"><LinkedinIcon className='social-icon-svg' /></div>
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
                    {errors.form && <span className="error-text-reg">{errors.form}</span>}
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