import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import { FaUserAlt } from "react-icons/fa";
import React, { useState } from "react";

interface UserData {
    username: string;
    passwordMask: string;
    birthdayMask: string;
  }

const ProfilePage: React.FC = () => {
    const [userData] = useState<UserData>({
        username: 'nomedaconta',
        passwordMask: '66********9',
        birthdayMask: 'XX/XX/XXXX'
    });
    return(
        <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        color: "white",
        fontFamily: "IBM Plex Serif",
        background:
            "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 100%)",
          }}>
            <div style={{
                display: "flex",
                gap: "100px",
                flexDirection: "column",
                justifyContent: "center",
                height: "70%",
                width: "80%"
            }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "70px"
            }}>
            <div style={{
                margin: "50px",
                marginBottom: "0px",
            }}>
                <FaUserAlt size={200} />
                <h2 style={{
                    marginTop: "20px"
                }}>Hello, {userData.username}!</h2>
            </div>
            <div style={{
                display: "flex",
                borderRadius: "20px",
                margin: "50px",
                backgroundColor: "rgba(255, 255, 255, 0.18)",
                width: "700px",
                height: "250px",
            }}>
            <div style={{display: "flex", margin: "20px", gap: "5px", flexDirection: "row", rowGap: "20px"}}>
            <div style={{display: "flex", flexDirection:"column", alignItems:"end", gap: "10px"}}><span>User</span><span>Password</span><span>Birthday</span></div>
            <div style={{display: "flex", flexDirection:"column", gap:"10px"}}>
                <span style={{height:"25px", width: "200px", backgroundColor: "rgba(255, 255, 255, 0.18)", borderRadius: "10px"}}>{userData.username}</span>
                <span style={{height:"25px", width: "200px", backgroundColor: "rgba(255, 255, 255, 0.18)", borderRadius: "10px"}}>{userData.passwordMask}</span>
                <span style={{height:"25px", width: "200px", backgroundColor: "rgba(255, 255, 255, 0.18)", borderRadius: "10px"}}>{userData.birthdayMask}</span>
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default ProfilePage;