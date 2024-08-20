import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav'
import { Footer } from './Footer';

function Layout({setProductList,setCurrentPage,setTotalPage ,searchText,setSearchText}) {
    return (
        <div>
        <Nav searchText={searchText} setSearchText={setSearchText} setProductList={setProductList} setCurrentPage={setCurrentPage} setTotalPage={setTotalPage}/>

            <Outlet />

            <Footer />
        </div>

      
    );
}

export default Layout;
