import React, { useContext, useEffect } from "react";
import { Card, Col, message, Row } from "antd";
import * as apiService from "../api";
import { QuackCtx } from "../context/QuackContext";

export default function Balance() {
	const { uid, balance, updateContext } = useContext(QuackCtx);
	async function getBalance() {
		const response = await apiService.getBalance();
		if (response.status === 200) {
			updateContext({
                balance: response.data.data ?? []
            });
		} else message.error("Get Balance Failed");
	}

	useEffect(() => {
		let getBalanceInterval = null;

		if (uid) {
			getBalance();
			getBalanceInterval = setInterval(() => getBalance(), 3e3);
		}

		return () => {
			getBalanceInterval && clearInterval(getBalanceInterval);
		};

        // eslint-disable-next-line
	}, [uid]);

	return (
		<Row gutter={16}>
			{balance.map((balance, i) => (
				<Col span={6} key={balance.symbol + i}>
					<Card title={balance.symbol} bordered={false}>
						{balance.balance}
					</Card>
				</Col>
			))}
		</Row>
	);
}
