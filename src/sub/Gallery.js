import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-component";

//masonry 개별 패널 옵션
const masonryOptions = {
  fitWidth: false, 
  //columnWidth: 200,
  gutter: 0, //간격 (반응형을 위해서 보통 0처리하고 scss에서 padding으로 구현)
  itemSelector: ".item" //각 패널의 클래스명
}

function Gallery(){ 
  let [items, setItems] = useState([]); 
  let list = useRef(null);  
  let [url, url2] = getURL();
  /*
  let url = getURL()[0];
  let url2 = getURL()[1];
  */
  
  useEffect(()=>{    
    getFlickr(url);
  },[]);

  return (
    <section className="content gallery">
      <div className="inner">
        <h1 onClick={()=>{
          list.current.classList.remove("on");
          getFlickr(url);
        }}>Gallery</h1>
       
        <button onClick={()=>{          
          list.current.classList.remove("on");          
          getFlickr(url2);
        }}>수정</button>
       
        <div className="list" ref={list}> 
          {/* 아래 옵션값을 통해서 동적으로 부모 태그 생성 */}
          <Masonry
            className={"frame"} //동적으로 생길 클래스명
            elementType={"ul"} //동적으로 생길 태그명
            disableImagesLoaded= {false}//이미로딩완료 처리함
            updateOnEachImageLoad= {false}//개별이미지로딩완료 처리함
            options= {masonryOptions}
          > 
            {
              items.map((item, index)=>{
                const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
                return (
                  <li key={index} className="item">                  
                    <div className="inner">
                      <img src={imgSrc} />
                      
                      <h2>{item.title}</h2>
                    </div>
                  </li>
                )
              })
            }
          </Masonry>  
        </div>
      </div>
    </section>
  )  

  function getURL(){
    const baseURL = "https://www.flickr.com/services/rest/?";
    const method1 = "flickr.interestingness.getList";
    const method2 = "flickr.photos.search";
    const key= "e7ed3b39fe112d7e93d03c19325305e0";
    const count = 500;
    const url = `${baseURL}method=${method1}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1`;  
    const url2 = `${baseURL}method=${method2}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1&tags=ocean`;
    return [url, url2];
  }
  
  async function getFlickr(url){    
    await axios
    .get(url)
    .then(json=>{      
      setItems(json.data.photos.photo);
    })    
    
    //masonry ui가 적용될 시간을 벌기 위해서 1초뒤 리스트 활성화
    setTimeout(()=>{
      list.current.classList.add("on");
    },1000);
     
  }
}

export default Gallery;