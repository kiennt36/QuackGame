import React, { useEffect, useState } from "react";
import { Card, Col, message, Row } from "antd";

export default function Balance() {
    const [balance, setBalance] = useState([])
    async function getBalance () {
        const response = await fetch(`https://api-quack-game.somee.com/QuackQuack/GetBalance`, {
            method: 'GET'
        })

        if(response.status === 200) {
            const responseJson = await response.json();
            setBalance(responseJson.data.data ?? [])
        }
            
        else
            message.error("Get Balance Failed")
    }

    useEffect(() => {
        getBalance()
        const getBalanceInterval = setInterval(() => getBalance(), 3e3)

        return () => {
            clearInterval(getBalanceInterval)
        }
    }, [])

	return (
		<Row gutter={16}>
            {
                balance.map((balance, i) => (
                    <Col span={6} key={balance.symbol + i}>
				<Card title={balance.symbol} bordered={false}>
					{balance.balance}
				</Card>
			</Col>
                ))
            }
		</Row>
	);
}
