import React from "react";
import "./Create.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import fundingRequest from "./../../artifacts/contracts/Fundraiser.sol/fundingRequest.json";
const projectId = "2GBAQitnuusXu1SuYws3tB1MRrS";
const projectSecret = "41c024f82bd8c27bebaf91d120346813";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  "base64"
)}`;
//connecting to IPFS

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  apiPath: "/api/v0",
  headers: {
    authorization: auth,
  },
});
// console.log(client);

const Create = () => {
  //Form state management
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const titleHandle = (e) => {
    setTitle(e.target.value);
  };
  const descriptionHandle = (e) => {
    setDescription(e.target.value);
  };
  const amountHandle = (e) => {
    setAmount(e.target.value);
  };
  const categoryHandle = (e) => {
    setCategory(e.target.value);
  };
  const imageHandle = (e) => {
    setImage(e.target.files[0]);
  };

  //form state done

  //IPFS image state management
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [descriptionUrl, setDescriptionUrl] = useState();
  const [imageUrl, setImageUrl] = useState();

  const uploadFiles = async (e) => {
    e.preventDefault();
    setUploading(true);
    if (description !== "") {
      try {
        const added = await client.add(description);

        setDescriptionUrl(added.path);
      } catch (error) {
        toast.warn("error to uploading description");
      }
    }
    if (image !== "") {
      try {
        const added = await client.add(image);

        setImageUrl(added.path);
      } catch (error) {
        toast.warn("error to uploading image");
      }
    }
    setUploading(false);
    setUploaded(true);
    toast.success("Files uploaded sucessfully");
  };

  const [loading, setLoading] = useState(false);
  //fundraiser request form address state
  const [address, setAddress] = useState("");

  //form submit button function
  const submitHandle = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    if (title === "") {
      toast.warn("Title field is empty");
    } else if (description === "") {
      toast.warn("Desription field is empty");
    } else if (amount === "") {
      toast.warn("Required amount is empty");
    } else if (category === "") {
      toast.warn("category is not selected");
    } else if (image === "") {
      toast.warn("files required");
    } else {
      setLoading(true);
      const contract = new ethers.Contract(
        process.env.REACT_APP_PUBLIC_ADDRESS,
        fundingRequest.abi,
        signer
      );

      const fundraisersData = await contract.createCampaign(
        title,
        parseInt(amount),
        imageUrl,
        category,
        descriptionUrl
      );
      await fundraisersData.wait();
      setAddress(fundraisersData.to);
    }
  };
  return (
    <div className="create">
      <div className="form">
        {loading === true ? (
          address === "" ? (
            <div className="spinner">
              <TailSpin height={60} color="#07bc0c" />
            </div>
          ) : (
            <div className="data">
              <h1>Fundraising Request Submitted Successfully!</h1>
              <h1>{address}</h1>
              <br />
              <button className="back-btn">back</button>
            </div>
          )
        ) : (
          <>
            <div className="title">Create Funding request</div>
            <div className="input-container">
              <div className="left">
                <label>Project name</label>
                <input
                  type="text"
                  placeholder="Enter Project Name"
                  className="textarea"
                  value={title}
                  name="title"
                  onChange={titleHandle}
                />
                <br />
                <label>Project Description</label>
                <textarea
                  placeholder="Description"
                  cols="30"
                  rows="10"
                  className="textarea"
                  value={description}
                  name="description"
                  onChange={descriptionHandle}
                ></textarea>
              </div>
              <div className="right">
                <label>Required Funds</label>
                <input
                  type="number"
                  placeholder="$"
                  className="textarea"
                  value={amount}
                  name="amount"
                  onChange={amountHandle}
                />
                <br />
                <label>Category</label>
                <select
                  className="textarea"
                  value={category}
                  name="category"
                  onChange={categoryHandle}
                >
                  <option>Select</option>
                  <option>Metaverse</option>
                  <option>Web3</option>
                  <option>Defi</option>
                  <option>NFT</option>
                  <option>CryptoCurrency</option>
                </select>
                <br />
                <label>Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  className="img-upload"
                  name="image"
                  onChange={imageHandle}
                />
                <br />
                {uploading === true ? (
                  <TailSpin color="white" height={20} />
                ) : uploaded === false ? (
                  <button className="btn" onClick={uploadFiles}>
                    Upload image to IPFS
                  </button>
                ) : (
                  <button className="btn" style={{ cursor: "no-drop" }}>
                    File uploaded successfully
                  </button>
                )}
                <br />
                <button className="btn" onClick={submitHandle}>
                  Submit
                </button>
              </div>
            </div>
          </>
        )}{" "}
      </div>
    </div>
  );
};

export default Create;
