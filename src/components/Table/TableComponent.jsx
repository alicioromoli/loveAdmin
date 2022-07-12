import { useEffect, useState, useReducer, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../../DataContext';
import { Table, Pagination } from 'antd';

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Person Details',
    dataIndex: 'personGuid',
    key: 'personGuid',
    render: (personGuid) => (
      <Link to={`/person/${personGuid}`}>More details</Link>
    ),
  },
  {
    title: 'Deleted',
    dataIndex: 'isDeleted',
    key: 'isDeleted',
    width: 100,
    render: (isDeleted) => {
      if (!isDeleted) return <>N/D</>;
    },
  },
];

const initialPaginationState = {
  currentPage: 1,
  pageSize: 10,
};

function TableComponent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useReducer(
    (newState, state) => ({ ...newState, ...state }),
    initialPaginationState
  );
  const [totalPages, setTotalPages] = useState();
  const { data } = useContext(DataContext);

  useEffect(() => {
    if (data.length > 1) {
      fetchUsers(data);
    }
  }, [data]);

  useEffect(() => {
    fetchUsers(data);
  }, [pagination]);

  const fetchUsers = async (data) => {
    setLoading(true);
    const pageData = data.slice(
      pagination.currentPage * pagination.pageSize - pagination.pageSize,
      pagination.currentPage * pagination.pageSize
    );

    const users = await Promise.all(
      pageData.map(async (item) => {
        const { childEntityGuid: personGuid } = item;
        const { data: user } = await axios.get(
          `/services/test/person/${personGuid}/`
        );
        return user;
      })
    );
    setUsers(users);
    setLoading(false);
    setTotalPages(data.length);
  };

  const handleTableChange = (newPagination, filters, sorter) => {
    fetchUsers({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

  const onChange = (page, pageSize) => {
    setPagination({ currentPage: page });

    if (pageSize !== pagination.pageSize) {
      setPagination({ pageSize });
    }
  };
  return (
    <div className="p-4">
      <Table
        dataSource={users}
        columns={columns}
        pagination={false}
        loading={loading}
        onChange={handleTableChange}
      ></Table>
      <Pagination
        className="pt-4"
        onChange={onChange}
        current={pagination.currentPage}
        total={totalPages}
        responsive={true}
      />
    </div>
  );
}

export default TableComponent;
