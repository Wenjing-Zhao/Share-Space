import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineClear } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import moment from "moment";

// import datepicker, image upload and checkbox UI components
import { DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { Checkbox } from "antd";

// this function is for update space modal display
const UpdateModal = ({
  openFormModal,
  setOpenFormModal,
  setHidden,
  handleSubmit,
  isError,
  isLoading,
  isSuccess,
  setIsSuccess,
  spaceId,
}) => {
  const { RangePicker } = DatePicker;
  const dateFormat = "MMM DD YYYY";

  const [imageSrc, setImageSrc] = useState("");
  const [datePicker, setDatePicker] = useState([]);
  const [needs, setNeeds] = useState([]);

  // disable DatePicker select days before today and today
  const disabledDate = (current) => {
    return current && current < moment().endOf("day");
  };

  // this is image upload component props
  const props = {
    action: "https://api.cloudinary.com/v1_1/sharespace/image/upload",
    data: {
      upload_preset: "irdmdwmq",
    },

    // upload status
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setImageSrc(info.fileList[0].response.secure_url);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // this is "pets and needs" checkbox options
  const plainOptions = ["Dogs", "Cats", "Plants"];

  // this is for getting checked values array from checkbox
  const onChange = (checkedValues) => {
    setNeeds(checkedValues);
  };

  return (
    <Wrapper openFormModal={openFormModal}>
      <Section>
        {/* close madal button */}
        <CloseButton
          onClick={() => {
            setOpenFormModal({
              ...openFormModal,
              [spaceId]: false,
            });

            setHidden();
            setIsSuccess(false);
          }}
        >
          <MdOutlineClear style={{ fontSize: "15px" }} />
        </CloseButton>

        {/* add space infos form */}
        <form
          onSubmit={(evt) => {
            handleSubmit(evt, imageSrc, datePicker, needs, spaceId);
          }}
        >
          <SpaceId>Space Id: {spaceId}</SpaceId>

          {/* space house image upload */}
          <InputWrapper>
            <Label>Space image</Label>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </InputWrapper>

          {/* space available date pick */}
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

          {/* space pets and needs get */}
          <InputWrapper>
            <Label>Pets & Needs</Label>
            <Checkbox.Group options={plainOptions} onChange={onChange} />
          </InputWrapper>

          {/* submit form button */}
          <SubmitButton disabled={isLoading} type="submit">
            {/* conditional: data is loading? */}
            {isLoading ? <FiLoaderAnimation /> : "Update Space"}
          </SubmitButton>

          {/* update the space successfully and display a message */}
          {isSuccess && (
            <AlertSuc>Success! You can close or update again.</AlertSuc>
          )}

          {/* failed to update the space and display a message */}
          {isError && (
            <AlertErr>Error! You are missing a piece of information.</AlertErr>
          )}
        </form>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 650px;
  height: 450px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;
  display: ${(props) => (props.openFormModal ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  width: 85%;
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

  &:disabled {
    cursor: not-allowed;
    opacity: 50%;
  }
`;

const AlertErr = styled.p`
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
`;

const AlertSuc = styled.p`
  color: green;
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
`;

const FiLoaderAnimation = styled(FiLoader)`
  font-size: 0.8rem;
  font-weight: bolder;
  color: white;
  animation: rotate 1.5s linear infinite;

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default UpdateModal;
