import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { Suspense } from "react";

export default function LoadingPage({ children, fallback }) {
	return (
		<Suspense
			fallback={
				fallback ?? <Spin
					indicator={
						<LoadingOutlined
							style={{
								fontSize: 24,
							}}
							spin
						/>
					}
					fullscreen
				/>
			}
		>
			{children}
		</Suspense>
	);
}
