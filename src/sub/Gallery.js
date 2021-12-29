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
  //useRef로 참조할 대상을 담을 객체 생성
  let input = useRef(null);
  /*
  useRef를 쓰는 이유
  --기존의 컴포넌트들을 state값이 변경될때마다 재 렌더링이 일어남
  --useRef를 통해서 참조한 값은 재렌더링이 발생하지 않음
  --useRef는 DOM뿐만이 아닌 일반 데이터들도 참조가능
  */
  
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
          {/* useRef로 생성한 객체에 input요소 담기 */}
          <input type="text" ref={input} />
          <button onClick={()=>{
            if(enableClick){
              setEnableClick(false);             
              list.current.classList.remove("on");         
              setLoading(true);

              //tags변수에 참조된 input요소의 value값 담고
              const tags = input.current.value;
              //input내용은 비움
              input.current.value = "";

              getFlickr({
                type: "search",
                count: 500,
                tags: tags //tags변수에 있는 값을 넣어서 검색
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