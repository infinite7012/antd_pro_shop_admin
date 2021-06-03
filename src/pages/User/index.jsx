import React, { useRef, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Button, Switch, Avatar, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getUserData, lockUser } from '@/services/user.js'
import CreateOrEdit from './components/CreateOrEdit'
export default function Index() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [editId, setEditId] = useState(undefined)
    const actionRef = useRef()
    const getData = async (params) => {
        const response = await getUserData(params)
        return {
            data: response.data,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: response.meta.pagination.total,
        }
    }
    const handleLockUser = async (id) => {
        const response = await lockUser(id)
        if (response.status === undefined) {
            message.success('操作成功')
        }
    }
    const isModalShow = (val, editId) => {
        setEditId(editId)
        setIsModalVisible(val)
    }

    const columns = [
        {
            title: '头像',
            dataIndex: 'avatar',
            hideInSearch: true,
            render: (_, record) =>
                <Avatar size={32} src={record.avatar_url} />
        },
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '邮箱',
            dataIndex: 'email'
        },
        {
            title: '是否禁用',
            dataIndex: 'is_locked',
            hideInSearch: true,
            render: (_, record) =>
                <Switch
                    checkedChildren="启用"
                    unCheckedChildren="停用"
                    defaultChecked={record.is_locked === 0}
                    onChange={() => handleLockUser(record.id)} />
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            hideInSearch: true,
        },
        {
            title: '操作',
            hideInSearch: true,
            render: (_, record) =>
                <a onClick={() => isModalShow(true, record.id)}>编辑</a>
        },
    ]

    return (
        <PageContainer>
            <ProTable
                columns={columns}
                actionRef={actionRef}
                request={(params = {}, sort, filter) => getData(params)}
                rowKey="id"
                search={{
                    labelWidth: 'auto',
                }}
                pagination={{
                    pageSize: 10,
                }}
                dateFormatter="string"
                headerTitle="用户列表"
                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => isModalShow(true)}>
                        新建
                    </Button>
                ]}
            />
            {
                //模态框隐藏的时候，不挂载组件；
                //模态框显示的时候再挂载组件，这样是为了触发子组件的生命周期函数
                !isModalVisible ? '' :
                    <CreateOrEdit
                        isModalVisible={isModalVisible}
                        isModalShow={isModalShow}
                        actionRef={actionRef}
                        editId={editId} />
            }

        </PageContainer>
    )
}
