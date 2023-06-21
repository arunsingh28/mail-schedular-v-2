import React from 'react'
import { fetchMail, deleteMail } from '../http/mailApi'
import { Link } from 'react-router-dom';
import UpdateModel from './UpdateModel';

interface IMaillist {
    body: string;
    createdAt: string;
    email: string;
    name: string;
    subject: string;
    date: string;
    time: string;
    success: boolean;
    updatedAt: string;
    __v: number;
    _id: string;
    tabs: {
        genral: boolean;
        body: boolean;
        info: boolean;
    }
}

interface IProps {
    search: string;
}

const ListMail = ({ search }: IProps) => {

    const [allMail, setAllMail] = React.useState<IMaillist[]>([])
    const [show, setShow] = React.useState<boolean>(false)
    const [filteredMail, setFilteredMail] = React.useState<IMaillist[]>([])

    React.useEffect(() => {
        fetchMail().then(data => {
            // add visiable properties to the data
            const updatedData = data.map((mail: IMaillist) => {
                return {
                    ...mail,
                    tabs: {
                        genral: true,
                        body: false,
                        info: false
                    }
                }
            }
            )
            setAllMail(updatedData)
            setFilteredMail(updatedData)
        })
    }, [])


    React.useEffect(() => {
        setFilteredMail(
            allMail.filter((mail) =>
                mail.name.toLowerCase().includes(search.toLowerCase())
            )
        )
        document.title = `All Mails`
    }, [search])



    const handleGenralTab = (index: number) => {
        // change the tabs state which is selected by the user
        filteredMail[index].tabs.genral = true
        filteredMail[index].tabs.body = false
        filteredMail[index].tabs.info = false
        setFilteredMail([...filteredMail])
    }

    const handleBodyTab = (index: number) => {
        // change the tabs state which is selected by the user
        filteredMail[index].tabs.genral = false
        filteredMail[index].tabs.body = true
        filteredMail[index].tabs.info = false
        setFilteredMail([...filteredMail])
    }

    const handleInfoTab = (index: number) => {
        // change the tabs state which is selected by the user
        filteredMail[index].tabs.genral = false
        filteredMail[index].tabs.body = false
        filteredMail[index].tabs.info = true
        setFilteredMail([...filteredMail])
    }

    // handle delete mail and update the state
    const handleDeleteMail = (index: number) => {
        const id = filteredMail[index]._id
        deleteMail(id).then(_ => {
            const updatedData = filteredMail.filter((mail: IMaillist) => mail._id !== id)
            setFilteredMail(updatedData)
            setAllMail(updatedData)
        })
    }

    // function to convert date to local time
    const convertToLocalTime = (date: string) => {
        const d = new Date(date)
        return d.toLocaleString()
    }

    const convertToLocalDate = (date: string) => {
        const d = new Date(date)
        return d.toLocaleDateString()
    }

    const [currentMailId, setCurrentMailId] = React.useState<string>('')

    const handleModel = (id: string) => {
        setShow(true)
        setCurrentMailId(id)
    }

    return (
        <div className='px-10 py-4'>
            {
                show && <UpdateModel setShow={setShow} id={currentMailId} />
            }
            <div className='flex justify-between'>
                <h1 className='text-4xl font-semibold text-gray-800 dark:text-gray-200'>All Mails</h1>
                <Link to={"/create"}><button className='px-8 py-3 shadow-md text-gray-800 shadow-green-800 bg-green-500 rounded-md font-mono' >Schedule new mail</button></Link>
            </div>
            <div className='px-4 py-6 dark:bg-[#242329] flex flex-col gap-4 mt-5 rounded-md bg-gray-100'>
                {
                    filteredMail.length > 0 ? filteredMail.map((mail: IMaillist, index: number) => {
                        return (
                            <div key={index} className='border border-gray-200 dark:bg-[#caf7e2] bg-white dark:border-[#caf7e2] px-4 py-2 dark:text-gray-200 hover:dark:bg-[#caf7e2] hover:bg-gray-100'>
                                <div className='dark:bg-[#74fa99] dark:text-gray-800 font-semibold text-[18px] gap-3 py-2 px-2'>
                                    <div className='flex gap-3 justify-between border-b border-green-700 pb-2'>
                                        <div className='flex gap-4'>
                                            <button className={mail.tabs?.genral ? 'bg-green-600 px-3 py-2 rounded-md text-gray-100' : 'bg-green-400 px-3 py-2 rounded-md text-gray-100'} onClick={() => handleGenralTab(index)}>Genral</button>
                                            <button className={mail.tabs?.body ? 'bg-green-600 px-3 py-2 rounded-md text-gray-100' : 'bg-green-400 px-3 py-2 rounded-md text-gray-100'} onClick={() => handleBodyTab(index)}>Body</button>
                                            <button className={mail.tabs?.info ? 'bg-green-600 px-3 py-2 rounded-md text-gray-100' : 'bg-green-400 px-3 py-2 rounded-md text-gray-100'} onClick={() => handleInfoTab(index)}>Info</button>
                                        </div>
                                        <div className='flex gap-3'>
                                            <button className='bg-red-600 px-3 py-2 rounded-md text-gray-100'
                                                onClick={() => handleDeleteMail(index)}
                                            >Delete</button>
                                            <button className='bg-blue-900 px-3 py-2 rounded-md text-gray-100' onClick={() => handleModel(mail._id)}>Update</button>
                                        </div>
                                    </div>
                                    {
                                        mail.tabs?.genral ? <div className='flex flex-col gap-2'>
                                            <div className='flex gap-2'>
                                                <h1 className='text-gray-800 dark:text-gray-700'>Name:</h1>
                                                <h1 className='text-gray-800 dark:text-gray-700'>{mail.name}</h1>
                                            </div>
                                            <div className='flex gap-2'>
                                                <h1 className='text-gray-800 dark:text-gray-700'>Email:</h1>
                                                <h1 className='text-gray-800 dark:text-gray-700'>{mail.email}</h1>
                                            </div>
                                            <div className='gap-2'>
                                                <h1 className='text-gray-800 dark:text-gray-700'>Schedule On</h1>
                                                <h1 className='text-gray-800 dark:text-gray-700'>
                                                    Date: {convertToLocalDate(mail.date)} Time: {mail.time} (24 hour format)
                                                </h1>
                                            </div>
                                        </div> : null
                                    }
                                    {
                                        mail.tabs?.body ? <div className='flex flex-col gap-2'>
                                            <div className='flex gap-2'>
                                                <h1 className='text-gray-800 dark:text-gray-700'>Subject:</h1>
                                                <h1 className='text-gray-800 dark:text-gray-700'>{mail?.subject}</h1>
                                            </div>
                                            {/* subject */}
                                            <div className='flex gap-2'>
                                                <h1 className='text-gray-800 dark:text-gray-700'>Body:</h1>
                                                <h1 className='text-gray-800 dark:text-gray-700'>{mail.body}</h1>
                                            </div> </div> : null

                                    }
                                    {
                                        mail.tabs?.info ? <div className='flex flex-col gap-2'>
                                            <div className='flex gap-2'>
                                                <h1 className='text-gray-800 dark:text-gray-700'>Send:</h1>
                                                <h1 className='text-gray-800 dark:text-gray-700'>{mail.success ? 'Send' : 'Panding'}</h1>
                                            </div>
                                            <div className='flex gap-2'>
                                                <h1 className='text-gray-800 dark:text-gray-700'>Created At:</h1>
                                                <h1 className='text-gray-800 dark:text-gray-700'>{convertToLocalTime(mail.createdAt)}</h1>
                                            </div>
                                            <div className='flex gap-2'>
                                                <h1 className='text-gray-800 dark:text-gray-700'>Updated At:</h1>
                                                <h1 className='text-gray-800 dark:text-gray-700'>{convertToLocalTime(mail.updatedAt)}</h1>
                                            </div>
                                        </div> : null
                                    }
                                </div>

                            </div>
                        )
                    }) : <div>
                        <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-300 text-center'>No Mails Found</h1>
                    </div>
                }
            </div>
        </div>
    )
}

export default ListMail
