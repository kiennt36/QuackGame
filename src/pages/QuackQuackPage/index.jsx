import { Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getUserList } from "../../api";

export default function QuackQuackPage() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	const getUsers = async (users) => {
		setLoading(true);

		try {
			var response = await getUserList();

			setUsers(response.data || []);
		} catch (error) {
			console.error("QuackQuackPage::getUsers::", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	const renderAction = (_, record) => {
		return (
			<div>
				<Link to={`/quackquack/${record.id}`}>Xem chi tiết</Link>
			</div>
		);
	};

	const columns = [
		{
			title: "STT",
			dataIndex: "STT",
			key: "STT",
			render: (_, __, index) => index + 1,
		},
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Tên tài khoản",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Họ tên",
			dataIndex: "firstName",
			key: "firstName",
			render: (firstName, record) => `${firstName} ${record.lastName}`,
		},
		{
			title: "Cấp độ trứng",
			dataIndex: "claimEggLevels",
			key: "claimEggLevels",
			render: (claimEggLevels) => (
				<>
					{claimEggLevels.map((level) => (
						<Tag key={`level-${level}`} color="orange">
							{level}
						</Tag>
					))}
				</>
			),
		},
		{
			title: "Tự động nhặt trứng",
			dataIndex: "isCollectEgg",
			key: "isCollectEgg",
			render: (isCollectEgg) =>
				isCollectEgg ? <span>Có</span> : <span>Không</span>,
		},
		{
			title: "Hành động",
			key: "action",
			render: renderAction,
		},
	];

	return (
		<>
			<Table
				columns={columns}
				dataSource={users}
				pagination={false}
				rowKey={(record) => record.id}
				loading={loading}
			/>
		</>
	);
}
