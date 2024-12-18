import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'

import * as apis from '../../apis'
import { FormEditSeat } from '../../component/forms'
import { setChidlren } from '../../redux/slides/appSlice'
import { FormAddRoom } from '../../component/forms'
import Loading from '../../component/common/Loading'

const ManagerRoom = () => {
    const dispatch = useDispatch()
    const [ reRender, setReRender ] = useState(false)
    const [ listRoom, setListRoom ] = useState([])
    const [ valueSelectRoom, setValueSelectRoom ] = useState('')
    const [ listSeat, setListSeat ] = useState([])
    const [ currentSeat, setCurrentSeat ] = useState({})
    const [ renderListSeat, setRenderListSeat ] = useState(false)
    const [ currentBox, setCurrentBox ] = useState()

    const fecthListRoom = async(day) => {
        const response = await apis.getListRoom()

        if (response.success) {
            setListRoom(response.data.map(item => ({roomId: item._id, name: item.name, width: item.column, height: item.row})))
            console.log(response)
            setValueSelectRoom(response.data[0]._id)
        }
    }

    const fecthListSeat = async(id) => {
        const response = await apis.getListSeat(id)

        if (response.success) {
            setListSeat(response.data)
        }
    }

    useEffect(() => {
        fecthListRoom()
    }, [reRender])

    useEffect(() => {
        fecthListSeat(valueSelectRoom)
    }, [valueSelectRoom, renderListSeat])

    const hanldeChosseSeat = (itemRow, itemColumn) => {
        const data = listSeat.find(item => (+item.row - 1 === itemRow && +item.number - 1 === itemColumn))
        setCurrentBox({row: itemRow, number: itemColumn})

        if (data) {
            setCurrentSeat(data)
        } else {
            setCurrentSeat({row: itemRow, number: itemColumn})
        }
        // setCurrentSeat(listSeat.find(item => (+item.row - 1 === itemRow && +item.number - 1 === itemColumn)))
    }

    // handle add room
    const handleAddRoom = () => {
        dispatch(setChidlren(<FormAddRoom reRender={setReRender}/>))
    }

    // console.log(currentSeat)

    // console.log(listSeat)
    // console.log(listSeat.find(item => (+item.row === 1 && +item.number === 1))?.status)
    //${listSeat.find(item => (+item.row - 1 === itemRow && +item.number - 1 === itemColumn))?.status === 'empty' ? 'bg-white invisible' : ''}
    if(!listSeat) return <Loading />
    
    return (
        <div className="w-full">
            <div className='flex items-center justify-between'>
                <h2 className="font-medium text-2xl">Sơ đồ phòng chiếu</h2>

                <button className='text-white px-3 py-2 bg-blue-500 opacity-70 hover:opacity-100 rounded-md' onClick={handleAddRoom}>Thêm phòng</button>
            </div>

            <div className='mt-4'>
                <label className='font-medium mr-2'>Chọn phòng: </label>
                <select value={valueSelectRoom} onChange={(e) => setValueSelectRoom(e.target.value)}>
                    {listRoom?.map((item, index) => (
                        <option key={index} value={item.roomId}>{item.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex mt-8 w-full">
                <div className='flex-3'>
                    {/* <div className={`grid w-full grid-cols-${listRoom.find(item => item?.roomId === valueSelectRoom)?.width} grid-rows-${listRoom.find(item => item.roomId === valueSelectRoom)?.height}`}>
                        <span className='w-[50px] h-[50px]'>1</span>
                        <span className='w-[50px] h-[50px]'>1</span>
                        <span className='w-[50px] h-[50px]'>1</span>
                        <span className='w-[50px] h-[50px]'>1</span>
                    </div> */}
                    <table>
                        {/* <tr>
                            {Array.from(Array(listRoom.find(item => item?.roomId === valueSelectRoom)?.width), (_, x) => x).map((item, index) => (
                                <td>{item + 1}</td>
                            ))}
                        </tr> */}

                        {Array.from(Array(listRoom.find(item => item?.roomId === valueSelectRoom)?.height), (_, x) => x).map((itemRow, index) => (
                            <tr className='flex gap-1'>
                                {Array.from(Array(listRoom.find(item => item?.roomId === valueSelectRoom)?.width), (_, x) => x).map((itemColumn, index) => (
                                    <td 
                                        onClick={() => hanldeChosseSeat(itemRow, itemColumn)}
                                        className={clsx('w-[30px] mb-1 cursor-pointer text-center rounded-sm mr-1 h-[30px] border-[1px] border-gray-300 hover:bg-main', {'bg-red-400': listSeat.find(item => (+item.row - 1 === itemRow && +item.number - 1 === itemColumn))?.status === 'fix'}, {'bg-main': currentBox?.row === itemRow && currentBox?.number === itemColumn})}
                                    >{listSeat.find(item => (+item.row - 1 === itemRow && +item.number - 1 === itemColumn))?.status !== 'empty' ? listSeat.find(item => (+item.row - 1 === itemRow && +item.number - 1 === itemColumn))?.name?.toUpperCase() || 'x' : 'x'}</td>
                                ))}
                            </tr>
                        ))}

                    </table>
                </div>

                <div className="flex-1 border-l-[2px] border-main" >
                    <FormEditSeat data={currentSeat} rid={valueSelectRoom} onSet={setRenderListSeat}/>
                </div>
            </div>
        </div>
    )
}

export default ManagerRoom