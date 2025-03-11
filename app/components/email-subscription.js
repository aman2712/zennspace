"use client";

import { useState } from "react";

export default function EmailSubscription({noLabel}) {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('Sign Up')

    const handleSubscription = async () => {
        if (email.trim() === '') return;

        const response = await fetch("/api/brevo-contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
            }),
        });

        if (response.ok) {
            setMessage('Subscribed!')
        }
    }
    return (
        <div className='mt-7'>
            {!noLabel && <p>Email*</p>}
            <div className='w-96 border-2 border-gray-500 h-12 rounded-full mt-2 flex items-center'>
                <input className='flex-1 h-full text-white outline-none px-4' value={email} onChange={(e) => setEmail(e.target.value)} />
                <button
                    className='bg-white text-black h-10 rounded-full px-5 mr-0.5 hover:bg-gray-200 duration-150 transition cursor-pointer'
                    onClick={handleSubscription}
                    disabled={message === 'Subscribed!' ? true : false}
                >
                    {message}
                </button>
            </div>
        </div>
    )
}