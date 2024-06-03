import { Button, Col, Divider, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";

import Balance from "../../components/Balance";
import CollectEggs from "../../components/CollectEggs";
import DuckAndNest from "../../components/DuckAndNest";
import SendTokenModal from "../../components/SendTokenModal";
import QuackContext, { QuackCtx } from "../../context/QuackContext";
import { useParams } from "react-router-dom";

export default function QuackQuackDetailPage() {
	const params = useParams()
	const { updateContext } = useContext(QuackCtx);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const uid = params.uid

		if (uid) {
            updateContext && updateContext({
                uid: uid,
            });
			localStorage.setItem('uid', uid);
        }

		// eslint-disable-next-line
	}, [params?.uid])

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
		<QuackContext>
			<Row>
				<Col>
					<Button type="primary" onClick={showModal}>
						Send token
					</Button>
				</Col>
			</Row>
			<Balance />
			<Divider />
			<DuckAndNest />

			<SendTokenModal
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			/>
			<CollectEggs />
		</QuackContext>
	);
}
