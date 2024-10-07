import React,{useState, useEffect}from "react";
import { database } from "./firebase"; // これが正しいインポート
import { ref, set, onValue, remove } from "firebase/database";
import Calendar from'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App(){
  const[cigaretteCount, setCigaretteCount] = useState(0);
  const [date, setDate] = useState(new Date());

const handleAddCigarette = () =>{
  if(cigaretteCount < 100){
  const newCount = cigaretteCount + 1;
  setCigaretteCount(newCount);
  saveCigaretteCount(newCount);
  }
};

const handleRemoveCigarette = () =>{
  if (cigaretteCount > 0){
    const newCount = cigaretteCount - 1;
    setCigaretteCount(newCount);
    saveCigaretteCount(newCount);
  }
};
const saveCigaretteCount = (count) => {
  const formattedDate = date.toISOString().split("T")[0];
  set(ref(database, `cigaretteCount/${formattedDate}`), count);
};

const getCigaretteCount = () => {
  const countRef = ref(database, "cigaretteCount");
  onValue(countRef, (snapshot) => {
    const data = snapshot.val();
    if(data){
      const formattedDate = date.toISOString().split('T')[0];
      if(data[formattedDate] !== undefined){
      setCigaretteCount(data[formattedDate]);
    }else{
      setCigaretteCount(0);
    }
  }
});
};

const deleteCigaretteCount = () => {
  const formattedDate = date.toISOString().split('T')[0];
  remove(ref(database,`cigaretteCount/${formattedDate}`));
  setCigaretteCount(0);
}

useEffect(() => {
  getCigaretteCount();
},[date]);

  const getStatus = () => {
    if (cigaretteCount === 0) return "きれい";
    if (cigaretteCount >= 1 && cigaretteCount <= 10) return "きれい";
    if (cigaretteCount >= 11 && cigaretteCount <= 20) return "少しきれい";
    if (cigaretteCount >= 21 && cigaretteCount <= 30) return "少しづつ汚くなってきた";
    if (cigaretteCount >= 31 && cigaretteCount <= 40) return "少し汚れてます";
    if (cigaretteCount >= 41 && cigaretteCount <= 50) return "汚れてきました";
    if (cigaretteCount >= 51 && cigaretteCount <= 60) return "少し黒くなってきました";
    if (cigaretteCount >= 61 && cigaretteCount <= 70) return "だいぶ黒くなってきました";
    if (cigaretteCount >= 71 && cigaretteCount <= 80) return "もうやばいです";
    if (cigaretteCount >= 81 && cigaretteCount <= 99) return "このままだと肺は死にます";
    if (cigaretteCount === 100) return "肺は死にました";
    return ""; // デフォルト値
  };

return(
  <div style={{ textAlign: "center", padding: "50px"}}>
    <h1>タバコカウント</h1>
    <p>吸った本数:{cigaretteCount}</p>
    <p>ステータス: {getStatus()}</p>
    <button onClick={handleAddCigarette}>+</button>
    <button onClick={handleRemoveCigarette} disabled={cigaretteCount === 0}>-</button>

<h2>日付を選択</h2>
<Calendar
  onChange={setDate}
  value={date}
/>
<p>選択された日付: {date.toLocaleDateString()}</p>

<button onClick={() => saveCigaretteCount(cigaretteCount)}>保存</button>
<button onClick={deleteCigaretteCount} disabled={cigaretteCount === 0}>削除</button>
  </div>
);
}

export default App;