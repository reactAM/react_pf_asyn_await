import { useEffect, useState } from "react";

function Department(){

  let [count, setCount] = useState(0);
  let [count2, setCount2] = useState(0);

  //로딩이 됐을때에만 실행
  useEffect(()=>{
    console.log("로딩이 됐을때에만 실행")
  },[]);
  
  //더하기 버튼을 클릭할때만 실행
  useEffect(()=>{
    console.log("plus버튼의 state값이 변경됐을때에만 실행");
  },[count]);

  //빼기 버튼을 클릭할때만 실행
  useEffect(()=>{
    console.log("minus버튼의 state값이 변경됐을때에만 실행");
  },[count2]);

  return (
    <section className="content department">
      <div className="inner">
        <h1>Department</h1>

        <button onClick={()=> setCount(count+1)}>plus</button>
        <button onClick={()=> setCount(count-1)}>mius</button>

        <p>{count}</p>
        <p>{count2}</p>
      </div>
    </section>
  )
}

export default Department;

/*
  useEffect 
  :특정 컴포넌트 안에서 해당 컴포넌트에 특정 효과가 발생할 때마다 실행되는 함수
  1.컴포넌트가 생성됐을때

  2.컴포넌트의 상태값이 변경됬을때

  3.컴포넌트가 사라졌을때

  위의 일련의 과정들을 컴포넌트의 생명주기라고 함 (life cycle)

  useEffect에 의존성 설정하기
  : 특정 스테이트값에만 useEffect가 실행이 되도록 설정가능
  useEffect(()=>{}, [의존할 스테이트명]);
  -->useEffect()에 두번째 인수값으로 의존할 스테이트 명을 배열로 지정
*/