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
  let [enableClick, setEnableClick] = useState(true);
  let list = useRef(null);
  let input = useRef(null);
  
  useEffect(()=>{ 
    getFlickr({
      type: "interest",
      count: 500
    });
  },[]);  

  return (
    <section className="content gallery">
      <div className="inner">
        <h1 onClick={()=>{          
          if(enableClick){
            setEnableClick(false);           
            list.current.classList.remove("on");         
            setLoading(true);

            getFlickr({
              type: "interest",
              count: 500
            });
          }          
        }}>Gallery</h1>

        <div className="searchBox">  
          {/* 인풋 요소에 keypress이벤트 연결 */}
          <input type="text" ref={input} onKeyPress={e=>{
            if(e.key !== "Enter") return;
            
            setEnableClick(false);             
              list.current.classList.remove("on");         
              setLoading(true);
             
              const tags = input.current.value;              
              input.current.value = "";

              getFlickr({
                type: "search",
                count: 500,
                tags: tags 
              });
          }} />
          <button onClick={()=>{
            if(enableClick){
              setEnableClick(false);             
              list.current.classList.remove("on");         
              setLoading(true);
             
              const tags = input.current.value;              
              input.current.value = "";

              getFlickr({
                type: "search",
                count: 500,
                tags: tags 
              });
            }
          }}>검색</button>
        </div>      

        

       
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

 
  
  async function getFlickr(opt){ 
    let url = "";
    
    const baseURL = "https://www.flickr.com/services/rest/?";
    const method1 = "flickr.interestingness.getList";
    const method2 = "flickr.photos.search";
    const key= "e7ed3b39fe112d7e93d03c19325305e0";
    const count = opt.count;
    
    if(opt.type === "interest"){
      url = `${baseURL}method=${method1}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1`;  
    }
   
    else if(opt.type === "search"){
      url = `${baseURL}method=${method2}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1&tags=${opt.tags}`;
    
    }else{
      console.error("api요청 타입을 interest, search중에서 지정하세요.");
    }

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
      },1000); 
    },1000); 
     
  }
}

export default Gallery;