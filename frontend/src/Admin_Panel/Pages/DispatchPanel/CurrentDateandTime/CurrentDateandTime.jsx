// import React, { useState, useEffect } from "react";
// import styles from './CurrentDateandTime.module.css'

// const CurrentDateandTime = () => {
//     //TimeChanges
//     const [currentTime, setCurrentTime] = useState('');

//     const updateTime = () => {
//         const now = new Date();
//         const options = {
//             timeZone: 'Asia/Kolkata',
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true,
//         };

//         const formattedTime = new Intl.DateTimeFormat('en-IN', options).format(now);
//         setCurrentTime(formattedTime);
//     };

//     useEffect(() => {
//         updateTime();
//         const interval = setInterval(updateTime, 60000); // Update every minute
//         return () => clearInterval(interval);
//     }, [])

//     return (
//         <>
//             <div className={styles.timeBox}>{currentTime} IST</div>
//         </>
//     )
// }

// export default CurrentDateandTime


import React, { useEffect, useState } from 'react';
import styles from './CurrentDateandTime.module.css'; // Assuming you're using CSS module

const CurrentDateandTime = () => {
  const [currentTime, setCurrentTime] = useState('');

  const updateTime = () => {
    const now = new Date();

    // Format parts manually for full control including seconds
    const options = {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const datePart = new Intl.DateTimeFormat('en-IN', options).format(now);

    const timePart = now.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    setCurrentTime(`${datePart}, ${timePart}`);
  };

  useEffect(() => {
    updateTime(); // initial
    const interval = setInterval(updateTime, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.timeBox}>
      {currentTime} IST
    </div>
  );
};

export default CurrentDateandTime;
