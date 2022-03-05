import React, { useState } from "react";
import DashboardTitle from "../components/DashboardTitle";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import "../css/custom.css";
import { Row, Col } from "antd";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const VehicleInfo2 = () => {
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        setLoading({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  const {loading, imageUrl} = useState();
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Layout>
      <div className="sm:px-6 pl-8 py-8 w-full max-w-9xl mx-auto">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <DashboardTitle title="Truck" subtitle="Vechicle ID: 224488" />
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <button
              className="btn hover:text-yellow-500 text-gray border h-8 px-4 text-sm"
              style={{ borderColor: "rgb(249, 123, 4, 0.2" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              <span className="hidden xs:block ml-2 mr-2">Back</span>
            </button>
          </div>
        </div>
        <div
          class="py-4 px-8 bg-white shadow-sm rounded-lg my-10 border"
          style={{ borderColor: "rgba(197, 17, 4, 0.1)" }}
        >
          <Tabs defaultActiveKey="1" onChange={callback} className="custom-tab">
            <TabPane tab="Vehicle Info" key="1">
              <Row>
                <Col span={24}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Fuel Info" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Maintence Record" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};
export default VehicleInfo2;
