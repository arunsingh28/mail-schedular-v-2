import React from 'react'
import { createMail } from '../http/mailApi'
import { Link } from 'react-router-dom'


interface ICreateMail {
    name: string;
    email: string;
    subject: string;
    body: string;
    date: string;
    time: string;

}

const CreateMail = () => {

    const [formData, setFormData] = React.useState<ICreateMail>({} as ICreateMail)

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
        // error handling
        try {
            const data = await createMail(formData)
            alert(data.message)
            setFormData({
                name: '',
                email: '',
                subject: '',
                body: '',
                date: '',
                time: '',
            })
        }
        catch (error: any) {
            if (error?.response?.data?.error === undefined) {
                alert('Network error')
            }
            else {
                alert(error?.response?.data.error)
            }
        }
    }


    return (
        <div className='px-10 py-4'>
            <div className='flex justify-between'>
                <h1 className='text-4xl font-semibold text-gray-800 dark:text-gray-200'>Create Mail</h1>
                <Link to={"/"}><button className='px-8 py-3 shadow-md text-gray-800 shadow-green-800 bg-green-500 rounded-md font-mono' >All Mails</button></Link>
            </div>
            <div className="flex items-center">
                <div className="bg-white p-10 md:w-2/3 lg:w-1/2 mx-auto rounded">
                    <form onSubmit={handleSubmit}>

                        <div className="flex items-center mb-5">
                            <label htmlFor="name" className="w-20 inline-block text-right mr-4 text-gray-500 ">Name</label>
                            <input name="name"
                                onChange={handleFormChange}
                                value={formData.name}
                                id="name" type="text" placeholder="Your name" className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400" />
                        </div>

                        <div className="flex items-center mb-5">
                            <label htmlFor="email" className="w-20 inline-block text-right mr-4 text-gray-500 ">Email</label>
                            <input name="email"
                                onChange={handleFormChange}
                                value={formData.email}
                                id="email" type="text" placeholder="Your email" className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400" />
                        </div>

                        <div className="flex items-center mb-10">
                            <label htmlFor="subject" className="w-20 inline-block text-right mr-4 text-gray-500">Subject</label>
                            <input type="text"
                                onChange={handleFormChange}
                                value={formData.subject}
                                name="subject" id="subject" placeholder="Subject" className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400" />
                        </div>
                        <div className="flex items-center mb-10">
                            <label htmlFor="body" className="w-20 inline-block text-right mr-4 text-gray-500">Body</label>
                            <input type="text"
                                onChange={handleFormChange}
                                value={formData.body}
                                name="body" id="body" placeholder="your Message" className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400" />
                        </div>
                        {/* scheduleTime */}
                        <div className='flex justify-between w-full'>
                            <div className="flex-1 w-full items-center mb-10">
                                <label htmlFor="date" className="w-20 inline-block text-right mr-4 text-gray-500">Schedule time</label>
                                <input type="date"
                                    onChange={handleFormChange}
                                    value={formData.date}
                                    name="date" id="date" placeholder="your Message" className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400" />
                            </div>
                            <div className="flex-1 w-full items-center mb-10">
                                <label htmlFor="time" className="w-20 inline-block text-right mr-4 text-gray-500">Schedule time</label>
                                <input type="time"
                                    onChange={handleFormChange}
                                    value={formData.time}
                                    name="time" id="time" placeholder="your Message" className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400" />
                            </div>
                        </div>

                        <div className="text-center">
                            <button className="py-3 px-8 bg-green-500 text-green-100 font-bold rounded">Submit</button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default CreateMail