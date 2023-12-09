import { Component } from "react";
import axios from "axios";
import { Table, Pagination } from "react-bootstrap";

class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      loading: true,
      error: null,
      currentPage: 1,
      itemsPerPage: 5, // Adjust the number of items per page as needed
    };
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers = () => {
    axios
      .get("http://localhost:8181/executive/getallCustomers")
      .then((response) => {
        this.setState({
          customers: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: "Error fetching customers",
          loading: false,
        });
      });
  };

  handlePageChange = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };

  render() {
    const { customers, loading, error, currentPage, itemsPerPage } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    // Implement pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div>
        <h3>Customers</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.email}</td>
                <td>{customer.contact}</td>
                <td>{customer.user.username}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="justify-content-center">
          {Array.from({ length: Math.ceil(customers.length / itemsPerPage) }).map(
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => this.handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    );
  }
}

export default Customers;
