import { Col, message, Row, Table, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import * as apiSerivce from "../api";
import { QuackCtx } from "../context/QuackContext";

const { Title } = Typography;

const nestColumns = [
	{
		title: "STT",
		dataIndex: "STT",
		key: "STT",
		render: (text, record, index) => index + 1,
	},
	{
		title: "Id",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "Egg Level",
		dataIndex: "type_egg",
		key: "type_egg",
	},
	{
		title: "Updated At",
		dataIndex: "updated_time",
		key: "updated_time",
	},
];

const duckColumns = [
	{
		title: "STT",
		dataIndex: "STT",
		key: "STT",
		render: (text, record, index) => index + 1,
	},
	{
		title: "Id",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "Created At",
		dataIndex: "created_time",
		key: "created_time",
	},
	{
		title: "Updated At",
		dataIndex: "updated_time",
		key: "updated_time",
	},
];

export default function DuckAndNest() {
	const { uid, ducks, nests, updateContext } = useContext(QuackCtx);

	async function getListReload() {
		const response = await apiSerivce.getListReload();

		if (response.status === 200) {
			const duckList = response.data.duck ?? [];
			const nestList = response.data.nest ?? [];
			localStorage.setItem("nests", JSON.stringify(nestList));
			localStorage.setItem("ducks", JSON.stringify(duckList));
            updateContext({
                ducks: response.data.duck?? [],
                nests: response.data.nest?? []
            });
		} else message.error("Get Balance Failed");
	}

	useEffect(() => {
		let getListReloadInterval = null;
		if (uid) {
			getListReload();
			getListReloadInterval = setInterval(() => getListReload(), 3e3);
		}

		return () => {
			getListReloadInterval && clearInterval(getListReloadInterval);
		};

        // eslint-disable-next-line
	}, [uid]);

	return (
		<Row gutter={[24, 24]}>
			<Col span={24}>
				<Title level={3}>Nest</Title>
				<Table
					columns={nestColumns}
					dataSource={nests}
					rowKey={(record) => record.id}
					pagination={false}
				/>
			</Col>
			<Col span={24}>
				<Title level={3}>Duck</Title>
				<Table
					columns={duckColumns}
					dataSource={ducks}
					rowKey={(record) => record.id}
					pagination={false}
				/>
			</Col>
		</Row>
	);
}
