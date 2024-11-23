import { useEffect, useState } from "react";
import Heading from "./components/Heading";
import Loader from "./components/Loader";
import UnsplashImage from "./components/UnsplashImage";
import axios from "axios";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
  }
`;

const WrapperImage = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

function App() {
  const [images, setImages] = useState([]);
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    const apiRoot = "https://api.unsplash.com";

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=10`)
      .then((res) => setImages([...images, ...res.data]));
  };

  return (
    <>
      <div className="App">
        <Heading />
        <GlobalStyle />
        <InfiniteScroll
          dataLength={images.length}
          next={fetchImages}
          hasMore={true}
          loader={<Loader />}
        >
          <WrapperImage>
            {images.map((image) => {
              return <UnsplashImage url={image.urls.thumb} key={image.id} />;
            })}
          </WrapperImage>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default App;
