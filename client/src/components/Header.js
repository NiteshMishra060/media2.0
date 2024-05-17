import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import {useSelector,useDispatch} from "react-redux" 
import { API_END_POINT } from '../utils/constant';
import axios from "axios";
import { setUser } from '../redux/userSlice';
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';

const Header = () => { 
    const user = useSelector((store)=>store.app.user);
    const toggle = useSelector(store=>store.movie.toggle);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`);
            if(res.data.success){
                toast.success(res.data.message);
            }
            dispatch(setUser(null));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    
    // const uploadHandler = async () => {
    //     try {
    //         const res = await axios.post(`${API_END_POINT}/upload`);
    //         // if(res.data.success){
    //         //     toast.success(res.data.message);
    //         // }
    //         // dispatch(setUser(null));
    //         // navigate("/");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const toggleHandler = () => {
        dispatch(setToggle());
    }
 
    return (
        <div className='absolute z-10 flex w-full items-center justify-between px-6 bg-gradient-to-b from-black'>
            <img className='w-20' src="https://i.pinimg.com/474x/3b/bd/2b/3bbd2bc22e22b58b3147ac5f88d15598.jpg" alt="Nitesh-logo" />
            {
                user && (
                    <div className='flex items-center'>
                        <IoIosArrowDropdown size="24px" color='white' />
                        <h1 className='text-lg font-medium text-white'>{user.fullName}</h1>
                        <div className='ml-4'>
                            <button onClick={logoutHandler} className='bg-red-800 text-white px-4 py-2'>Logout</button>
                            <button onClick={toggleHandler} className='bg-red-800 text-white px-4 py-2 ml-2'>{toggle ? "Home" : "Search Movie"}</button>
                            {/* <form>
                            <button onClick={uploadHandler} className='bg-red-800 text-white px-4 py-2 ml-2'>upload</button>
                            </form> */}
                            <upload/>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Header