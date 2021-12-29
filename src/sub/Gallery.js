import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-component";

//public폴더의 절대경로를 변수에 저장
const path=process.env.PUBLIC_URL;

//masonry 개별 패널 옵션
const masonryOptions = {
  fitWidth: false, 
  //columnWidth: 200,
  gutter: 0, //간격 (반응형을 위해서 보통 0처리하고 scss에서 padding으로 구현)
  itemSelector: ".item" //각 패널의 클래스명
}

function Gallery(){ 
  let [items, setItems] = useState([]); 
  //로딩바 출력 유무를 결정할 state생성하고 초기값을 true로 설정
  let [loading, setLoading] = useState(true);
  let list = useRef(null);  
  let [url, url2] = getURL();  
  
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

        {/* 삼항 연산자로 loading state값이 true일 때에만 로딩이미지 출력 */}
        {(loading) ? <img className="loading" src={path+"/img/loading.gif"}/> : ""}
       
        <div className="list" ref={list}>         
          <Masonry
            className={"frame"} 
            elementType={"ul"} 
            disableImagesLoaded= {false}
            updateOnEachImageLoad= {false}
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
      //데이터 호출이 끝나면 setLoading으로 loading state값 false로 변경
      setLoading(false);
    },1000);
     
  }
}

export default Gallery;