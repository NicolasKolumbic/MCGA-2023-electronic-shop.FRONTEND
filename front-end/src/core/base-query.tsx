'use client'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie, getCookies } from "cookies-next";
import { TmpCookiesObj } from 'cookies-next/lib/types';


export const baseQueryCallback =  fetchBaseQuery({
    baseUrl: 'http://localhost:3005/api/v1',
    prepareHeaders: (headers) => {
        const cookies: TmpCookiesObj = getCookies();

        Object.keys(cookies).forEach((cookieKey: string) => {
            const cookie = getCookie(cookieKey);
            if(cookie) {
                headers.set(cookieKey, cookie);
            }
            
        })

        return headers
    },
    credentials: 'include'
    
});