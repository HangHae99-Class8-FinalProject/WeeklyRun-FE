import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import { useParams } from "react-router-dom";
import { instance } from "../../../Utils/Instance";

import { postData } from "../../../Recoil/Atoms/PostData";
import { useRecoilState } from "recoil";

import { ReactComponent as PostCamera } from "../../../Icons/PostCamera.svg";

const AddPhoto = ({ merge }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [prevImage, setPrevImage] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [post, setPost] = useRecoilState(postData);

  const imgRef = useRef();
  const { id: postId } = useParams();

  useEffect(() => {
    async function getPostData() {
      const res = await instance.get(`/api/post/${postId}`);
      setPrevImage(res.data);
      setPreviewImages(res.data);
    }
    if (postId) {
      getPostData();
    }
  }, []);

  const onSubmitImg = async () => {
    setPost(prev => ({
      ...prev,
      image: uploadImages,
      prevImage,
      isLoading: false
    }));
  };

  const onChangeImg = async () => {
    if (previewImages.length >= 5) {
      return null;
    }
    const imgArray = imgRef.current.files;
    let imgUrls = [...previewImages];
    let images = [];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 720,
      useWebWorker: true
    };
    try {
      for (let i = 0; i < imgArray.length; i++) {
        const comporessedFile = await imageCompression(imgArray[i], options);
        const imgUrl = URL.createObjectURL(comporessedFile);
        imgUrls.push(imgUrl);
        images.push(comporessedFile);
      }
    } catch (error) {
      console.error(error);
    }
    setPreviewImages(imgUrls);
    setUploadImages(prev => prev.concat(images));
  };

  const deletePhoto = idx => {
    setPrevImage(prevImage?.filter((_, index) => index !== idx));
    setPreviewImages(previewImages.filter((_, index) => index !== idx));
    setUploadImages(uploadImages?.filter((_, index) => index + prevImage.length !== idx));
  };

  useEffect(() => {
    if (merge) {
      onSubmitImg();
    }
  }, [merge]);

  return (
    <PhotoWrap>
      <AddButton>
        <input ref={imgRef} name="image" type="file" accept="image/*" multiple onChange={onChangeImg} />
        <PostCamera />
        <div>{previewImages?.length}/5</div>
      </AddButton>
      {previewImages?.map((img, idx) => {
        return (
          <AddButton key={idx}>
            <PreviewImges src={img} alt="첨부한 이미지" onClick={() => deletePhoto(idx)} />
          </AddButton>
        );
      })}
    </PhotoWrap>
  );
};

export default AddPhoto;

const PhotoWrap = styled.div`
  padding: 2rem 0;
  display: flex;
  gap: 2rem;
  border-bottom: 0.1rem solid #e6e6e6;
  width: inherit;
  flex-wrap: nowrap;
  max-width: 34.3rem; ;
`;

const AddButton = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  min-width: 6.4rem;
  height: 6.4rem;
  background: #ffffff;
  border: 0.1rem solid #cccccc;
  border-radius: 0.4rem;
  & input {
    display: none;
  }
  & div {
    width: 2.5rem;
    height: 1.7rem;
    color: #999999;
    font-family: "Noto Sans CJK KR";
  }
`;

const PreviewImges = styled.img`
  width: 6.4rem;
  height: 6.4rem;
`;
