import axios from "axios";
import { useEffect, useState } from "react"
import "./sidebar.css"
import { Link } from "react-router-dom";
import { GetCat } from "../axios";

export default function Sidebar() {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            //const res = await axios.get("/categories");
            try {
                const res = await GetCat();
             //   console.log(res);
                setCats(res.data)
            } catch (e) {
              //  console.log(e);
            }

        }
        getCats()
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">About Me</span>
                <img src="data:image/jpeg;base64,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" alt="" />
                <p> Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                    amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">Categories</span>
                <ul className="sidebarList">
                    {cats.map((c) => (
                        <Link to={`/?cat=${c.name}`} className="link">
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>

                    ))}

                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">Follow Us</span>
                <div className="sidebarSocial">
                    <i className=" sidebarIcon fa-brands fa-square-facebook"></i>
                    <i className=" sidebarIcon fa-brands fa-square-twitter"></i>
                    <i className=" sidebarIcon fa-brands fa-square-pinterest"></i>
                    <i className=" sidebarIcon fa-brands fa-square-instagram"></i>
                </div>
            </div>
        </div>
    )
}
