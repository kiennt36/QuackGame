import React, { useContext } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import * as apiService from "../api"
import { QuackCtx } from "../context/QuackContext";

export default function SendTokenModal({ open, onOk, onCancel }) {
	const {updateContext} = useContext(QuackCtx)
    const [form] = Form.useForm();

	const onFinish = async (values) => {
        const {token} = values;
		const response = await apiService.sendToken(token)

        if(response?.status === 200) {
			const uid = response.uid;
			localStorage.setItem("uid", uid);
			updateContext({uid: uid})
            message.success("Send token successfully!")
		}
        else
            message.error("Send token failed")

        form.resetFields();
        onOk()
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<Modal title="Send token" open={open} onOk={onFinish} onCancel={onCancel} footer={[
            <Button key="back" onClick={onCancel}>
              Cancel
            </Button>,
            <Button key="submit" form="sendTokenForm" htmlType="submit" type="primary">
              Submit
            </Button>,
          ]}>
			<Form
            form={form}
				name="sendTokenForm"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Token"
					name="token"
					rules={[
						{
							required: true,
							message: "Please input your token!",
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
}
