import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
// import openSocket from 'socket.io-client';
import { initiateSocket, disconnectSocket,
  subscribeToChat } from './socket';

function App() {

  // const [newMessage, setMessage] = useState('');

  const [allMessages, setAllMessages] = useState([])

  // const socket = openSocket('http://localhost:5000');

  // socket.on('chat message', (data) => {
  //   setAllMessages([...allMessages, data])
  // })

  // const sendMessage = () => {
  //   console.log('SENT');
  //   socket.emit('chat', newMessage);
  //   setMessage('');
  // }

  useEffect(() => {
    initiateSocket();
    subscribeToChat((err, data) => {
      if(err) return;
      setAllMessages([...allMessages, data])
    });
    return () => {
      disconnectSocket();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        <h2>Chat Messages</h2>
        <div>
          {
            allMessages.map(message => {
              return <div>{message}</div>
            })
          }
        </div>
        {/* <input onChange={(e) => setMessage(e.target.value)} placeholder="type your message .."/>
        <button onClick={() => sendMessage()}>send</button> */}
        </div>
      </header>
    </div>
  );
}


const divStyle = {
  border: "1px solid black",
  height: "250px",
  width: "250px"
};

export default App;
