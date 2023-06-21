import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import WbIncandescentTwoToneIcon from '@mui/icons-material/WbIncandescentTwoTone';
import NightlightTwoToneIcon from '@mui/icons-material/NightlightTwoTone';
import React from 'react'

interface ITheme {
    scheme: "dark" | "light"
}

interface INavbar {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const Navbar = ({ search, setSearch }: INavbar) => {

    const [theme, setTheme] = React.useState<ITheme>({
        scheme: "light"
    })

    const handleToggle = () => {
        setTheme({ scheme: theme.scheme === "light" ? "dark" : "light" })
        // presist the theme in local storage
        localStorage.setItem('theme', theme.scheme === "light" ? "dark" : "light")
    }

    React.useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme === "light") {
            setTheme({ scheme: 'light' })
            document.body.style.backgroundColor = '#fff'
            document.body.classList.remove("dark")
            document.body.classList.add("light")
        } else {
            setTheme({ scheme: theme as "light" | "dark" })
            document.body.style.backgroundColor = '#2b2a30'
            document.body.classList.remove("light")
            document.body.classList.add("dark")
        }
    }, [theme.scheme])

    return (
        <nav className="bg-gray-100 border-gray-400 dark:bg-[#242329] shadow-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <img src={logo} className="h-9 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Mailer</span>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-100 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-100 dark:bg-[#242329] md:dark:bg-[#242329] dark:border-gray-700 items-center">
                        <input type="text" id="search-navbar"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            className="block h-12 w-full p-2 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                        <li className={theme.scheme === 'dark' ? 'bg-orange-400 rounded-md p-2 shadow-lg' : 'bg-gray-400 shadow-lg rounded-md p-2'}>
                            <button onClick={handleToggle}>
                                {
                                    theme.scheme === 'dark' ? <WbIncandescentTwoToneIcon sx={{ color: '#fff' }} /> : <NightlightTwoToneIcon sx={{ color: '#fff' }} />
                                }
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
export default Navbar