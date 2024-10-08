import { t } from '@/utils/i18n'
import { Button, Col, Form, Input, InputNumber, Row, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const TablePage: React.FC = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: t('TNLCBXps' /* 名称 */),
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('tpORDsLq' /* 年龄 */),
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: t('trwTQBUk' /* 地址 */),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: t('ZlZHkELh' /* 职业 */),
      dataIndex: 'tags',
      key: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return <Tag color={color}>{tag.toUpperCase()}</Tag>
          })}
        </>
      ),
    },
    {
      title: t('rmshrXaa' /* 操作 */),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ]

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '4',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '5',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '6',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '7',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '8',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]

  return (
    <div>
      <Form size="large" className="dark:bg-[rgb(33,41,70)] bg-white p-[24px] rounded-md">
        <Row gutter={24}>
          <Col className="w-full" lg={24} xl={8}>
            <Form.Item name="name" label={t('tYKYRuDE' /* 名称 */)}>
              <Input />
            </Form.Item>
          </Col>
          <Col className="w-full" lg={24} xl={8}>
            <Form.Item name="age" label={t('uLMgVqQL' /* 年龄 */)}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col className="w-full text-right" lg={24} xl={8}>
            <Space>
              <Button type="primary">{t('TzbjdYpm' /* 搜索 */)}</Button>
              <Button>{t('ynyFObsC' /* 清除 */)}</Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <div className="mt-[16px] dark:bg-[rgb(33,41,70)] rounded-md">
        <Table scroll={{ x: true }} columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default TablePage
