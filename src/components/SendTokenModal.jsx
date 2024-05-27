import React from "react";
import { Button, Modal, Form, Input, message } from "antd";

export default function SendTokenModal({ open, onOk, onCancel }) {
    const [form] = Form.useForm();

	const onFinish = async (values) => {
        const {token} = values;
		const response = await fetch(`https://api-quack-game.somee.com/QuackQuack/SendToken?token=${token}`, {
            method: 'GET'
        })

        if(response.status === 200)
            message.success("Send token successfully!")
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
				initialValues={{
					remember: true,
				}}
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
