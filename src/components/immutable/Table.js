import React, { Component } from 'react';
import { Table, Button, Input, Select, Popconfirm } from 'antd';
import EditCell from './EditCell';
import { CLIENT_RENEG_LIMIT } from 'tls';
const Option = Select.Option;

class TableCustomize extends Component {
	constructor(props){
		super(props);
		this.columns = [{
			title: '标名',
			dataIndex: 'euName',
			key: 'euName',
			render: (text, record) => {
				return <span>{record.eu.euName}</span>
			}
		}, {
			title: '编号',
			dataIndex: 'euNo',
			key: 'euNo',
			render: (text, record) => {
				return <span>{record.eu.euNo}</span>
			}
		}, {
			title: '是否禁用',
			dataIndex: 'alert',
			key: 'alert',
			render: (text, record) => {
				return <Select
					defaultValue={!!record.eu.alert + ''}
					onSelect={this.selectChange.bind(this, record.eu.euNo)}
				>
					<Option value=''>false</Option>
					<Option value='true'>true</Option>
				</Select>
			}
		}, {
			title: '说明',
			dataIndex: 'review',
			key: 'review',
			render: (text, record) => {
				return <EditCell value={text} onChange={this.handleEditCell.bind(this, record.eu.euNo)}/>
			}
		}, {
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
			render: (text, record) => {
				return <Popconfirm
					title="确定删除吗?"
					cancelText="取消"
					okText="确定"
					onConfirm={() => this.deleteRow(record.eu.euNo)}
				>
					<Button icon="delete" />
				</Popconfirm>
			}
		}];
	}
	deleteRow = (euNo) => {
		const { dispatch } = this.props;
		let payload = { euNo, method: 'delete' }
		dispatch({ type: 'immutable/e_updateDataSource', payload})
	}
	selectChange = (euNo, alert) => {
		const { dispatch } = this.props;
		let payload = { euNo, alert }
		dispatch({type: 'immutable/e_updateDataSource', payload })
	}
	handleEditCell = (euNo, review) => {
		const { dispatch } = this.props;
		let payload = { euNo, review }
		dispatch({type: 'immutable/e_updateDataSource', payload })
	}
	render() {
		const { dataSource } = this.props;
		return (
			<Table
				dataSource={dataSource}
				columns={this.columns}
				pagination={{  // 分页
					pageSize: 5,
					showQuickJumper: true,
					showSizeChanger: true,
				}}
				rowKey={(record) => record.eu.euNo}
			/>
		);
	}
}

export default TableCustomize;