import { FloatButton, message, notification } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";

import * as apiService from "../api";
import { QuackCtx } from "../context/QuackContext";
import CollectEggsModal from "./CollectEggsModal";

function random(lenght) {
	return Math.floor(Math.random() * lenght);
}

export default function CollectEggs() {
	const { nests, ducks, eggLevels, isCollect, updateContext } =
		useContext(QuackCtx);
	const [api, contextHolder] = notification.useNotification();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const collect = async (nestId, callback) => {
		const response = await apiService.collectEgg(nestId);

		if (response.status === 200) {
			await callback(nestId);
			message.success("Collect Egg successfully");
		}
		// else message.error("Collect egg fall")
		// await callback(nestId)
	};

	const layEgg = async (nestId, duckId) => {
		const response = await apiService.layEgg(nestId, duckId);

		if (response.status === 200) {
			message.success("Lay Egg successfully");

			const balanceResponse = await apiService.getBalance();
			const getListReloadResponse = await apiService.getListReload();

			if (
				balanceResponse.status === 200 &&
				getListReloadResponse.status === 200
			) {
				updateContext({
					balance: balanceResponse.data.data ?? [],
					ducks: getListReloadResponse.data.duck ?? [],
					nests: getListReloadResponse.data.nest ?? [],
				});
			}
		}

		// else message.error("Lay Egg fall")
	};

	const handleCollect = useCallback(() => {
		const isEggsValid = nests.every((n) => !!n.type_egg);
		const duck = ducks[random(ducks.length)];

		if (!isEggsValid) {
			nests.forEach((nest) => {
				layEgg(nest.id, duck.id);
			});
		}

		nests.forEach(async (nest) => {
			if (nest.type_egg) {
				if (eggLevels.includes(nest.type_egg)) {
					await collect(nest.id, async (nestId) => {
						await layEgg(nestId, duck.id);
					});
				} else {
					api.warning({
						message: "Warning",
						description: `You have egg level ${nest.type_egg} to collect`,
					});
				}
			} else {
				layEgg(nest.id, duck.id);
			}
		});

		// eslint-disable-next-line
	}, [nests.lenght, ducks.lenght, eggLevels.length]);

	useEffect(() => {
		const collectSetInterval = setInterval(() => {
			handleCollect();
		}, 6e3);

		if (isCollect) {
			handleCollect();
		} else {
			clearInterval(collectSetInterval);
		}

		return () => {
			clearInterval(collectSetInterval);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCollect]);

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

	const onCollect = () => {
		if (!isCollect) {
			showModal();
		} else {
			updateContext({
				isCollect: false,
			});
		}
	};

	return (
		<>
			<FloatButton
				icon={
					isCollect ? <PauseCircleOutlined /> : <PlayCircleOutlined />
				}
				onClick={onCollect}
			/>

			<CollectEggsModal
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			/>

			{contextHolder}
		</>
	);
}
