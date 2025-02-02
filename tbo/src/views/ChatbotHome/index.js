import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon, Mic, Send } from 'lucide-react';
import '../../index.css';
import robot from '../../assets/robot.png';

const ChatbotHome = ({ isRobot = false, isName = true, isdesc = true, useWhere }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  // Generate a random session id (an integer) on first render.
  const [sessionId] = useState(() => Math.floor(Math.random() * 1000000));
  localStorage.setItem('sessionId', sessionId);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom();
    return () => {
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [messages]);

  const resetSilenceTimeout = () => {
    if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
    silenceTimeoutRef.current = setTimeout(() => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }, 4000); // 4 seconds
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        resetSilenceTimeout();
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setUserInput(transcript);
        resetSilenceTimeout();
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        clearTimeout(silenceTimeoutRef.current);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        clearTimeout(silenceTimeoutRef.current);
      };

      recognitionRef.current.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMessages(prev => [
          ...prev,
          { role: 'user', content: 'image', image: e.target.result },
          { role: 'assistant', content: 'I received your image. How can I help you with it?' },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Modified handleSubmit to send a GET request with query parameters.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInput.trim() === '') return;

    // Append the user's message immediately
    setMessages(prev => [...prev, { role: 'user', content: userInput }]);

    try {
      // Build the URL with query parameters
      const chatUrl = `http://127.0.0.1:8000/chat?session_id=${sessionId}&user_input=${userInput}`;
console.log(chatUrl);
const chatResponse = await fetch(chatUrl, { 
  method: 'POST',
});
    console.log(chatResponse);
      
      if (!chatResponse.ok) {
        throw new Error(`Chat API error: ${chatResponse.statusText}`);
      }

      const chatData = await chatResponse.json();
      console.log(chatData)
      // The backend is expected to return:
      //   { complete: true, data: <LLM response> } OR { complete: false, prompt: <prompt> }
      if (chatData.complete) {
        // Append the final assistant response
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: JSON.stringify(chatData.data) }
        ]);
        // Now call /get_hotels using the same session id
        const getHotelUrl = `http://127.0.0.1:8000/get_hotels?session_id=${sessionId}`;
        console.log(getHotelUrl);
        const hotelsResponse = await fetch(getHotelUrl, { method: 'GET' });
        if (!hotelsResponse.ok) {
          throw new Error(`Hotels API error: ${hotelsResponse.statusText}`);
        }
        const hotelsData = await hotelsResponse.json();
        // Navigate to the results page. If using react-router, replace this with your router navigation.
        window.location.href = `/results`;
      } else {
        // Append the prompt (for missing data) to the conversation
        setMessages(prev => [...prev, { role: 'assistant', content: chatData.prompt }]);
      }
    } catch (error) {
      console.error("Error in conversation:", error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Error: ${error.message}` }
      ]);
    }
    setUserInput('');
  };

  return (
    <div className={`relative ${useWhere === "hpg" ? "h-screen" : "h-auto"} transition-all duration-1000 ease-in-out bg-transparent text-black`}>
      {/* Messages Container */}
      <div
        className={`
          transition-all duration-1000 ease-in-out scrollbar-hidden overflow-x-hidden
          ${messages.length === 0 ? 'h-64 flex items-center justify-center'
            : useWhere === 'res' ? 'h-64 overflow-y-auto' : 'h-[75vh] overflow-y-auto'}
        `}
        ref={messagesEndRef}
      >
        {messages.length === 0 ? (
          <div className="h-fit-content w-fit-content flex flex-col items-center justify-center">
            {isName && (
              <p className="typewriter justify-center flex items-center mb-2 font-bold text-5xl bg-gradient-to-r from-orange-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
                Hello, Parth
              </p>
            )}
            {isRobot && <img src={robot} className="w-52 floatii" alt="Robot" />}
            {isdesc && (
              <p className="text-orange-400 font-semibold text-base mt-4">
                Looking for the perfect stay? Let me help you find it!
              </p>
            )}
          </div>
        ) : (
          <ul className="space-y-8">
            {messages.map((message, index) => (
              <li key={index} className={`flex items-center ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role !== 'user' && (
                  <div className="ml-[5%]">
                    <img src="https://www.tbo.com/img/logo.svg" alt="Logo" className="h-4 w-18" />
                  </div>
                )}
                <div className={`rounded-md p-3 flex ${message.role === 'user' ? 'bg-orange-200 max-w-[40%] mr-[2%]' : 'w-full ml-[2%]'}`}>
                  {message.image ? (
                    <img src={message.image} alt="Uploaded content" className="max-w-full h-auto rounded-md" />
                  ) : (
                    message.content
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="mr-[2%]">
                    <img width="32" height="32" src="https://img.icons8.com/dotty/80/228BE6/orange.png" alt="User" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Background SVGs */}
        <div className="absolute top-[10%] left-0 -z-10 opacity-85">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-25 -25 250 250" className="floatii">
            <defs>
              <linearGradient id="lgrad1" x1="100%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" style={{ stopColor: "#ec994b", stopOpacity: 1.0 }} />
                <stop offset="100%" style={{ stopColor: "#f5c470", stopOpacity: 1.0 }} />
              </linearGradient>
            </defs>
            <path
              d="M66.88469686537292 5.642293911404579 C33.59304552336723 9.917136090229278 -5.0697301011537705 91.01810557335367 2.8342231545772023 123.63920070614692 C10.72181988042726 156.192789377297 80.07784772314471 199.97913021654546 113.56120236397675 199.07620193791882 C138.22012765540427 198.41123747408278 189.94756562904342 163.78920954341942 191.99382111594636 139.2063371980508 C195.7890338171972 93.61221175500526 112.26392645480975 -0.18466380537083715 66.88469686537292 5.642293911404579Z"
              stroke="none"
              fill="url(#lgrad1)"
            />
          </svg>
        </div>
        <div className="absolute top-[45%] right-0 -z-10 opacity-85">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-25 -25 250 250" className="floatii">
            <defs>
              <linearGradient id="lgrad2" x1="100%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" style={{ stopColor: "#0087db", stopOpacity: 1.0 }} />
                <stop offset="100%" style={{ stopColor: "#afbfee", stopOpacity: 1.0 }} />
              </linearGradient>
            </defs>
            <path
              d="M144.27063455535458 10.333334420944112 C116.73767245611334 -3.3100586696615935 44.839089474175836 12.660977315483873 23.88798498156396 35.138908659864754 C5.410054819746076 54.96343131021352 -9.43414512784425 123.21622425964148 9.520729822780694 142.58522828631723 C42.62098107490979 176.40865901094614 174.7108229193053 162.9510158056998 197.64891968339123 121.55663435387383 C212.59793503691742 94.57945092678466 171.9059807574762 24.02746184797136 144.27063455535458 10.333334420944112Z"
              stroke="none"
              fill="url(#lgrad2)"
            />
          </svg>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mt-4 mb-2">
        <div className="flex justify-center">
          <div className={`relative flex items-center ${useWhere === "hpg" ? "w-[50%]" : "w-[100%]"} rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden`}>
            {windowWidth >= 768 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-3 hover:bg-gray-100"
              >
                <ImageIcon className="w-5 h-5 text-gray-500" />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question..."
              className="h-fit-content flex-1 py-2 px-3 bg-transparent outline-none text-gray-800 whitespace-nowrap overflow-x-auto resize-none"
            />
            {windowWidth >= 640 && (
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-3 hover:bg-gray-100 ${isListening ? 'text-blue-500' : 'text-gray-500'}`}
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
            <button type="submit" className="p-3 hover:bg-gray-100 rounded-r-full text-gray-500">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatbotHome;
