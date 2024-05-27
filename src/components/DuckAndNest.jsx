import { Col, message, Row, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

const {Title} = Typography

const nestColumns = [
    {
        title: 'STT',
        dataIndex: 'STT',
        key: 'STT',
        render: (text, record, index) => index + 1,
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Egg Level',
        dataIndex: 'type_egg',
        key: 'type_egg',
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_time',
        key: 'updated_time',
    }
]

const duckColumns = [
    {
        title: 'STT',
        dataIndex: 'STT',
        key: 'STT',
        render: (text, record, index) => index + 1,
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Created At',
        dataIndex: 'created_time',
        key: 'created_time',
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_time',
        key: 'updated_time',
    }
]

export default function DuckAndNest() {
    const [nests, setNests] = useState([])
    const [ducks, setDucks] = useState([])

    async function getListReload () {
        const response = await fetch(`https://api-quack-game.somee.com/QuackQuack/GetListReload`, {
            method: 'GET'
        })

        if(response.status === 200) {
            const responseJson = await response.json();
            const duckList = responseJson.data.duck ?? [];
            const nestList = responseJson.data.nest ?? [];
            localStorage.setItem('nests', JSON.stringify(nestList));
            localStorage.setItem('ducks', JSON.stringify(duckList));
            setNests(responseJson.data.nest ?? [])
            setDucks(responseJson.data.duck ?? [])
        }
            
        else
            message.error("Get Balance Failed")
    }

    useEffect(() => {
        getListReload()

        const getListReloadInterval = setInterval(() => getListReload(), 3e3)

        return () => {
            clearInterval(getListReloadInterval)
        }
    }, [])

  return (
    <Row gutter={[24, 24]}>
        <Col span={24}>
            <Title level={3}>Nest</Title>
            <Table columns={nestColumns} dataSource={nests} rowKey={record => record.id} pagination={false} />
        </Col>
        <Col span={24}>
            <Title level={3}>Duck</Title>
            <Table columns={duckColumns} dataSource={ducks} rowKey={record => record.id} pagination={false} />
        </Col>
    </Row>
  )
}
