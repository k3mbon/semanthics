import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';
import './Pembagian.css';
import SuccessFeedback from '../components/SuccessFeedback';

const ItemTypes = {
  NUMBER: 'number',
  ICON: 'icon',
  OPERATOR: 'operator'
};

const playSound = (type) => {
  // Placeholder for audio integration
  console.log(`[Audio] Playing ${type}`);
};

const soals = [
  { text: "Soal 1:\nAda 8 bola yang akan dibagikan kepada 2 anak sama banyak.\nBerapa bola yang didapat setiap anak?", answer: 4, op1: 8, op2: 2, operator: ':' },
  { text: "Soal 2:\nIbu punya 12 kue. Kue tersebut dimasukkan ke dalam 3 piring sama rata.\nBerapa isi kue di setiap piring?", answer: 4, op1: 12, op2: 3, operator: ':' },
  { text: "Soal 3:\n10 buah mangga dibagikan kepada 5 orang teman.\nBerapa mangga yang diterima setiap teman?", answer: 2, op1: 10, op2: 5, operator: ':' },
  { text: "Soal 4:\nAyah membawa 6 kelapa. Kelapa itu diberikan kepada 3 tetangga.\nBerapa kelapa yang diterima satu tetangga?", answer: 2, op1: 6, op2: 3, operator: ':' },
  { text: "Soal 5:\nAda 10 ayam yang dimasukkan ke dalam 2 kandang sama banyak.\nBerapa ayam di setiap kandang?", answer: 5, op1: 10, op2: 2, operator: ':' }
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
      data-value={value}
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

const PembagianGame = () => {
  useEffect(() => {
    document.title = 'Pembagian | Semanthics';
  }, []);

  const [zones, setZones] = useState({
    zone1: null, zone2: null, zone3: null, zone4: null, zone5: null,
  });

  const [grids, setGrids] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'text', imageSrc: '' });
  const [showFaq, setShowFaq] = useState(false);
  const [validation, setValidation] = useState({});

  useEffect(() => {
      // Initialize grids based on the divisor (op2)
      // op2 determines the number of groups
      // Each group should have enough slots to potentially hold all items (op1) for flexibility
      const question = soals[currentQuestion];
      const newGrids = {};
      for (let i = 0; i < question.op2; i++) {
          newGrids[`group${i}`] = Array(question.op1).fill(null); // Create slots
      }
      
      setGrids(newGrids);
      setZones({ zone1: null, zone2: null, zone3: null, zone4: null, zone5: null });
      setValidation({});
      setPopup({ show: false, message: '', type: 'text', imageSrc: '' });
  }, [currentQuestion]);

  const removeItem = (origin, id) => {
      if (origin === 'grid') {
          // id is like "g0-0" (groupIndex-slotIndex)
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
    if (item.origin === 'equation' && item.fromId !== zoneId) {
        removeItem('equation', item.fromId);
    }
    setZones((prev) => ({ ...prev, [zoneId]: newValue }));
  };
  
  const handleDropGrid = (groupName, index, item) => {
      playSound('drop');
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
     const val1 = parseInt(zones.zone1); // Dividend
     const val2 = parseInt(zones.zone3); // Divisor
     const res = parseInt(zones.zone5);  // Quotient
     const op = zones.zone2;
     
     // Validate Grids
     let allGridsCorrect = true;
     let totalItems = 0;
     const groupCounts = [];
     const newValidation = {};

     Object.keys(grids).forEach(key => {
         const count = grids[key].filter(Boolean).length;
         groupCounts.push(count);
         totalItems += count;
         
         // Each group should have 'answer' number of items
         const isGroupCorrect = count === question.answer;
         newValidation[key] = isGroupCorrect ? 'correct' : 'incorrect';
         if (!isGroupCorrect) allGridsCorrect = false;
     });

     // Validate Equation
     const isZone1Correct = val1 === question.op1;
     const isZone2Correct = op === ':';
     const isZone3Correct = val2 === question.op2;
     const isZone4Correct = zones.zone4 === '=';
     const isZone5Correct = res === question.answer;

     newValidation.zone1 = isZone1Correct ? 'correct' : 'incorrect';
     newValidation.zone2 = isZone2Correct ? 'correct' : 'incorrect';
     newValidation.zone3 = isZone3Correct ? 'correct' : 'incorrect';
     newValidation.zone4 = isZone4Correct ? 'correct' : 'incorrect';
     newValidation.zone5 = isZone5Correct ? 'correct' : 'incorrect';

     setValidation(newValidation);

     if (isZone1Correct && isZone2Correct && isZone3Correct && isZone4Correct && isZone5Correct && allGridsCorrect) {
         playSound('success');
         setShowSuccess(true);
         setPopup({ show: true, message: 'Benar! Luar biasa!', type: 'text' });
     } else {
         playSound('error');
         let msg = 'Masih ada yang salah, ayo coba lagi!';
         
         // Specific feedback
         if (totalItems !== question.op1) {
             msg = `Total benda harus ${question.op1}`;
         } else if (!allGridsCorrect) {
             msg = `Setiap kotak harus berisi ${question.answer} benda sama rata`;
         } else if (!isZone1Correct) msg = `Angka pertama harus ${question.op1}`;
         else if (!isZone2Correct) msg = `Operator harus bagi (:)`;
         else if (!isZone3Correct) msg = `Angka kedua harus ${question.op2}`;
         else if (!isZone5Correct) msg = `Jawaban harus ${question.answer}`;
         
         setPopup({ show: true, message: msg, type: 'text' });
     }
  };

  return (
    <div className="pembagian-bg">
      {/* Header */}
      <div className="header-bar">
         <div className="question-card">
             <button className="nav-arrow" onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}>◀</button>
             <div className="question-text">{soals[currentQuestion].text}</div>
             <button className="nav-arrow" onClick={() => setCurrentQuestion(Math.min(soals.length - 1, currentQuestion + 1))}>▶</button>
         </div>
         <Link to="/" className="exit-button">Keluar</Link>
      </div>

      <div className="main-layout">
          {/* Sidebar */}
          <div className="sidebar">
              {['MANGGA', 'BOLA', 'KUE', 'KELAPA', 'AYAM'].map(item => (
                  <DraggableIcon key={item} type={item} img={`/assets/${item}.png`} />
              ))}
          </div>

          {/* Game Center */}
          <div className="game-center">
              {/* Counting Grids - Dynamic Groups */}
              <div className="counting-area">
                  {Object.keys(grids).map((groupName, groupIndex) => (
                      <div key={groupName} className="grid-group-wrapper">
                          <div className="group-label">Kotak {groupIndex + 1}</div>
                          <div className={`grid-group ${validation[groupName] || ''}`}>
                              {grids[groupName].map((content, i) => (
                                  // Show only first 'answer + 2' slots initially to save space, or all?
                                  // Let's show a reasonable number, e.g., 6 slots, or dynamic.
                                  // For simplicity, showing all but hiding empty ones via CSS if needed, 
                                  // or just show fixed amount. Since op1 max is usually small (<=20), we can show e.g. 10 slots.
                                  // But let's just map all created slots.
                                  // To avoid too many slots, we can limit display or use flex wrap.
                                  <GridSlot 
                                      key={`g${groupIndex}-${i}`} 
                                      id={`g${groupIndex}-${i}`} 
                                      onDrop={(id, item) => handleDropGrid(groupName, i, item)} 
                                      content={content} 
                                      isFilled={!!content} 
                                      status={validation[groupName]} 
                                  />
                              ))}
                          </div>
                      </div>
                  ))}
              </div>

              {/* Equation Bar */}
              <div className="equation-bar">
                  <DropZone id="zone1" onDrop={handleDropEquation} content={zones.zone1} className="eq-slot" status={validation.zone1} />
                  <DropZone id="zone2" onDrop={handleDropEquation} content={zones.zone2} className="eq-slot operator" status={validation.zone2} />
                  <DropZone id="zone3" onDrop={handleDropEquation} content={zones.zone3} className="eq-slot" status={validation.zone3} />
                  <DropZone id="zone4" onDrop={handleDropEquation} content={zones.zone4} className="eq-slot operator" status={validation.zone4} />
                  <DropZone id="zone5" onDrop={handleDropEquation} content={zones.zone5} className="eq-slot" status={validation.zone5} />
              </div>

              <div className="action-container">
                  <button className="check-button" onClick={checkResult}>KOREKSI</button>

                  <div className="number-strip">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                          <DraggableNumber key={num} value={num} type="number" />
                      ))}
                      <DraggableNumber value=":" type="operator" />
                      <DraggableNumber value="=" type="operator" />
                  </div>
              </div>
          
              {/* Bottom Area */}
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
        <div className="faq-modal">
          <div className="faq-content">
            <button className="close-faq" onClick={() => setShowFaq(false)}>&times;</button>
            <h2 className="faq-title">Video Panduan Penggunaan</h2>
            <video controls className="faq-video">
              <source src="/assets/PANDUAN SIMATIKA2.mp4" type="video/mp4" />
              Browser Anda tidak mendukung pemutaran video.
            </video>
          </div>
        </div>
      )}

    </div>
  );
};

const Pembagian = () => (
  <DndProvider backend={HTML5Backend}>
    <PembagianGame />
  </DndProvider>
);

export default Pembagian;
