import React, { useState } from 'react';
import styled from 'styled-components';
import UploadIcon from '@mui/icons-material/Upload';

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ImageContainer>
      {image ? (
        <Image src={image} alt="Selected" />
      ) : (
        <Placeholder>
          <UploadIcon style={{ color: '#55a6ff' }} />
          <span style={{ color: '#55a6ff' }} >Adicionar imagem do Ativo</span>
        </Placeholder>
      )}
      <Input type="file" accept="image/*" onChange={handleImageChange} />
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  width: 23rem;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f2f8ff;
  border: 2px dashed #55a6ff;
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
`;

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ccc;
`;

const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

export default ImageUploader;
