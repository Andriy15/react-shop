import React, { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { HoverCardDemo } from './HoverCardDemo'
import { Links } from './shared.constants'

export function Footer() {
    const [showContent, setShowContent] = useState(false)
    const animate = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref)

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                setShowContent(true)
            }, 500)
        }
    }, [isInView])

    useEffect(() => {
        if (showContent) {
            animate.start('visible');
        }
    }, [showContent])

    const variants = {
        hidden: { opacity: 0},
        visible: { opacity: 1 }
    };


    return (
        <>
            <hr className='mt-10' />
            <div className='flex justify-center h-[200px] mt-4' ref={ref}>
                {!showContent && (
                    <div></div>
                )}
                {showContent && (
                    <div className='flex flex-col items-center space-y-4'>
                        <motion.div className='text-3xl font-bold text-gray-800' initial="hidden" animate="visible" variants={variants}>
                            <HoverCardDemo /> Chykulai
                        </motion.div>
                        <motion.div className='flex flex-col items-center space-y-2 text-lg text-gray-600' initial="hidden" animate="visible" variants={variants}>
                            <span>Connect with me on <a className='text-blue-500 hover:underline' href={Links.Linkedin} target='_blank' rel="noreferrer" >LinkedIn</a></span>
                            <span>Check out my work on <a className='text-blue-500 hover:underline' href={Links.Github} target='_blank' rel="noreferrer" >GitHub</a></span>
                            <span>Reach out to me via <a className='text-blue-500 hover:underline' href='mailto:andriychikulay@gmail.com'>Email</a></span>
                        </motion.div>
                    </div>
                )}
            </div>
        </>
    )
}