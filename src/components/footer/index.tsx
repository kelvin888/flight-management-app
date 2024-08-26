import React from 'react'
import Container from '../container'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className='px-10 mt-4 border-t border-gray-200 w-full h-16 bg-black text-white flex items-center absolute bottom-0'>
            <Container>
                <div className="w-full text-center">&copy; Flights {currentYear}</div>
            </Container>
        </div>
    )
}

export default Footer