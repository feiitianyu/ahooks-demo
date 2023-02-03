import { useState, useEffect } from 'react'
import { Button, Table, Input, Radio, DatePicker, Dropdown } from 'antd'
import { PlusOutlined, SearchOutlined, MoreOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useRequest } from 'ahooks'
import * as request from '../../share/request'

const { Column } = Table

const Devices = () => {
  const [params, setParams] = useState({ begin: dayjs().subtract(6, 'day').startOf('day').unix(), end: dayjs().endOf('day').unix(), key: null, page: 1, size: 10 })
  const [devices, setDevices] = useState({ docs: [], totalDocs: 0 })

  const response = useRequest(request.getDevices, {
    manual: true,
    onSuccess: (data, params) => {
      console.log('data', data)
      console.log('params', params)
    }
  })

  useEffect(() => {
    response.run(params)
  }, [params])

  console.log('response', response)

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>移动端注册</div>
        <Button type='primary' style={{ color: 'black' }}><PlusOutlined />注册设备</Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0' }}>
        <div style={{ display: 'flex' }}>
          <Radio.Group size='large' style={{ marginRight: 8 }}>
            <Radio.Button>近7天</Radio.Button>
            <Radio.Button>近30天</Radio.Button>
            <Radio.Button>近1年</Radio.Button>
          </Radio.Group>
          <DatePicker.RangePicker value={[dayjs.unix(params.begin), dayjs.unix(params.end)]} />
        </div>
        <Input style={{ width: 320, height: 40 }} prefix={<SearchOutlined />} placeholder='搜索移动端名称' />
      </div>
      <Table
        dataSource={[]}
        loading={response.loading}
      >
        <Column title='序号' dataIndex='index' key='index' />
        <Column title='移动端名称' dataIndex='name' key='name' />
        <Column title='注册时间' dataIndex='updatedAt' key='updatedAt' />
        <Column title='序列号' dataIndex='code' key='code' />
        <Column title='备注' dataIndex='description' key='description' />
        <Column
          title='操作'
          dataIndex='operation'
          key='operation'
          render={(text, record) => (
            <Dropdown
              menu={{ items: [{ label: '编辑设备', key: 'edit' }, { label: '删除设备', key: 'delete' }] }}
              placement='bottom'
              trigger={['click']}
            >
              <MoreOutlined style={{ cursor: 'pointer' }} />
            </Dropdown>
          )}
        />
      </Table>
    </div>
  )
}

export default Devices
