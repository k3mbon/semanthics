import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';
import { validateSubtraction } from '../utils/mathOperations';
import './Pengurangan.css';

/**
 * Item types for Drag and Drop functionality
 * @enum {string}
 */
const ItemTypes = {
  NUMBER: 'number',
  ICON: 'icon',
  OPERATOR: 'operator'
};

/**
 * Plays a sound effect based on the type provided.
 * @param {string} type - The type of sound to play ('success', 'error', 'drop').
 */
const playSound = (type) => {
  // Placeholder for audio integration
  // const audio = new Audio(type === 'success' ? '/sounds/correct.mp3' : type === 'error' ? '/sounds/wrong.mp3' : '/sounds/drop.mp3');
  // audio.play().catch(e => console.log('Audio play failed', e));
  console.log(`[Audio] Playing ${type}`);
};

const soals = [
  { text: "Soal 1:\nDoni memiliki 10 bola. Ia memberikan 4 bola kepada temannya.\nBerapa bola yang masih dimiliki Doni?", answer: 6, op1: 10, op2: 4, operator: '-' },
  { text: "Soal 2:\nSeorang peternak memiliki 8 ayam. Ia menjual 3 ayam ke pasar.\nBerapa ayam yang masih ada di kandang?", answer: 5, op1: 8, op2: 3, operator: '-' }, // Adjusted to < 10 for better visual fit with reference
  { text: "Soal 3:\nWayan memetik 9 kelapa dari pohon. Ia membagikan 5 kelapa kepada tetangganya.\nBerapa kelapa yang masih dimilikinya?", answer: 4, op1: 9, op2: 5, operator: '-' }, // Adjusted
  { text: "Soal 4:\nIbu membuat 10 kue. 7 kue diberikan ke tamu.\nBerapa kue yang masih tersisa di meja?", answer: 3, op1: 10, op2: 7, operator: '-' }, // Adjusted
  { text: "Soal 5:\nMade membawa 7 mangga ke pasar. Ia berhasil menjual 2 mangga.\nBerapa mangga yang belum terjual?", answer: 5, op1: 7, op2: 2, operator: '-' } // Adjusted
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

const TrashBin = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.ICON, ItemTypes.NUMBER, ItemTypes.OPERATOR],
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`trash-bin ${isOver ? 'hover' : ''}`}>
    </div>
  );
};

/**
 * Main Game Component for Subtraction (Pengurangan).
 * 
 * Implements a Drag-and-Drop interface for learning subtraction.
 * Features:
 * - Visual counting aid with two groups of grids (Minuend and Subtrahend representation).
 * - Equation builder using drag-and-drop numbers.
 * - Validation using the comprehensive math utility.
 * - Responsive design for tablet/mobile.
 */
const PenguranganGame = () => {
  useEffect(() => {
    document.title = 'Pengurangan | Semanthics';
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = soals[currentQuestion];

  // Dynamic grid size based on question, max 10 for visuals if possible, but support more
  const gridSize = Math.max(10, question.op1); 

  const [zones, setZones] = useState({
    zone1: null, zone2: null, zone3: null, zone4: null, zone5: null,
  });

  const [grids, setGrids] = useState({
      group1: Array(gridSize).fill(null),
      group2: Array(gridSize).fill(null)
  });

  const [popup, setPopup] = useState({ show: false, message: '', type: 'text', imageSrc: '' });
  const [showFaq, setShowFaq] = useState(false);
  const [validation, setValidation] = useState({});

  useEffect(() => {
      const size = Math.max(10, soals[currentQuestion].op1);
      setZones({ zone1: null, zone2: null, zone3: null, zone4: null, zone5: null });
      setGrids({ group1: Array(size).fill(null), group2: Array(size).fill(null) });
      setValidation({});
      setPopup({ show: false, message: '', type: 'text', imageSrc: '' });
  }, [currentQuestion]);

  const removeItem = (origin, id) => {
      if (origin === 'grid') {
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

  const handleDropTrash = (item) => {
      playSound('drop'); // Use drop sound for trash as well or specific trash sound
      removeItem(item.origin, item.fromId);
  };

  /**
   * Validates the current state of the game against the correct answer.
   * Checks both the counting grids and the equation numbers.
   * Uses the comprehensive math utility for result validation.
   */
  const checkResult = () => {
     const val1 = parseInt(zones.zone1);
     const val2 = parseInt(zones.zone3);
     const res = parseInt(zones.zone5);
     
     const count1 = grids.group1.filter(Boolean).length;
     const count2 = grids.group2.filter(Boolean).length;

     // Basic validations for operands matching the question
     const isZone1Correct = val1 === question.op1;
     const isZone3Correct = val2 === question.op2;

     // Use the comprehensive validation utility for the result
     // This ensures that even if the operands are wrong, the math is checked correctly (though game logic enforces specific operands)
     // Also handles edge cases where parsing might fail
     let isZone5Correct = false;
     if (!isNaN(val1) && !isNaN(val2) && !isNaN(res)) {
         isZone5Correct = validateSubtraction(val1, val2, res) && res === question.answer;
     } else {
         isZone5Correct = false;
     }

     // For subtraction visual logic:
     // Group 1 should have total items (op1)
     // Group 2 should have items to take away (op2)
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
         setPopup({ show: true, message: 'Benar! Luar biasa! 🎉', type: 'success' });
     } else {
         playSound('error');
         let msg = 'Masih ada yang salah, ayo coba lagi! 💪';
         if (!isGroup1Correct) msg = `Kotak 1 harus berisi ${question.op1} benda`;
         else if (!isGroup2Correct) msg = `Kotak 2 harus berisi ${question.op2} benda`;
         else if (!isZone1Correct) msg = `Angka pertama harus ${question.op1}`;
         else if (!isZone3Correct) msg = `Angka kedua harus ${question.op2}`;
         else if (!isZone5Correct) msg = `Jawaban harus ${question.answer}`;
         
         setPopup({ show: true, message: msg, type: 'error' });
     }
  };

  const nextQuestion = () => {
      if (currentQuestion < soals.length - 1) {
          setCurrentQuestion(curr => curr + 1);
      } else {
          setPopup({ show: true, message: 'Selamat! Kamu telah menyelesaikan semua soal! 🌟', type: 'finish' });
      }
  };

  const prevQuestion = () => {
      if (currentQuestion > 0) {
          setCurrentQuestion(curr => curr - 1);
      }
  };

  const closePopup = () => {
      setPopup({ ...popup, show: false });
      if (popup.type === 'success') {
          nextQuestion();
      }
  };

  return (
    <div className="pengurangan-bg">
      {/* Header */}
      <div className="header-bar">
         <div className="question-card">
             <button className="nav-arrow" onClick={prevQuestion} disabled={currentQuestion === 0}>◀</button>
             <div className="question-text">{question.text}</div>
             <button className="nav-arrow" onClick={nextQuestion} disabled={currentQuestion === soals.length - 1}>▶</button>
         </div>
         <Link to="/" className="exit-button">Keluar</Link>
      </div>

      <div className="main-layout">
          {/* Sidebar */}
          <div className="sidebar">
              {['MANGGA', 'BOLA', 'KUE', 'KELAPA', 'AYAM'].map(item => (
                  <DraggableIcon key={item} type={item} img={`/pengurangan/assets/${item}.png`} />
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
                  <div className="operator-display">-</div>
                  <div className="grid-group">
                      {grids.group2.map((content, i) => (
                          <GridSlot key={`g2-${i}`} id={`g2-${i}`} onDrop={(id, item) => handleDropGrid('group2', i, item)} content={content} isFilled={!!content} status={validation.group2} />
                      ))}
                  </div>
              </div>

              {/* Equation Bar */}
              <div className="equation-bar">
                  <DropZone id="zone1" onDrop={handleDropEquation} content={zones.zone1} className="eq-slot" status={validation.zone1} />
                  <div className="static-operator">-</div>
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
          
              {/* Bottom Area */}
              <div className="bottom-area">
                  <TrashBin onDrop={handleDropTrash} />

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
               <p>{popup.message}</p>
               <button onClick={closePopup}>
                   {popup.type === 'success' || popup.type === 'finish' ? 'Lanjut' : 'Tutup'}
               </button>
           </div>
        </div>
      )}
      
       {/* FAQ Modal */}
      {showFaq && (
        <div className="popup-overlay" onClick={() => setShowFaq(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <h2 style={{ marginBottom: '15px' }}>Video Panduan Penggunaan</h2>
            <video controls style={{ width: '100%', borderRadius: '10px' }}>
              <source src="/PANDUAN SIMATIKA.mp4" type="video/mp4" />
              Browser Anda tidak mendukung pemutaran video.
            </video>
            <button onClick={() => setShowFaq(false)}>Tutup</button>
          </div>
        </div>
      )}

    </div>
  );
};

const Pengurangan = () => (
  <DndProvider backend={HTML5Backend}>
    <PenguranganGame />
  </DndProvider>
);

export default Pengurangan;
