import React, { useState, useRef, useCallback } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import DashboardTitle from "../components/DashboardTitle";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import "../css/custom.css";
import { Row, Col } from "antd";
import CheckboxTable from "../components/CheckboxTable";
import { Link } from "react-router-dom";

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

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

const VehicleInfo = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const state = useRef({
    loading: false,
  });
  const handleChange = useCallback((info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {});
    }
  });
  // const { loading, imageUrl } = this.state;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Layout>
      <div className="sm:px-6 pl-8 py-8 w-full max-w-9xl mx-auto">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <DashboardTitle title="Truck" subtitle="Vechicle ID: 224488" />
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <Link to="/fleet-management">
              <button
                className="btn hover:text-yellow-500 text-gray border h-8 px-4 text-sm"
                style={{
                  borderColor: "rgb(249, 123, 4, 0.2",
                }}
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
            </Link>
          </div>
        </div>
        <div
          class="py-4 px-8 bg-white shadow-sm rounded-lg my-10 border"
          style={{
            borderColor: "rgba(197, 17, 4, 0.1)",
          }}
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
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: "100%",
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col span={12} className="text-xs">
                  Vechicle Type: <span className="text-sm">Truck</span>
                </Col>
                <Col span={12} className="text-xs">
                  Time: <span className="text-sm">10 : 30 PM</span>
                </Col>
                <Col span={12} className="text-xs mt-2">
                  Vehicle Modal: <span className="text-sm">BMW 120</span>
                </Col>
                <Col span={12} className="text-xs mt-2">
                  Date: <span className="text-sm">1 / 22 / 2022</span>
                </Col>
              </Row>
              <Row className="mt-6">
                <Col span={24} className="text-xs">
                  Chassis Number: <span className="text-sm">100012</span>
                </Col>
              </Row>
              <Row className="mt-6">
                <Col span={24} className="text-xs">
                  Vehicle Color: <span className="text-sm">Red</span>
                </Col>
              </Row>
              <Row className="mt-6">
                <Col
                  span={24}
                  className="text-sm"
                  style={{
                    color: "#d93804",
                  }}
                >
                  Assigned Agent: Tom James
                </Col>
              </Row>
              <hr
                className="mt-10 mb-10 border"
                style={{
                  borderColor: "rgba(197, 17, 4, 0.1)",
                }}
              />
              <div>
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                  <ul
                    className="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 -space-x-3 -ml-px text-lg font-semibold"
                    style={{
                      color: "#000000",
                    }}
                  >
                    Note
                  </ul>
                  <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{
                        color: "#d93804",
                      }}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span
                      className="hidden xs:block mr-2"
                      style={{
                        color: "#d93804",
                      }}
                    >
                      Add Note
                    </span>
                  </div>
                </div>
                <div
                  className="p-5 font-thin text-xs"
                  style={{
                    backgroundColor: "rgba(249, 123, 4, 0.05)",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  eleifend libero semper metus aliquam tempus. Sed efficitur
                  elit et ligula lobortis Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Morbi eleifend libero semper
                  metus aliquam tempus. Sed efficitur elit et ligula lobortis
                </div>
                <div className="font-thin text-xs mt-5">
                  Added on December 27, 2019 at 7:00 pm | By Sales Manger
                  <span
                    className="ml-2"
                    style={{
                      color: "#d93804",
                    }}
                  >
                    Delete Note
                  </span>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Fuel Info" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Maintence Record" key="3">
              <CheckboxTable />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default VehicleInfo;
