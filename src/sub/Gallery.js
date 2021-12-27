import axios from "axios";
//useRef import
import { useEffect, useState, useRef } from "react";

function Gallery(){
  const baseURL = "https://www.flickr.com/services/rest/?";
  const method1 = "flickr.interestingness.getList";
  const key= "e7ed3b39fe112d7e93d03c19325305e0";
  const count = 500;
  const url = `${baseURL}method=${method1}&api_key=${key}&per_page=${count}&format=json&nojsoncallback=1`;
  
  let [items, setItems] = useState([]);
  //list를 참조하기 위해 일단 useRef에 null을 담아 list변수 생성
  let list = useRef(null);
  console.log(list);
  
  useEffect(()=>{
    getFlickr();
  },[]);

  return (
    <section className="content gallery">
      <div className="inner">
        <h1>Gallery</h1>
        {/* 참고 싶은 요소에 ref props를 만들고 변수 list대입 */}
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

  //wrapping함수에 async 키워드 적용
  async function getFlickr(){

    //axio문 앞쪽에 await키워드를 추가해서 동기화
    await axios
    .get(url)
    .then(json=>{      
      setItems(json.data.photos.photo);
    })
    
    //위쪽의 axios를 통해서 데이터가 모두 호출완료되면 list에 on을 붙여서 로딩 모션 추가
    list.current.classList.add("on"); 
  }
}



export default Gallery;