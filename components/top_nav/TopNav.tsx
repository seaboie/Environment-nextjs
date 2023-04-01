"use client"

import React from 'react'
import { useAuthContext } from '@/context/AuthContext'
import TopNavigationVerified from './TopNavigationVerified';
import TopNavigation from './TopNavigation';

export default function TopNav() {

    const { user } = useAuthContext();

    return (
        <div>
            {
                user?.emailVerified
                ? (
                    <TopNavigationVerified />
                )
                : (
                    <TopNavigation />
                )
            }
        </div>
    )
}
