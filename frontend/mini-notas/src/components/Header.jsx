import React from 'react';

const Header = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-xl sm:text-2xl font-bold">
                        Sistema de Notas
                    </h1>
                    <nav className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            <a className="text-blue-100 hover:text-white px-3 py-2 text-sm">
                                Inicio
                            </a>
                            <a className="text-blue-100 hover:text-white px-3 py-2 text-sm">
                                Sobre nosotros
                            </a>
                        </div>
                    </nav>
                    <div className="md:hidden">
                        <div className={`absolute bg-white shadow-lg rounded-lg p-4 right-0 top-16 w-48 ${isOpen ? 'block' : 'hidden'}`}>
                            <a className="block text-blue-600 hover:text-blue-800 px-3 py-2 text-sm">
                                Inicio
                            </a>
                            <a className="block text-blue-600 hover:text-blue-800 px-3 py-2 text-sm">
                                Sobre nosotros
                            </a>
                        </div>
                        <button className="text-blue-100 hover:text-white p-2" onClick={() => setIsOpen(!isOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <rect x="4" y="6" width="16" height="2" rx="1" />
                                <rect x="4" y="11" width="16" height="2" rx="1" />
                                <rect x="4" y="16" width="16" height="2" rx="1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;