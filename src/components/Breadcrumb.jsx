import React from "react";
import { Breadcrumb as BreadcrumbAnt } from "antd";
import { Link } from "react-router-dom";

export default function Breadcrumb() {
	return (
		<BreadcrumbAnt
        style={{
            margin: "24px 16px 0",
        }}
			items={[
				{
					title: <Link to="/">Trang chủ</Link>,
				},
				{
					title: <Link to="/quackquack">QuackQuack</Link>,
				},
				{
					title: <Link to="/quackquack/665d1d8c2d440b92c5731cdc">Tài khoản</Link>,
				},
			]}
		/>
	);
}
