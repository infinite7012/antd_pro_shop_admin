import React, { useState, useEffect } from 'react'
import { Modal, message, Skeleton } from 'antd'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { addUser, showUser, updateUser } from '@/services/user.js'

export default function CreateOrEdit(props) {
    const { isModalVisible, isModalShow, actionRef, editId } = props
    const type = editId ? '修改用户信息' : '新增用户'
    const [initialValues, setInitialValues] = useState(undefined)
    useEffect(async () => {
        if (editId) {
            const response = await showUser(editId)
            setInitialValues(response)
        }
    }, [])

    const handleSubmit = async (value) => {
        let response = {}
        if (!editId) {
            response = await addUser(value)
        }
        else {
            response = await updateUser(editId, value)
        }
        if (response.status === undefined) {
            message.success(`${type}成功`)
            isModalShow(false)
            actionRef.current.reload()
        }
    }
    return (
        <Modal title={type}
            visible={isModalVisible}
            onCancel={() => isModalShow(false)}
            footer={null}
            destroyOnClose={true}>
            {
                initialValues === undefined && editId !== undefined ?
                    <Skeleton paragraph={{ rows: 4 }} /> :
                    <ProForm
                        initialValues={initialValues}
                        onFinish={(value) => handleSubmit(value)}>
                        <ProFormText
                            name='name'
                            label='昵称'
                            placeholder='请输入昵称'
                            rules={[
                                { required: true, message: '昵称必输' }
                            ]}
                        />
                        <ProFormText
                            name='email'
                            label='邮箱'
                            placeholder='请输入邮箱'
                            rules={[
                                { required: true, message: '邮箱必输' },
                                { type: 'email', message: '邮箱格式错误' }
                            ]}
                        />
                        {
                            !editId && <ProFormText.Password
                                name='password'
                                label='密码'
                                placeholder='请输入密码'
                                rules={[
                                    { required: true, message: '密码必输' },
                                    { min: 6, message: '密码至少6位' },
                                ]}
                            />
                        }

                    </ProForm>
            }
        </Modal>
    )
}