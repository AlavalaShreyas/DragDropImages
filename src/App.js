import React, {useEffect, useState} from 'react';
import './App.css';

import DragDropImages from './components/DragDropImages'

const defaultData = [
  {title: 'group 1', items: ['https://image.shutterstock.com/image-photo/photo-colosseum-rome-one-seven-600w-147995549.jpg', 'https://image.shutterstock.com/image-photo/sphinx-pyramid-giza-egypt-great-600w-119776192.jpg', 'https://image.shutterstock.com/image-photo/one-seven-wonders-world-taj-600w-116155459.jpg']},
  {title: 'group 2', items: ['https://image.shutterstock.com/image-photo/rio-de-janeiro-brazil-january-600w-554845918.jpg', 'https://image.shutterstock.com/image-photo/great-wall-china-jinshanling-beijing-600w-549526375.jpg']},
  {title: 'group 3', items: ['https://image.shutterstock.com/image-photo/machu-picchu-peru-unesco-world-600w-1027477753.jpg', 'https://image.shutterstock.com/image-photo/petra-by-night-show-jordan-600w-1336847372.jpg']}
]

function App() {
  const [data, setData] = useState();  
  useEffect(() => {
    if (localStorage.getItem('List')) {
      console.log(localStorage.getItem('List'))
      setData(JSON.parse(localStorage.getItem('List')))
    } else {
      setData(defaultData)
    }
  }, [setData])
  return (
    <div className="App">
      <header className="App-header">
      <DragDropImages data={data} />
      </header>
    </div>
  );
}

export default App;
