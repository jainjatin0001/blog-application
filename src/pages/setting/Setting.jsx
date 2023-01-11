import "./setting.css";
import Sidebar from "../../sidebar/Sidebar";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { Context } from "../../context/Context";
import {uploadUser, userPost} from "../../axios"
import { useState } from "react";

export default function Setting() {
    const {user, dispatch}= useContext(Context);
    const [file, setFile]= useState(null);
    const [username, setUsername]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [success, setSuccess]= useState(false);
    const PF= "http://localhost:5000/images/";

    const handleSubmit= async (e)=> {
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser= {
          userId: user._id,
          username, email ,
          password,
        };
       
        if(file)
        {
          const data= new FormData();
          const filename= Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          updatedUser.ProfilePic= filename;
          try {
            const temp= await uploadUser(
                data
            )
          
          } catch (err) {     
            }
        };
        try {
          const res = await userPost(user._id, 
            updatedUser
          )
          setSuccess(true);
          dispatch({type:"UPDATE_SUCCESS", Payload: res.data})
        } catch (err) {
            dispatch({type:"UPDATE_FAILURE"})
        }
      }
     
  return (
    <div className="setting">
        <div className="settingWrapper">
            <div className="settingTitle">
                <span className="settingUpdateTitle" >Update your Account </span>
                <span className="settingDeleteTitle" >
                    <i className="Icon fa-solid fa-trash"></i> 
                </span>
            </div>
            <form  className="settingForm" onSubmit={handleSubmit}>
                <label >profile picture</label>
                <div className="settingPP">
                    <img src={ file ? URL.createObjectURL(file) : PF + user.ProfilePic} alt="" />
                    <label htmlFor="fileInput">
                    <i className="settingPPIcon fa-solid fa-user"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <label>User Name</label>
                <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
                <label>password</label>
                <input type="password"  onChange={(e) => setPassword(e.target.value)}/>
                <button className="settingSubmit" type="submit">Update</button>
                {success && <span style={{color:"green" ,textAlign:"center", marginTop:"20px" }}>Profile has been Updated</span> }
            </form>
        </div>
        <Sidebar />
    </div>
  );
}
