import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav'
import { Footer } from './Footer';

function Layout({setLogin,login,details,setProductList,setCurrentPage,setTotalPage ,searchText,setSearchText,pageable,getCart}) {
    return (
        <div>
        <Nav searchText={searchText} setSearchText={setSearchText} setProductList={setProductList} 
        setCurrentPage={setCurrentPage} setTotalPage={setTotalPage}
        pageable={pageable}  getCart={getCart} details={details} login={login} setLogin={setLogin}/>

            <Outlet />

            <Footer />
        </div>

      
    );
}

export default Layout;
