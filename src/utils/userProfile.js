import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Loads the app-level profile for a Firebase user:
// username from /users/{uid} and admin flag from /admins/{uid}.
// `username` is null when the profile doc does not exist yet.
export const loadUserProfile = async (firebaseUser) => {
    const [userSnap, isAdmin] = await Promise.all([
        getDoc(doc(db, 'users', firebaseUser.uid)),
        getDoc(doc(db, 'admins', firebaseUser.uid))
            .then((snap) => snap.exists())
            .catch(() => false),
    ]);

    return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        username: userSnap.exists() ? userSnap.data().username : null,
        isAdmin,
    };
};
