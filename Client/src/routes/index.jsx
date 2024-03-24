import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Room from '../pages/Room'
import Auth from '../pages/auth'
import ChatRooms from '../pages/ChatRooms/ChatRooms'
import Reg from '../pages/reg'


export default function index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/reg' element={<Reg />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/rooms' element={<ChatRooms />} />
                <Route path='/room/:id/:createId' element={<Room/>} />
            </Routes>
        </BrowserRouter>
    )
}