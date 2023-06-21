import { Routes, Route } from 'react-router-dom'
import ListMail from './components/ListMail'
import CreateMail from './components/CreateMail'

interface IRouter {
    search: string;
}

const Router = ({ search }: IRouter) => {
    return (
        <Routes>
            <Route path="/" element={<ListMail search={search} />} />
            <Route path="/create" element={<CreateMail />} />
            <Route path="*" element={<div>No page found</div>} />
        </Routes>
    )
}

export default Router