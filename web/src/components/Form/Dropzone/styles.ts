import styled from 'styled-components';

export const Container = styled.div`
  height: 300px;
  background: #E1FAEC;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
  outline: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: none;
  }

  
  @media screen and (max-width: 600px) {
    text-align: center;
  }
  p {
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    border-radius: 10px;
    border: 1px dashed #4ECB79;
  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #333;

    svg {
      color: #4ECB79;
      width: 24px;
      height: 24px;
      margin-bottom: 8px;
    }
  }  
`;

export const Gallery = styled.section`
  margin-top: 1rem;
  margin-bottom: 1rem;

  h4 {
    font-size: 0.9em;
    margin-left: 1rem;
    font-weight: 100;
    font-family: Tahoma, Geneva, Verdana, sans-serif;
  }
`;

export const GalleryPhotoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const ImgDropped = styled.img`
  border: 1px solid #ddd; 
  border-radius: 4px;  
  padding: 5px; 
  width: 150px; 
  
  max-height: 150px; 
  object-fit: cover;
`;

export const Error = styled.div`

  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;

  font-size: 0.9em;
  text-align: center;
  font-weight: 100;
  
`;


