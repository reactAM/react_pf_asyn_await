import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-component";

const path=process.env.PUBLIC_URL;

const masonryOptions = {
  fitWidth: false, 
  //columnWidth: 200,
  gutter: 0, //간격 (반응형을 위해서 보통 0처리하고 scss에서 padding으로 구현)
  itemSelector: ".item" //각 패널의 클래스명
}

function Gallery(){ 
  let [items, setItems] = useState([]);   
  let [loading, setLoading] = useState(true);
  //enableClick에 true값 저장
  let [enableClick, setEnableClick] = useState(true);
  let list = useRef(null);  
  let [url, url2] = getURL();  
  
  useEffect(()=>{    
    getFlickr(url);
  },[]);  

  return (
    <section className="content gallery">
      <div className="inner">
        <h1 onClick={()=>{
          //이벤트 안쪽 코드를 enableClick이 true일때만 실행
          if(enableClick){
            //조건식을 통과하자마자 enableClick값을 바로 false로 변경
            setEnableClick(false);
            console.log("You Clicked!!!")
            list.current.classList.remove("on");         
            setLoading(true);
            getFlickr(url);
          }
          
        }}>Gallery</h1>
       
        <button onClick={()=>{   
          //이벤트 안쪽 코드를 enableClick이 true일때만 실행
          if(enableClick){
            //조건식을 통과하자마자 enableClick값을 바로 false로 변경
            setEnableClick(false);
            console.log("You Clicked!!!")
            list.current.classList.remove("on"); 
            setLoading(true);       
            getFlickr(url2);
          }  
        }}>수정</button>

       
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
    
   
    setTimeout(()=>{
      list.current.classList.add("on");      
      setLoading(false);
      setTimeout(()=>{
        setEnableClick(true);
      },1000); //list에 on이 붙어서 올라오는 모션동안 방지
    },1000); //masonry ui가 적용되는 시간동안 방지
     
  }
}

export default Gallery;