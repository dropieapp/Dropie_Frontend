import React from 'react';
import { Table, Button } from 'antd';

const columns = [
  {
    title: 'Vechicle No',
    dataIndex: 'name',
  },
  {
    title: 'Driver Name',
    dataIndex: 'age',
  },
  {
    title: 'Date of  Maintenance',
    dataIndex: 'address',
  },
  {
    title: 'Vechicle Type',
    dataIndex: 'address',
  },
  {
    title: 'Next Due Date',
    dataIndex: 'address',
  },
  {
    title: 'Vechicle Model',
    dataIndex: 'address',
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    render: () => <span style={{color:"#D93804"}}>₦ 1000</span>,

  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London, no. ${i}`,
    cost: '₦ 1000',
  });
}

class CheckboxTable extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default CheckboxTable