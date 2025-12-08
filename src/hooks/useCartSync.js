import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { setCart } from '../features/cartSlice';

const useCartSync = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);

    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!user?.uid) {
            setIsInitialized(false);
            return;
        }

        const loadCartFromDB = async () => {
            console.log("Починаю завантаження кошика для:", user.uid);
            try {
                const docRef = doc(db, 'carts', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Кошик знайдено в базі:", docSnap.data());
                    dispatch(setCart(docSnap.data()));
                } else {
                    console.log("У базі немає кошика (новий юзер).");
                }
            } catch (error) {
                console.error("Помилка завантаження (READ):", error);
            } finally {
                setIsInitialized(true);
            }
        };

        loadCartFromDB();
    }, [user, dispatch]);

    useEffect(() => {
        if (!user?.uid || !isInitialized) return;

        const saveCartToDB = async () => {
            console.log("📤 Спроба збереження кошика:", cart);
            try {
                await setDoc(doc(db, 'carts', user.uid), {
                    items: cart.items,
                    totalQuantity: cart.totalQuantity,
                    totalPrice: cart.totalPrice
                });
                console.log("Успішно збережено в Firebase!");
            } catch (error) {
                console.error("Помилка збереження (WRITE):", error);
            }
        };

        saveCartToDB();
    }, [cart, user, isInitialized]);
};

export default useCartSync;