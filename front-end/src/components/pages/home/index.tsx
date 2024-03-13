'use client';
import { useRouter } from 'next/navigation';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useEffect } from "react";

export const HomePage = () => {

    const router = useRouter();

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (user: User | null) => {
            if (user) { 
                router.push('/product-managment')
            } else {
                router.push('/login')
            }
        });

        // destroy listener on un-mounts
        return () => listener();
    })

    return <div>loading...</div>

};

export default HomePage;