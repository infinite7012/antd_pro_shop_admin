import React, { useState, useEffect } from 'react'
import { fetchDashBoard } from '@/services/dashboard'
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export default function DashBoard() {
    const [data, setData] = useState({})
    useEffect(async () => {
        const resData = await fetchDashBoard()
        setData(resData)
    }, [])
    return (
        <div className="site-statistic-demo-card">
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="用户数量"
                            value={data.users_count}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="商品数量"
                            value={data.goods_count}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="订单数据"
                            value={data.order_count}
                            valueStyle={{ color: '#1613cf' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
