import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const ServerErrorPage = () => (
	<Result
		status="500"
		title="500"
		subTitle="Xin lỗi, có lỗi xảy ra."
		extra={
			<Link to={"/"}>
				<Button type="primary">Quay lại trang chủ</Button>
			</Link>
		}
	/>
);
export default ServerErrorPage;
