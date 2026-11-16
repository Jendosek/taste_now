import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { login, logout } from '../auth/authSlice';

// Keeps the Redux auth state in sync with the real Firebase session
// (expired session, sign-out in another tab, stale localStorage data).
const useAuthListener = () => {
    const dispatch = useDispatch();
    const store = useStore();

    useEffect(() => {
        const currentUid = () => store.getState().auth.user?.uid;

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                if (currentUid()) dispatch(logout());
                return;
            }

            if (currentUid() === firebaseUser.uid) return;

            try {
                const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
                // During sign-up the profile doc is written after the auth user
                // is created; SignUp/Login dispatch login themselves in that case.
                if (!snap.exists() || currentUid() === firebaseUser.uid) return;

                dispatch(login({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    username: snap.data().username,
                }));
            } catch {
                // Profile could not be loaded; keep the current state.
            }
        });

        return unsubscribe;
    }, [dispatch, store]);
};

export default useAuthListener;
