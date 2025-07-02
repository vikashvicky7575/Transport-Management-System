import React from "react";

const LoginGreeting = () => {
    const greeting = getGreeting();

    return (
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
            <span className='text-primary'>{greeting}</span>, welcome to Transport Management System
        </div>
    );
};

const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good Morning";
    else if (currentHour < 16) return "Good Afternoon";
    else if (currentHour < 20) return "Good Evening";
    else return "Good Night"
};

export default LoginGreeting