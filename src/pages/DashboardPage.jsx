import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { Button, Divider, Layout, Menu, theme } from "antd";

import Balance from "../components/Balance";
import { QuackCtx } from "../context/QuackContext";
import DuckAndNest from "../components/DuckAndNest";
import SendTokenModal from "../components/SendTokenModal";
import CollectEggs from "../components/CollectEggs";

const { Header, Sider, Content } = Layout;

export default function DashboardPage() {
	const { updateContext } = useContext(QuackCtx);
	const [collapsed, setCollapsed] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		updateContext({
			isCollect: true,
		});
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["1"]}
					items={[
						{
							key: "1",
							icon: <UserOutlined />,
							label: "nav 1",
						},
						{
							key: "2",
							icon: <VideoCameraOutlined />,
							label: "nav 2",
						},
						{
							key: "3",
							icon: <UploadOutlined />,
							label: "nav 3",
						},
					]}
				/>
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
					<Button type="primary" onClick={showModal}>
						Send token
					</Button>
				</Header>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					<Balance />
					<Divider />
					<DuckAndNest />
				</Content>
			</Layout>
			<SendTokenModal
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			/>
			<CollectEggs />
		</Layout>
	);
}
