import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { logout } from '../store/slices/authSlice';
import { clearCart } from '../store/slices/cartSlice';

// Ends the Firebase session and resets user-specific client state.
const useLogout = () => {
    const dispatch = useDispatch();

    return useCallback(async () => {
        try {
            await signOut(auth);
        } catch {
            // Even if Firebase fails, clear the local session below.
        }
        // Log out first so the cart sync no longer has a user
        // and does not overwrite the saved cart with an empty one.
        dispatch(logout());
        dispatch(clearCart());
    }, [dispatch]);
};

export default useLogout;
