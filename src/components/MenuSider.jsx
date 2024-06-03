import {
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuSider() {
    const navigate = useNavigate();

    const handleClick = (e) => {
        const path = e.key;
        navigate(path)
    }
	return (
		<Menu
			theme="dark"
			mode="inline"
			onClick={handleClick}
			defaultSelectedKeys={["1"]}
			items={[
				{
					key: "/quackquack",
					icon: <UserOutlined />,
					label: "QuackQuack",
				},
				{
					key: "/supermeow",
					icon: <VideoCameraOutlined />,
					label: "SuperMeow",
				},
				{
					key: "/memefi-coin",
					icon: <UploadOutlined />,
					label: "MemeFi Coin",
				},
			]}
		/>
	);
}
