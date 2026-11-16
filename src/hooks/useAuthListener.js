import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { login, logout } from '../auth/authSlice';
import { loadUserProfile } from '../utils/userProfile';

// Keeps the Redux auth state in sync with the real Firebase session
// (expired session, sign-out in another tab, stale localStorage data)
// and refreshes the profile (username, admin flag) on every app load.
const useAuthListener = () => {
    const dispatch = useDispatch();
    const store = useStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                if (store.getState().auth.user) dispatch(logout());
                return;
            }

            try {
                const profile = await loadUserProfile(firebaseUser);
                // During sign-up the profile doc is written after the auth user
                // is created; SignUp dispatches login itself in that case.
                if (!profile.username) return;
                dispatch(login(profile));
            } catch {
                // Profile could not be loaded; keep the current state.
            }
        });

        return unsubscribe;
    }, [dispatch, store]);
};

export default useAuthListener;
