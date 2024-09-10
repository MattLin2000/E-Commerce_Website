import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Profile.css";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [data, setData] = useState();
    const navigate = useNavigate()
    const getUserInfo = async () => {
       try{
        const response = await axios.get("http://localhost:8080/register/getUser", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            params: {
                username: localStorage.getItem("username")
            }
        });
        console.log(response.data);
        setData(response.data);
       }catch(error){
        if (error.response && error.response.status === 403) {
            alert("無此權限訪問此頁面");
            navigate("/login")
          } else {
            console.error("發生錯誤：", error); // 捕捉其他錯誤
       }
       
    }
    }
    useEffect(() => { getUserInfo() }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 bg-light sidebar d-flex flex-column align-items-center p-4">
                    <h4 className="text-center mb-4">買家中心</h4>
                    <ul className="list-unstyled w-100">
                        <li className="mb-3 text-center">
                            <a href="/Profile" className="text-decoration-none text-dark font-weight-bold">
                                個人資訊
                            </a>
                        </li>
                        <li className="mb-3 text-center">
                            <a href="/BuyerCenter" className="text-decoration-none text-dark font-weight-bold">
                                購物清單
                            </a>
                        </li>
                        <li className="mb-3 text-center">
                            <a href="/Cart" className="text-decoration-none text-dark font-weight-bold">
                                購物車
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-md-9">
                    <div className="content-section p-4">
                        <h4 className="mb-3 text-center">我的檔案</h4>

                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                <form>
                                    <div className="form-group mb-4">
                                        <label>使用者帳號:</label>
                                        <input type="text" className="form-control" value={data && data.username} disabled />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label>Email:</label>
                                        <input type="email" className="form-control" value={data && data.email} disabled />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label>電話:</label>
                                        <input type="tel" className="form-control" value={data && data.tel} disabled />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
