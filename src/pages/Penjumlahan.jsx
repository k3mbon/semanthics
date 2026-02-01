import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';
import './Penjumlahan.css';
import SuccessFeedback from '../components/SuccessFeedback';

const ItemTypes = {
  NUMBER: 'number',
  ICON: 'icon',
  OPERATOR: 'operator'
};

const playSound = (type) => {
  // Placeholder for audio integration
  // const audio = new Audio(`/assets/sounds/${type}.mp3`);
  // audio.play().catch(() => {});
  console.log(`[Audio] Playing ${type}`);
};

const soals = [
  { text: "Soal 1:\nAni memiliki 5 buah mangga. Lalu, ibu membelikan 3 buah mangga lagi.\nBerapa jumlah mangga yang dimiliki Ani sekarang?", answer: 8, op1: 5, op2: 3, operator: '+' },
  { text: "Soal 2:\nBudi memiliki 7 bola. Ia mendapat 5 bola lagi dari temannya.\nBerapa jumlah bola yang dimiliki Budi sekarang?", answer: 12, op1: 7, op2: 5, operator: '+' },
  { text: "Soal 3:\nIbu membuat 4 kue. Lalu kakak membawa 4 kue lagi.\nBerapa jumlah kue sekarang?", answer: 8, op1: 4, op2: 4, operator: '+' },
  { text: "Soal 4:\nPak tani memetik 6 kelapa. Kemudian ia memetik 3 kelapa lagi.\nBerapa jumlah kelapa sekarang?", answer: 9, op1: 6, op2: 3, operator: '+' },
  { text: "Soal 5:\nDi kandang ada 5 ayam. Paman membeli 5 ayam lagi.\nBerapa jumlah ayam sekarang?", answer: 10, op1: 5, op2: 5, operator: '+' }
];

const DraggableGridItem = ({ img, type, fromId }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.ICON,
        item: { type, img, fromId, origin: 'grid' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    
    return (
        <img 
            ref={drag} 
            src={img} 
            alt={type} 
            className="grid-item-img" 
            style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }} 
        />
    );
};

const GridSlot = ({ id, onDrop, content, isFilled, status }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ICON,
    drop: (item) => onDrop(id, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`grid-slot ${isFilled ? 'filled' : ''} ${isOver ? 'highlight' : ''} ${status || ''}`}
    >
       {content && <DraggableGridItem img={content} type="icon" fromId={id} />}
    </div>
  );
};

const DraggableIcon = ({ type, img }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.ICON,
        item: { type, img, origin: 'sidebar' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} className="sidebar-icon" style={{ opacity: isDragging ? 0.5 : 1 }}>
            <img src={img} alt={type} />
        </div>
    );
};

const DraggableEquationItem = ({ value, type, fromId }) => {
     const [{ isDragging }, drag] = useDrag(() => ({
        type: type === 'operator' ? ItemTypes.OPERATOR : ItemTypes.NUMBER,
        item: { value, type, fromId, origin: 'equation' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div 
            ref={drag} 
            style={{ 
                opacity: isDragging ? 0.5 : 1, 
                cursor: 'grab', 
                width: '100%', 
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {value}
        </div>
    );
};

const DraggableNumber = ({ value, type, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type === 'operator' ? ItemTypes.OPERATOR : ItemTypes.NUMBER,
    item: { value, type, origin: 'number-strip' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`draggable-number ${type === 'operator' ? 'operator-btn' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={onClick}
      data-value={value} // Added for CSS targeting
    >
      {value}
    </div>
  );
};

const DropZone = ({ id, onDrop, content, className, status }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.NUMBER, ItemTypes.OPERATOR],
    drop: (item) => onDrop(id, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [onDrop, id]); // Added dependencies to ensure fresh props

  const type = ['+', '-', '=', ':'].includes(content) ? 'operator' : 'number';

  return (
    <div
      ref={drop}
      className={`dropzone ${className} ${isOver ? 'dragover' : ''} ${status || ''}`}
      id={id}
    >
      {content && <DraggableEquationItem value={content} type={type} fromId={id} />}
    </div>
  );
};

const PenjumlahanGame = () => {
  useEffect(() => {
    document.title = 'Penjumlahan | Semanthics';
  }, []);

  const [zones, setZones] = useState({
    zone1: null, zone2: null, zone3: null, zone4: null, zone5: null,
  });

  const [grids, setGrids] = useState({
      group1: Array(10).fill(null),
      group2: Array(10).fill(null)
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'text', imageSrc: '' });
  const [showFaq, setShowFaq] = useState(false);
  const [validation, setValidation] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
      setZones({ zone1: null, zone2: null, zone3: null, zone4: null, zone5: null });
      setGrids({ group1: Array(10).fill(null), group2: Array(10).fill(null) });
      setValidation({});
      setPopup({ show: false, message: '', type: 'text', imageSrc: '' });
      setShowSuccess(false);
  }, [currentQuestion]);

  const removeItem = (origin, id) => {
      if (origin === 'grid') {
          // id is like "g1-0"
          const match = id.match(/g(\d+)-(\d+)/);
          if (match) {
              const groupNum = match[1];
              const idx = parseInt(match[2]);
              const groupName = `group${groupNum}`;
              setGrids(prev => {
                  const newGroup = [...prev[groupName]];
                  newGroup[idx] = null;
                  return { ...prev, [groupName]: newGroup };
              });
          }
      } else if (origin === 'equation') {
          // id is zoneId
          setZones(prev => ({ ...prev, [id]: null }));
      }
  };

  const handleDropEquation = (zoneId, item) => {
    const currentVal = zones[zoneId];
    const incomingVal = item.value;
    
    // Check if both are numbers (or numeric strings) to enable combining
    const isIncomingNumber = item.type === 'number' || (!isNaN(incomingVal) && !['+', '-', '=', 'x', ':'].includes(incomingVal));
    const isCurrentNumber = currentVal !== null && !isNaN(currentVal) && !['+', '-', '=', 'x', ':'].includes(currentVal);

    let newValue = incomingVal;
    
    // Combine logic: if dropping a number onto a number, append it
    if (currentVal && isIncomingNumber && isCurrentNumber) {
        const combined = String(currentVal) + String(incomingVal);
        if (combined.length <= 2) {
            newValue = combined;
        } else {
            // Prevent invalid combination (more than 2 digits)
            return;
        }
    }

    playSound('drop');
    // Remove from source if moving
    if (item.origin === 'equation' && item.fromId !== zoneId) {
        removeItem('equation', item.fromId);
    }
    setZones((prev) => ({ ...prev, [zoneId]: newValue }));
  };
  
  const handleDropGrid = (groupName, index, item) => {
      playSound('drop');
      // If moving from another grid slot
      if (item.origin === 'grid' && item.fromId) {
          removeItem('grid', item.fromId);
      }
      
      setGrids(prev => {
          const newGroup = [...prev[groupName]];
          newGroup[index] = item.img; 
          return { ...prev, [groupName]: newGroup };
      });
  };

  const [{ isOverTrash }, dropTrash] = useDrop(() => ({
    accept: [ItemTypes.ICON, ItemTypes.NUMBER, ItemTypes.OPERATOR],
    drop: (item) => {
        playSound('trash');
        removeItem(item.origin, item.fromId);
    },
    collect: (monitor) => ({ isOverTrash: !!monitor.isOver() }),
  }));

  const checkResult = () => {
     const question = soals[currentQuestion];
     const val1 = parseInt(zones.zone1);
     const val2 = parseInt(zones.zone3);
     const res = parseInt(zones.zone5);
     
     const count1 = grids.group1.filter(Boolean).length;
     const count2 = grids.group2.filter(Boolean).length;

     const isZone1Correct = val1 === question.op1;
     const isZone3Correct = val2 === question.op2;
     const isZone5Correct = res === question.answer;

     const isGroup1Correct = count1 === question.op1;
     const isGroup2Correct = count2 === question.op2;

     const newValidation = {
         zone1: isZone1Correct ? 'correct' : 'incorrect',
         zone3: isZone3Correct ? 'correct' : 'incorrect',
         zone5: isZone5Correct ? 'correct' : 'incorrect',
         group1: isGroup1Correct ? 'correct' : 'incorrect',
         group2: isGroup2Correct ? 'correct' : 'incorrect'
     };
     setValidation(newValidation);

     if (isZone1Correct && isZone3Correct && isZone5Correct && 
         isGroup1Correct && isGroup2Correct) {
         playSound('success');
         setShowSuccess(true);
         setPopup({ show: true, message: 'Benar! Luar biasa!', type: 'success' });
     } else {
         playSound('error');
         let msg = 'Masih ada yang salah, ayo coba lagi!';
         if (!isGroup1Correct) msg = `Jumlah benda di kotak 1 harus ${question.op1}`;
         else if (!isGroup2Correct) msg = `Jumlah benda di kotak 2 harus ${question.op2}`;
         else if (!isZone1Correct) msg = `Angka pertama harus ${question.op1}`;
         else if (!isZone3Correct) msg = `Angka kedua harus ${question.op2}`;
         else if (!isZone5Correct) msg = `Jawaban harus ${question.answer}`;
         
         setPopup({ show: true, message: msg, type: 'text' });
     }
  };

  return (
    <div className="penjumlahan-bg">
      {/* Header */}
      <div className="header-bar">
         <div className="question-card">
             <button className="nav-arrow" onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}>◀</button>
             <div className="question-text">{typeof soals[currentQuestion] === 'string' ? soals[currentQuestion] : soals[currentQuestion].text}</div>
             <button className="nav-arrow" onClick={() => setCurrentQuestion(Math.min(soals.length - 1, currentQuestion + 1))}>▶</button>
         </div>
         <Link to="/" className="exit-button">Keluar</Link>
      </div>

      <div className="main-layout">
          {/* Sidebar */}
          <div className="sidebar">
              {['MANGGA', 'BOLA', 'KUE', 'KELAPA', 'AYAM'].map(item => (
                  <DraggableIcon key={item} type={item} img={`/penjumlahan/assets/${item}.png`} />
              ))}
          </div>

          {/* Center Game Area */}
          <div className="game-center">
              {/* Counting Grids */}
              <div className="counting-area">
                  <div className="grid-group">
                      {grids.group1.map((content, i) => (
                          <GridSlot key={`g1-${i}`} id={`g1-${i}`} onDrop={(id, item) => handleDropGrid('group1', i, item)} content={content} isFilled={!!content} status={validation.group1} />
                      ))}
                  </div>
                  <div className="operator-display">+</div>
                  <div className="grid-group">
                      {grids.group2.map((content, i) => (
                          <GridSlot key={`g2-${i}`} id={`g2-${i}`} onDrop={(id, item) => handleDropGrid('group2', i, item)} content={content} isFilled={!!content} status={validation.group2} />
                      ))}
                  </div>
              </div>

              {/* Equation Bar */}
              <div className="equation-bar">
                  <DropZone id="zone1" onDrop={handleDropEquation} content={zones.zone1} className="eq-slot" status={validation.zone1} />
                  <div className="static-operator">+</div>
                  <DropZone id="zone3" onDrop={handleDropEquation} content={zones.zone3} className="eq-slot" status={validation.zone3} />
                  <div className="static-operator">=</div>
                  <DropZone id="zone5" onDrop={handleDropEquation} content={zones.zone5} className="eq-slot" status={validation.zone5} />
              </div>

              <div className="action-container">
                  <button className="check-button" onClick={checkResult}>KOREKSI</button>
              
                  <div className="number-strip">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                          <DraggableNumber key={num} value={num} type="number" />
                      ))}
                  </div>
              </div>

              {/* Bottom Area moved inside game-center to allow sidebar to be full height */}
              <div className="bottom-area">
                  <div ref={dropTrash} className={`trash-bin ${isOverTrash ? 'hover' : ''}`}></div>

                  <div className="mascot-area">
                     <img src="/KARAKTER2.png" alt="Mascot" className="mascot-img" />
                     <button className="faq-button" onClick={() => setShowFaq(true)}>FAQ</button>
                  </div>
              </div>
          </div>
      </div>

      {/* Popups */}
      <SuccessFeedback show={showSuccess} />
      {popup.show && (
        <div className="popup-overlay">
           <div className="popup-content">
               {popup.type === 'image' ? <img src={popup.imageSrc} alt="" /> : <p>{popup.message}</p>}
               <button onClick={() => setPopup({ ...popup, show: false })}>Tutup</button>
           </div>
        </div>
      )}
      
       {/* FAQ Modal */}
      {showFaq && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-2xl p-6 rounded-xl shadow-xl relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold"
              onClick={() => setShowFaq(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Video Panduan Penggunaan</h2>
            <video controls className="w-full rounded-xl shadow-md">
              <source src="/PANDUAN SIMATIKA.mp4" type="video/mp4" />
              Browser Anda tidak mendukung pemutaran video.
            </video>
          </div>
        </div>
      )}

    </div>
  );
};

const Penjumlahan = () => (
  <DndProvider backend={HTML5Backend}>
    <PenjumlahanGame />
  </DndProvider>
);

export default Penjumlahan;
