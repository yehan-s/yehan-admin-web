import { t } from '@/utils/i18n'
import { Space, Table, Form, Row, Col, Input, Button, Popconfirm, App, Modal, FormInstance } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useAntdTable, useRequest } from 'ahooks'
import { useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import NewAndEditForm from './newAndEdit'
import userService, { User } from './service'

const UserPage: React.FC = () => {
  const [form] = Form.useForm()
  const { message } = App.useApp()

  const {
    tableProps,
    search: { submit, reset },
  } = useAntdTable(userService.getUserListByPage, {
    // 只能通过这样修改ahooks的默认current参数
    defaultParams: [{ current: 1 + 1, pageSize: 5 }, form],
  })

  const { runAsync: deleteUser } = useRequest(userService.deleteUser, { manual: true })
  const [editData, setEditData] = useState<User | null>(null)
  const [saveLoading, setSaveLoading] = useState(false)

  const formRef = useRef<FormInstance>(null)

  const columns: ColumnsType<any> = [
    {
      title: t('mRhYgovD' /* 用户名 */),
      dataIndex: 'userName',
    },
    {
      title: t('geUfTOjb' /* 昵称 */),
      dataIndex: 'nickName',
    },
    {
      title: t('kXLLJEVB' /* 手机号 */),
      dataIndex: 'phoneNumber',
    },
    {
      title: t('NwdnhBFE' /* 邮箱 */),
      dataIndex: 'email',
    },
    {
      title: t('YcKgBXbh' /* 性别 */),
      dataIndex: 'sex',
      render: (value: number) => (value === 1 ? t('csgtkfHQ' /* 男 */) : t('VAUPhZWn' /* 女 */)),
    },
    {
      title: t('IKyYAqOq' /* 创建时间 */),
      dataIndex: 'createAt',
      render: (value: number) => value && dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: t('rmshrXaa' /* 操作 */),
      key: 'action',
      render: (_, record) =>
        record.userName !== 'admin' && (
          <Space size="middle">
            <a
              onClick={() => {
                setEditData(record)
                setFormOpen(true)
              }}
            >
              {t('vkCUYQTo' /* 编辑 */)}
            </a>
            <Popconfirm
              title={t('WjsbkkSk' /* 警告 */)}
              description={t('gMmOWEBL' /* 确认删除这条数据？ */)}
              onConfirm={async () => {
                await deleteUser(record.id)
                message.success(t('eJDHwcth' /* 删除成功 */))
                submit()
              }}
            >
              <a>{t('vHbszoaV' /* 删除 */)}</a>
            </Popconfirm>
          </Space>
        ),
    },
  ]

  const [formOpen, setFormOpen] = useState(false)

  const openForm = () => {
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditData(null)
  }

  const saveHandel = () => {
    submit()
    setFormOpen(false)
    setEditData(null)
  }
  return (
    <div>
      <Form onFinish={submit} form={form} size="large" className="dark:bg-[rgb(33,41,70) bg-white p-[24px] rounded-lg">
        <Row gutter={24}>
          <Col className="lg={16} xl={8}">
            <Form.Item name="nickName" label={t('geUfTOjb' /* 昵称 */)}>
              <Input onPressEnter={submit} />
            </Form.Item>
          </Col>
          <Col className="lg={16} xl={8}">
            <Form.Item name="phoneNumber" label={t('kXLLJEVB' /* 手机号 */)}>
              <Input onPressEnter={submit} />
            </Form.Item>
          </Col>
          <Col className="lg={16} xl={8}">
            <Space>
              <Button onClick={submit} type="primary">
                {t('TzbjdYpm' /* 搜索 */)}
              </Button>
              <Button onClick={reset}>{t('ynyFObsC' /* 清除 */)}</Button>
            </Space>
          </Col>
        </Row>
      </Form>

      <div className="mt-[16px] dark:bg-[rgb(33,41,70) bg-white px-[24px] rounded-lg">
        <div className="py-[16px]">
          <Button onClick={openForm} type="primary" size="large" icon={<PlusOutlined />}>
            {t('tWvPrGob' /* 新增 */)}
          </Button>
        </div>
        <Table rowKey="id" scroll={{ x: true }} columns={columns} className="bg-transparent" {...tableProps} />
      </div>
      <Modal
        title={editData ? t('zQMrxOBm' /* 编辑 */) : t('PYcMGTAg' /* 新增 */)}
        open={formOpen}
        onOk={() => {
          formRef.current?.submit()
        }}
        destroyOnClose
        width={640}
        zIndex={1001}
        onCancel={closeForm}
        confirmLoading={saveLoading}
      >
        <NewAndEditForm
          ref={formRef}
          editData={editData}
          onSava={saveHandel}
          open={formOpen}
          setSaveLoading={setSaveLoading}
        />
      </Modal>
    </div>
  )
}

export default UserPage
