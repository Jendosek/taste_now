import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { setCart } from '../store/slices/cartSlice';

// Syncs the cart of a signed-in user with Firestore (/carts/{uid}):
// loads the saved cart after sign-in, then saves every change.
const useCartSync = () => {
    const dispatch = useDispatch();
    const uid = useSelector((state) => state.auth.user?.uid);
    const cart = useSelector((state) => state.cart);

    // uid whose saved cart has been loaded; saving waits for it
    // so an empty local cart never overwrites the saved one.
    const loadedUidRef = useRef(null);

    useEffect(() => {
        loadedUidRef.current = null;
        if (!uid) return;

        let cancelled = false;

        const loadCart = async () => {
            try {
                const snap = await getDoc(doc(db, 'carts', uid));
                if (!cancelled && snap.exists()) {
                    dispatch(setCart(snap.data()));
                }
            } catch {
                // Keep the local cart if the saved one cannot be loaded.
            } finally {
                if (!cancelled) loadedUidRef.current = uid;
            }
        };

        loadCart();

        return () => {
            cancelled = true;
        };
    }, [uid, dispatch]);

    useEffect(() => {
        if (!uid || loadedUidRef.current !== uid) return;

        setDoc(doc(db, 'carts', uid), {
            items: cart.items,
            totalQuantity: cart.totalQuantity,
            totalPrice: cart.totalPrice,
        }).catch(() => {
            // Saving is best-effort; the cart is still kept locally.
        });
    }, [cart, uid]);
};

export default useCartSync;
