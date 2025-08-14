import React from 'react';

export const LoadingCard = () => (
    <div className="w-full h-[180px] bg-white shadow rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="w-full h-full rounded-lg bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 animate-loadingCardShimmer"/>
        <style>
            {`
                @keyframes loadingCardShimmer {
                    0% { background-position: -200px 0; }
                    100% { background-position: 200px 0; }
                }
                .animate-loadingCardShimmer {
                    background-size: 400px 100%;
                    animation: loadingCardShimmer 1.5s infinite linear;
                }
            `}
        </style>
    </div>
);