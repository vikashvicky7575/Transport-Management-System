import React from 'react';
import styles from './Home.module.css';
import Navbar from '../../Components/Navbar/Navbar';
import bgImage from '../../assets/images/transport-img2.jpg';

const Home = () => {
    return (
        <>
            <Navbar />
            <div
                className={styles.homeContainer}
                style={{ backgroundImage: `url(${bgImage})` }}
            >

                <div className={styles.overlay}>
                    <h1 className={styles.title}>Welcome To Transport Management</h1>
                    <p className={styles.subtitle}>Efficient • Reliable • On Time</p>
                </div>

            </div>
        </>
    );
};

export default Home;
