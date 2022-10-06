import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineClear } from "react-icons/md";
import moment from "moment";

import { DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { Checkbox } from "antd";

const UpdateModal = ({
  openFormModal,
  setOpenFormModal,
  setHidden,
  handleSubmit,
  error,
  spaceId,
}) => {
  const { RangePicker } = DatePicker;
  const dateFormat = "MMM DD YYYY";

  const [imageSrc, setImageSrc] = useState("");
  const [datePicker, setDatePicker] = useState([]);
  const [needs, setNeeds] = useState([]);

  // DatePicker can not select days before today and today
  const disabledDate = (current) => {
    return current && current < moment().endOf("day");
  };

  // this is for image upload
  const props = {
    action: "https://api.cloudinary.com/v1_1/sharespace/image/upload",
    data: {
      upload_preset: "irdmdwmq",
    },

    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setImageSrc(info.fileList[0].response.secure_url);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // this is for the "pets and needs" check
  const plainOptions = ["Dogs", "Cats", "Plants"];

  const onChange = (checkedValues) => {
    setNeeds(checkedValues);
  };

  return (
    <Wrapper openFormModal={openFormModal}>
      <Section>
        <CloseButton
          onClick={() => {
            setOpenFormModal(false);
            setHidden();
          }}
        >
          <MdOutlineClear style={{ fontSize: "15px" }} />
        </CloseButton>

        <form
          onSubmit={(evt) => {
            handleSubmit(evt, imageSrc, datePicker, needs, spaceId);
          }}
        >
          <SpaceId>Space Id: {spaceId.substring(0, 8) + "..."}</SpaceId>

          <InputWrapper>
            <Label>Space image</Label>

            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </InputWrapper>

          <InputWrapper>
            <Label>Available date</Label>

            <RangePicker
              format={dateFormat}
              disabledDate={disabledDate}
              onChange={(evt) =>
                setDatePicker(
                  evt.map((ele) => moment(ele._d).format(dateFormat))
                )
              }
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="needs">Pets & Needs</Label>
            <Checkbox.Group options={plainOptions} onChange={onChange} />
          </InputWrapper>

          <SubmitButton type="submit">Update Space</SubmitButton>
          <Alert>Success! You can close or update again.</Alert>
          <Alert>Error! You are missing a piece of information.</Alert>
        </form>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 650px;
  height: 420px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;
  display: ${(props) => (props.openFormModal ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  width: 85%;
  height: 85%;
`;

const SpaceId = styled.p`
  font-size: 1.2rem;
  display: block;
  width: 100%;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Label = styled.label`
  font-size: 1.2rem;
  display: block;
  width: 100%;
  margin-bottom: 5px;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  font-size: 1rem;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  outline: none;
  padding: 2px 3px;
  text-align: center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
  position: absolute;
  top: 5px;
  right: 5px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  min-height: 30px;
  outline: none;
  padding: 10px 24px;
  text-align: center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

const Alert = styled.p`
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
`;

export default UpdateModal;
