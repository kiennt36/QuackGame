import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button, Layout, theme } from "antd";
import MenuSider from "../components/MenuSider";
import Breadcrumb from "../components/Breadcrumb";

const { Header, Sider, Content } = Layout;

export default function DashboardPage() {
	
	const [collapsed, setCollapsed] = useState(false);
	

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<Layout style={{height: "100vh"}}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="demo-logo-vertical" />
				<MenuSider />
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					<Button
						type="text"
						icon={
							collapsed ? (
								<MenuUnfoldOutlined />
							) : (
								<MenuFoldOutlined />
							)
						}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: "16px",
							width: 64,
							height: 64,
						}}
					/>
					
				</Header>
				<Breadcrumb />
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
						overflow: "hidden auto",
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
}
