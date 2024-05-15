

const ItemBillInfor = ({idBill, movieName, roomName, timeStart, day, phone, status, seats}) => {
    return (
        <ul className="flex items-center px-4 py-2 w-full mt-3 rounded-sm border-b-2">
            <li className="w-[100px] font-semibold">{`#${idBill}`}</li>
            <li className="flex-2 font-semibold">{movieName}</li>
            <li className="flex-1 font-semibold">{roomName}</li>
            <li className="flex-1 font-semibold">{timeStart}</li>
            <li className="flex-1 font-semibold">{day}</li>
            <li className="flex-1 font-semibold">{seats}</li>
            <li className="flex-1 font-semibold">{phone}</li>
            <li className="flex-1 font-semibold">{status}</li>
            <li className="w-[85px]"></li>
        </ul>
    )
}

export default ItemBillInfor