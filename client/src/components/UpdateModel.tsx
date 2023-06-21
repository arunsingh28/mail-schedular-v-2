import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { updateMail } from '../http/mailApi'


interface UpdateModelProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    id: string
}

interface IData {
    date: string,
    time: string
}

const UpdateModel = ({ setShow, id }: UpdateModelProps) => {

    const divRef = React.useRef<HTMLDivElement>(null)

    const [data, setData] = React.useState<IData>({
        date: '',
        time: ''
    })


    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }



    const handleUpdate = async () => {
        try {
            const response = await updateMail(id, data.time, data.date)
            alert(response.message)
            setShow(false)
        } catch (error: any) {
            alert(error.response.data.error)
        }
    }

    return (
        <div className='h-screen w-screen bg-[#00000094] absolute top-0 left-0'>
            <div ref={divRef} className='h-[36vh] w-[30vw] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
                <div className='flex justify-between items-center border-b-2 border-gray-700 px-2'>
                    <h1 className='text-2xl font-bold text-gray-700 uppercase p-2 px-2'>Update Scheduler</h1>
                    <CloseIcon className='cursor-pointer' onClick={() => setShow(false)} />
                </div>
                <div className='p-2'>
                    <div className='flex flex-col'>
                        <label className='text-gray-700 font-bold'>Date</label>
                        <input
                            onChange={changeHandler}
                            value={data.date}
                            className='border-2 border-gray-700 rounded-lg p-2' name='date' type='date' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-gray-700 font-bold'>Time</label>
                        <input
                            onChange={changeHandler}
                            value={data.time}
                            className='border-2 border-gray-700 rounded-lg p-2' name='time' type='time' />
                    </div>
                    <button className='py-3 bg-green-600 w-full mt-4 rounded-md font-mono text-xl hover:bg-green-700' onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateModel