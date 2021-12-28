import axios from "axios";
import { useEffect, useState, useRef } from "react";

function Gallery(){
  const baseURL = "https://www.flickr.com/services/rest/?";
  const method1 = "flickr.interestingness.getList";
  const method2 = "flickr.photos.search";
  const key= "e7ed3b39fe112d7e93d03c19325305e0";
  const count = 500;
  const url = `${baseURL}method=${method1}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1`;
  //method2방식(seach)으로 Flickr 요청 url추가 
  const url2 = `${baseURL}method=${method2}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1&tags=ocean`;
  
  let [items, setItems] = useState([]); 
  let list = useRef(null);
  console.log(list);
  
  useEffect(()=>{
    //처음 로딩시 url(interest)로 flickr 데이터 호출
    getFlickr(url);
  },[]);

  return (
    <section className="content gallery">
      <div className="inner">
        <h1>Gallery</h1>
        {/* 버튼 클릭시 */}
        <button onClick={()=>{
          // 기존 리스트에 on클래스를 지워서 화면 아래로 숨김처리
          list.current.classList.remove("on");
          //다시 getFlickr에 인수로 url2를 넣어서 새로운 검색 데이터 호출
          getFlickr(url2);
        }}>수정</button>
       
        <ul className="list" ref={list}>
          {
            items.map((item, index)=>{
              const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
              return (
                <li key={index}>
                  <div className="pic">
                    <img src={imgSrc} />
                  </div>

                  <p>{item.title}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
  
  //함수 외부에서 요청 주소를 인수로 받을수 있게 함수 수정
  async function getFlickr(url){    
    await axios
    .get(url)
    .then(json=>{      
      setItems(json.data.photos.photo);
    })    
    
    list.current.classList.add("on"); 
  }
}

export default Gallery;