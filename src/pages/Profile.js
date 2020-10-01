import React from "react";
import Menu from "../components/menu/Menu";
import { userIsAuthenticated } from "../redux/HOCs";
import UploadPicture from "../components/getUserPicture/GetUserPicture";

import DataService from "../DataService";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UpdateUser from "../components/updateUser/UpdateUser";
import { Redirect } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
    this.client = new DataService();
  }
  handleDelete = (e) => {
    e.preventDefault();
    this.client
      .deleteUser()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.clear();
    window.location.reload();
    // this.setState({ redirect: "/" });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="Profile">
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <h2>Profile</h2>
        <UploadPicture />
        <div></div>
        <br />
        <Button type="primary" danger onClick={this.handleDelete}>
          Delete User
        </Button>
        <UpdateUser />
      </div>
    );
  }
}

export default userIsAuthenticated(Profile);
