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
  //let [url, url2] = getURL();  
  
  useEffect(()=>{  
    //로딩시 interest방식으로 flickr데이터 호출  
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
            console.log("You Clicked!!!")
            list.current.classList.remove("on");         
            setLoading(true);
            getFlickr({
              type: "interest",
              count: 500
            });
          }
          
        }}>Gallery</h1>
       
        <button onClick={()=>{ 
          if(enableClick){
            setEnableClick(false);
            console.log("You Clicked!!!")
            list.current.classList.remove("on"); 
            setLoading(true);   
            //버튼 클릭시 키워드 검색 방식으로 데이터 호출    
            getFlickr({
              type: "search",
              count: 500,
              tags: "노을"
            });
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

 
  
  async function getFlickr(opt){  
    //최종적으로 만들어질 주소가 담길 빈 변수 생성
    let url = "";

    //기본 주소관련 공통 변수사항 저장
    const baseURL = "https://www.flickr.com/services/rest/?";
    const method1 = "flickr.interestingness.getList";
    const method2 = "flickr.photos.search";
    const key= "e7ed3b39fe112d7e93d03c19325305e0";
    const count = opt.count;

    //해당 함수 호출시 type이 interest일때 호출 주소 완성
    if(opt.type === "interest"){
      url = `${baseURL}method=${method1}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1`;  
    }
    //type이 search일때 호출 주소 완성
    else if(opt.type === "search"){
      url = `${baseURL}method=${method2}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1&tags=${opt.tags}`;
    //만약 type이 위의 2가지 경우가 아닐때 오류내용 출력
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
      },1000); //list에 on이 붙어서 올라오는 모션동안 방지
    },1000); //masonry ui가 적용되는 시간동안 방지
     
  }
}

export default Gallery;