import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function Creator() {
    const [showContent, setShowContent] = useState(false);
    const controls = useAnimation();

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setShowContent(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (showContent) {
            controls.start('visible');
        }
    }, [showContent, controls]);

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="container mx-auto max-w-2xl pt-5">
            <div className="text-center mt-5">
                <h1 className="text-5xl font-bold">Andrii Chykulai</h1>
            </div>
            <div className="text-center mt-5">
                <h2 className="text-2xl font-semibold">Frontend Developer</h2>
            </div>
            { !showContent && (
                <div className="text-center mt-5">
                    <h4 className="text-xl font-semibold text-gray-300">Scroll Down</h4>
                </div>
            ) }
            <motion.div className="text-center mt-8" initial="hidden" animate={controls} variants={variants}>
                {showContent && (
                    <>
                        <motion.p className="text-gray-600 text-lg" initial="hidden" animate="visible" variants={textVariants}>
                            My name is Andrii, I'm 18, and I'm a young and motivated frontend developer with a passionate interest in web technologies.
                            I enjoy creating beautiful, functional, and user interfaces for web applications. I am a fast learner and I'm ready to work
                            in a team, communicate with mates and clients to achieve common goals. I have troubleshooting skills and the ability to
                            understand user needs and transform them into convenient and efficient interfaces. My desire to constantly grow and explore
                            new opportunities in the world of frontend development makes me confident that I can bring value to the team and contribute
                            to the success of projects.
                        </motion.p>
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold mb-2">Skills:</h2>
                            <ul className="list-disc list-inside">
                                <li>HTML, CSS(SCSS)</li>
                                <li>Tailwind, Bootstrap</li>
                                <li>JavaScript, TypeScript</li>
                                <li>React, Redux-toolkit</li>
                                <li>Webpack, Git, Docker</li>  
                            </ul>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold mb-2">Portfolio:</h2>
                            <ul className="list-disc list-inside mb-10">
                                <li>
                                    <a href="https://react-ts-theta.vercel.app/" target="_blank" rel="noreferrer">
                                        React-shop
                                    </a>
                                </li>
                                <li>
                                    <a href="https://react-github-api-two.vercel.app/" target="_blank" rel="noreferrer">
                                        Find Repos on GitHub
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </>
                )}
            </motion.div>
            
            {!showContent && (
                <div style={{ height: '500px' }}></div>
            )}
        </div>
    );
}
