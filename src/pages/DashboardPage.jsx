import React, { useCallback, useEffect, useState } from "react";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PauseCircleOutlined,
	PlayCircleOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Divider, FloatButton, Layout, Menu, message, Modal, notification, theme } from "antd";
import Balance from "../components/Balance";
import SendTokenModal from "../components/SendTokenModal";
import DuckAndNest from "../components/DuckAndNest";
const { Header, Sider, Content } = Layout;

function random(lenght) {
	return Math.floor(Math.random() * lenght);
}

export default function DashboardPage() {
	const [api, contextHolder] = notification.useNotification();
	const [collapsed, setCollapsed] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCollect, setIsCollect] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsCollect(true);
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const collect = async (nestId, callback) => {
		const response = await fetch(`https://api-quack-game.somee.com/QuackQuack/CollecEggs?eggId=${nestId}`, {
			method: "POST",
		});

		if(response.status === 200) {
			await callback(nestId)
            message.success("Collect Egg successfully")
        }
		// else message.error("Collect egg fall")
		// await callback(nestId)
	}

	const layEgg = async (nestId, duckId) => {
		const response = await fetch(`https://api-quack-game.somee.com/QuackQuack/LayEggs?eggId=${nestId}&duckId=${duckId}`, {
            method: "POST",
        });

		if(response.status === 200) {
            message.success("Lay Egg successfully")
        }
        // else message.error("Lay Egg fall")
	}

	const handleCollect = useCallback(() => {
		const nestList = JSON.parse(localStorage.getItem('nests'));
		const duckList = JSON.parse(localStorage.getItem('ducks'));

		nestList.forEach(nest => {
			// if(nest.type_egg <= 2) {
				collect(nest.id, async (nestId) => {
					const duck = duckList[random(duckList.length)];
					await layEgg(nestId, duck.id)
				})
			// }else {
			// 	api.warning({
			// 		message: 'Warning',
            //         description: 'You have egg to collect',
			// 	})
			// }
		})
	}, [])

	useEffect(() => {
		const collectSetInterval = setInterval(() => {
			handleCollect()
        }, 6e3)

		if(isCollect) {
            handleCollect()
		}else {
			clearInterval(collectSetInterval)
		}

		return () => {
            clearInterval(collectSetInterval)
        }

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCollect])

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
			<FloatButton icon={isCollect ? <PauseCircleOutlined /> : <PlayCircleOutlined />} onClick={() => setIsCollect(pre => !pre)} />
			{contextHolder}
		</Layout>
	);
}
