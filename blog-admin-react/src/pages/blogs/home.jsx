import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Input,
  Button,
  Table,
  Tag,
  Image,
  Switch,
  Modal,
  message
} from 'antd'

import {
  SearchOutlined,
  SyncOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined
} from '@ant-design/icons'

import {
  reqArticleList,
  reqDeleteArticle,
  reqUpdateArticle,
  reqSearchArticle,
  reqDownloadhArticle
} from '../../request'

import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { formateDate } from '../../utils/format'

function Home (props) {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(0)
  const [title, setTitle] = useState('')
  const pageSize = 5
  const inputRef = useRef()

  // 设置表格信息
  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 80,
      align: 'center',
      render: (text, record, index) => index + 1
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      width: 220,
      ellipsis: true
    },
    {
      title: '文章封面',
      dataIndex: 'img_url',
      key: 'img_url',
      width: 120,
      align: 'center',
      render: (text) => <Image height={40} preview={false} src={text} />
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      align: 'center',
      render: (item) => (
        <Tag color="processing">{item ? item.name : '其他'}</Tag>
      )
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) =>
        tags.map((tag) => (
          <Tag key={tag._id} color="processing">
            {tag.name}
          </Tag>
        ))
    },
    {
      title: '类型',
      key: 'origin',
      dataIndex: 'origin',
      width: 80,
      align: 'center',
      render: (text) => (
        <Tag color={text === 0 ? 'success' : 'error'}>
          {text === 0 ? '原创' : '转载'}
        </Tag>
      )
    },
    {
      title: '可见性',
      dataIndex: 'visible',
      key: 'visible',
      width: 100,
      align: 'center',
      render: (text, record) => (
        <Switch
          defaultChecked={text}
          onChange={(visible) => updateVisible(record._id, visible)}
        ></Switch>
      )
    },
    {
      title: '创建时间',
      key: 'date',
      dataIndex: 'date',
      width: 165,
      render: (text) => formateDate(text)
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (item) => (
        <>
          <Button
            style={{ fontSize: 12 }}
            type="primary"
            className="mr10"
            size="middle"
            icon={<EditOutlined />}
            onClick={() =>
              props.history.push('/blogs/edit', { id: item._id })
            }
          >
            编辑
          </Button>
          <Button
            style={{ fontSize: 12 }}
            type="primary"
            danger
            size="middle"
            icon={<DeleteOutlined />}
            onClick={() => deleteArticle(item._id)}
          >
            删除
          </Button>
        </>
      )
    }
  ]

  // 文章列表
  const getArticleList = async (pageNum) => {
    // 保存当前页码
    setPageNum(pageNum)
    // 发送请求前，显示loading
    setLoading(true)
    const res = await reqArticleList(pageNum, pageSize)
    // 在请求完成后，隐藏 Loading
    setLoading(false)
    const { list, total } = res.data
    setList(list)
    setTotal(total)
  }

  // 删除文章
  const deleteArticle = (id) => {
    Modal.confirm({
      title: '是否删除该文章？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await reqDeleteArticle(id)
        message.success(res.msg)
        getArticleList(pageNum)
      }
    })
  }

  // 搜索文章
  const searchArticle = async () => {
    const title = inputRef.current.state.value
    const res = await reqSearchArticle(title)
    setTitle(title)
    setList(res.data.list)
  }

  // 保存数据
  const downloadArticle = async () => {
    const res = await reqDownloadhArticle()
    const zip = new JSZip()
    const { list } = res.data

    list.forEach((item) => {
      zip.file(`${item.title}.md`, item.content)
    })

    // 下载
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'articles.zip')
    })
  }

  // 重置表格数据
  const reset = () => {
    setTitle('')
    getArticleList(1)
  }

  // 改变可见性
  const updateVisible = async (id, visible) => {
    const res = await reqUpdateArticle({ id, visible })
    message.success(res.msg)
  }

  useEffect(() => {
    getArticleList(1)
  }, [])

  return (
    <Card className="article" title="文章列表">
      <div style={{ marginBottom: 20 }}>
        <Input
          style={{ width: 300, marginRight: 10 }}
          placeholder="文章标题"
          ref={inputRef}
        />
        <Button
          style={{ marginRight: 10 }}
          icon={<SearchOutlined />}
          type="primary"
          onClick={searchArticle}
        >
          搜索
        </Button>
        <Button icon={<SyncOutlined />} type="primary" onClick={reset}>
          重置
        </Button>

        <Button
          style={{ float: 'right' }}
          icon={<DownloadOutlined />}
          type="primary"
          onClick={downloadArticle}
        >
          保存数据
        </Button>
      </div>

      <Table
        loading={loading}
        rowKey="_id"
        bordered
        columns={columns}
        dataSource={list}
        pagination={
          title
            ? false
            : {
                pageSize,
                total,
                onChange: getArticleList
              }
        }
      ></Table>
    </Card>
  )
}

Home.propTypes = {
  history: PropTypes.object.isRequired
}

export default Home
