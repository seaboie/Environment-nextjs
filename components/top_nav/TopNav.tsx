"use client"

import React from 'react'
import { useAuthContext } from '@/context/AuthContext'
import TopNavigation from './TopNavigation';
import TopNavigationDashboard from './TopNavigationDashboard';

export default function TopNav() {

    const { user } = useAuthContext();

    return (
        <div>
            {
                user
                ? (
                    <TopNavigationDashboard />
                )
                : (
                    <TopNavigation />
                )
            }
        </div>
    )
}
