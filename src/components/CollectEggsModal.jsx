import { Button, Checkbox, Col, Divider, Form, Modal, Row } from "antd";
import React, { useContext, useState } from "react";
import { QuackCtx } from "../context/QuackContext";

const CheckboxGroup = Checkbox.Group;
const plainOptions = [
	{
		name: "Level 1",
		value: 1,
	},
	{
		name: "Level 2",
		value: 2,
	},
	{
		name: "Level 3",
		value: 3,
	},
	{
		name: "Level 4",
		value: 4,
	},
	{
		name: "Level 5",
		value: 5,
	},
	{
		name: "Level 6",
		value: 6,
	},
	{
		name: "Level 7",
		value: 7,
	},
	{
		name: "Level 8",
		value: 8,
	},
	{
		name: "Level 9",
		value: 9,
	},
	{
		name: "Level 10",
		value: 10,
	},
	{
		name: "Level 11",
		value: 11,
	},
	{
		name: "Level 12",
		value: 12,
	},
	{
		name: "Level 13",
		value: 13,
	},
];
const defaultCheckedList = [1, 2];

export default function CollectEggsModal({ open, onOk, onCancel }) {
    const {updateContext} = useContext(QuackCtx)
	const [form] = Form.useForm();

	const [checkedList, setCheckedList] = useState(defaultCheckedList);

	const checkAll = plainOptions.length === checkedList.length;
	const indeterminate =
		checkedList.length > 0 && checkedList.length < plainOptions.length;

	const onChange = (list) => {
		setCheckedList(list);
	};
	const onCheckAllChange = (e) => {
        let checkeds =  e.target.checked ? plainOptions.map(item => item.value) : []
		form.setFieldValue("eggLevels", checkeds);
		setCheckedList(checkeds);
	};

	const onFinish = async (values) => {
        const {eggLevels} = values;
		updateContext({
            eggLevels,
        })
        localStorage.setItem("eggLevels", JSON.stringify(eggLevels))
		form.resetFields();
		onOk();
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	const handleCancel = () => {
		form.resetFields();
		setCheckedList(defaultCheckedList);
		onCancel();
	};

	return (
		<Modal
			title="Send token"
			open={open}
			onOk={onFinish}
			onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					Cancel
				</Button>,
				<Button
					key="submit"
					form="collectEggLevels"
					htmlType="submit"
					type="primary"
				>
					Submit
				</Button>,
			]}
		>
			<Form
				form={form}
				name="collectEggLevels"
				initialValues={{
					eggLevels: defaultCheckedList,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Checkbox
					indeterminate={indeterminate}
					onChange={onCheckAllChange}
					checked={checkAll}
				>
					Check all
				</Checkbox>
				<Divider />
				<Form.Item
					label="Egg Levels"
					name="eggLevels"
					valuePropName="checked"
					rules={[
						{
							required: true,
							message: "Please input your egg level!",
						},
					]}
				>
					<CheckboxGroup value={checkedList} onChange={onChange}>
						<Row>
							{plainOptions.map((item) => (
								<Col span={8} key={item.name}>
									<Checkbox value={item.value}>
										{item.name}
									</Checkbox>
								</Col>
							))}
						</Row>
					</CheckboxGroup>
				</Form.Item>
			</Form>
		</Modal>
	);
}
