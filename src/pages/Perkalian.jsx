import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';
import './Perkalian.css';

const ItemTypes = {
  NUMBER: 'number',
  ICON: 'icon',
  OPERATOR: 'operator'
};

// Play sound helper
const playSound = (type) => {
  let src = '/sounds/drop.mp3';
  if (type === 'correct') src = '/sounds/correct.mp3';
  else if (type === 'wrong') src = '/sounds/wrong.mp3';
  
  const audio = new Audio(src);
  audio.play().catch(e => console.log('Audio play failed', e));
};

const soals = [
  { text: "Soal 1:\nIbu membeli 3 keranjang apel. Setiap keranjang berisi 5 apel.\nBerapa jumlah seluruh apel ibu?", answer: 15, op1: 3, op2: 5, operator: 'x' },
  { text: "Soal 2:\nAda 4 mobil parkir. Setiap mobil memiliki 4 roda.\nBerapa jumlah seluruh roda mobil itu?", answer: 16, op1: 4, op2: 4, operator: 'x' },
  { text: "Soal 3:\nAyah menanam 6 baris jagung. Setiap baris ada 5 pohon.\nBerapa jumlah seluruh pohon jagung?", answer: 30, op1: 6, op2: 5, operator: 'x' },
  { text: "Soal 4:\nDi kelas ada 5 meja. Setiap meja dikelilingi 2 kursi.\nBerapa jumlah seluruh kursi di kelas?", answer: 10, op1: 5, op2: 2, operator: 'x' },
  { text: "Soal 5:\nKakak membeli 7 kotak pensil. Setiap kotak berisi 3 pensil.\nBerapa jumlah seluruh pensil kakak?", answer: 21, op1: 7, op2: 3, operator: 'x' }
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

const GridSlot = ({ groupIndex, slotIndex, onDrop, content, isFilled, status }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ICON,
    drop: (item) => onDrop(groupIndex, slotIndex, item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`grid-slot ${isFilled ? 'filled' : ''} ${isOver ? 'highlight' : ''} ${status || ''}`}
    >
       {content && <DraggableGridItem img={content} type="icon" fromId={`${groupIndex}-${slotIndex}`} />}
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

  const type = ['+', '-', '=', 'x', ':'].includes(content) ? 'operator' : 'number';

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

const PerkalianGame = () => {
  useEffect(() => {
    document.title = 'Perkalian | Simatika';
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [zones, setZones] = useState({ zone1: null, zone2: null, zone3: null, zone4: null, zone5: null });
  const [grids, setGrids] = useState({}); // { group0: [null, null...], group1: ... }
  const [validation, setValidation] = useState({});
  const [popup, setPopup] = useState({ show: false, message: '', type: 'text', imageSrc: '' });
  const [showFaq, setShowFaq] = useState(false);

  const question = soals[currentQuestion];

  // Initialize grids when question changes
  useEffect(() => {
    const newGrids = {};
    for (let i = 0; i < question.op1; i++) {
        newGrids[`group${i}`] = Array(question.op2).fill(null);
    }
    setGrids(newGrids);
    setZones({ zone1: null, zone2: null, zone3: null, zone4: null, zone5: null });
    setValidation({});
  }, [currentQuestion]);

  const removeItem = (origin, id) => {
      if (origin === 'grid') {
          // id is like "0-0" (groupIndex-slotIndex)
          const match = id.match(/(\d+)-(\d+)/);
          if (match) {
              const groupIndex = parseInt(match[1]);
              const slotIndex = parseInt(match[2]);
              const groupKey = `group${groupIndex}`;
              
              setGrids(prev => {
                  const newGroup = [...prev[groupKey]];
                  newGroup[slotIndex] = null;
                  return { ...prev, [groupKey]: newGroup };
              });
          }
      } else if (origin === 'equation') {
          setZones(prev => ({ ...prev, [id]: null }));
      }
  };

  const handleDropGrid = (groupIndex, slotIndex, item) => {
    playSound('drop');
    // If moving from another grid slot
    if (item.origin === 'grid' && item.fromId) {
        removeItem('grid', item.fromId);
    }
    
    setGrids(prev => {
      const groupKey = `group${groupIndex}`;
      const newGroup = [...prev[groupKey]];
      newGroup[slotIndex] = item.img;
      return { ...prev, [groupKey]: newGroup };
    });
  };

  const handleDropTrash = (item) => {
      playSound('drop');
      removeItem(item.origin, item.fromId);
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

  const checkResult = () => {
    const val1 = parseInt(zones.zone1);
    const val2 = parseInt(zones.zone3);
    const res = parseInt(zones.zone5);
    const op = zones.zone2;
    const eq = zones.zone4;

    const isZone1Correct = val1 === question.op1;
    const isZone3Correct = val2 === question.op2;
    const isZone5Correct = res === question.answer;
    const isOpCorrect = op === 'x';
    const isEqCorrect = eq === '=';

    // Check grids: All slots must be filled
    let allGridsCorrect = true;
    const gridValidation = {};
    
    Object.keys(grids).forEach(key => {
        const isFull = grids[key].every(slot => slot !== null);
        gridValidation[key] = isFull ? 'correct' : 'incorrect';
        if (!isFull) allGridsCorrect = false;
    });

    const newValidation = {
        zone1: isZone1Correct ? 'correct' : 'incorrect',
        zone2: isOpCorrect ? 'correct' : 'incorrect',
        zone3: isZone3Correct ? 'correct' : 'incorrect',
        zone4: isEqCorrect ? 'correct' : 'incorrect',
        zone5: isZone5Correct ? 'correct' : 'incorrect',
        ...gridValidation
    };

    setValidation(newValidation);

    if (isZone1Correct && isZone3Correct && isZone5Correct && isOpCorrect && isEqCorrect && allGridsCorrect) {
        playSound('correct');
        setPopup({ show: true, message: 'Hebat! Jawabanmu Benar! 🎉', type: 'success' });
    } else {
        playSound('wrong');
        setPopup({ show: true, message: 'Coba lagi ya! Semangat! 💪', type: 'error' });
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

  const toggleFaq = () => {
      setShowFaq(!showFaq);
  };

  const helperImages = [
    { name: 'BOLA', image: '/assets/BOLA.png' },
    { name: 'KELAPA', image: '/assets/KELAPA.png' },
    { name: 'KUE', image: '/assets/KUE.png' },
    { name: 'MANGGA', image: '/assets/MANGGA.png' },
    { name: 'AYAM', image: '/assets/AYAM.png' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="perkalian-bg">
        {/* Header */}
        <div className="header-bar">
           <div className="question-card">
              <button className="nav-arrow" onClick={prevQuestion} disabled={currentQuestion === 0}>
                  &lt;
              </button>
              <div className="question-text">
                  {question.text}
              </div>
              <button className="nav-arrow" onClick={nextQuestion} disabled={currentQuestion === soals.length - 1}>
                  &gt;
              </button>
           </div>
           <Link to="/" className="exit-button">Keluar</Link>
        </div>

        {/* Main Layout */}
        <div className="main-layout">
          {/* Sidebar */}
          <div className="sidebar">
             {helperImages.map((item) => (
               <DraggableIcon key={item.name} type="icon" img={item.image} />
             ))}
          </div>

          {/* Game Center */}
          <div className="game-center">
            {/* Counting Area (Grids) */}
            <div className="counting-area">
              {Object.keys(grids).map((groupKey, groupIndex) => (
                 <div key={groupKey} className="grid-group-wrapper">
                    <div className="group-label">Kelompok {groupIndex + 1}</div>
                    <div className={`grid-group ${validation[groupKey] || ''}`}>
                      {grids[groupKey].map((slot, slotIndex) => (
                        <GridSlot
                          key={slotIndex}
                          groupIndex={groupIndex}
                          slotIndex={slotIndex}
                          content={slot}
                          onDrop={handleDropGrid}
                          status={validation[groupKey]}
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
                <DropZone id="zone5" onDrop={handleDropEquation} content={zones.zone5} className="eq-slot result" status={validation.zone5} />
            </div>

            <div className="action-container">
                <button className="check-button" onClick={checkResult}>Cek Jawaban</button>
            
                <div className="number-strip">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <DraggableNumber key={num} value={num.toString()} type="number" />
                    ))}
                    <DraggableNumber value="x" type="operator" />
                    <DraggableNumber value="=" type="operator" />
                </div>
            </div>

            {/* Bottom Area */}
            <div className="bottom-area">
               <TrashBin onDrop={handleDropTrash} />
               
               <div className="mascot-area">
                   <img src="/KARAKTER2.png" alt="Mascot" className="mascot-img" />
                   <button className="faq-button" onClick={toggleFaq}>?</button>
               </div>
            </div>
          </div>
        </div>

        {/* FAQ Modal */}
        {showFaq && (
            <div className="popup-overlay" onClick={toggleFaq}>
                <div className="popup-content" onClick={e => e.stopPropagation()}>
                    <h2>Cara Bermain</h2>
                    <p>1. Baca soal cerita di atas.</p>
                    <p>2. Tarik gambar buah ke dalam kotak-kotak sesuai jumlah yang diminta.</p>
                    <p>3. Susun angka dan simbol matematika di bawah untuk menjawab soal.</p>
                    <p>4. Tekan tombol "Cek Jawaban" untuk memeriksa jawabanmu.</p>
                    <button onClick={toggleFaq}>Tutup</button>
                </div>
            </div>
        )}

        {/* Result Popup */}
        {popup.show && (
            <div className="popup-overlay">
                <div className="popup-content">
                    <h2>{popup.type === 'success' ? 'Benar!' : popup.type === 'finish' ? 'Selesai!' : 'Salah!'}</h2>
                    <p>{popup.message}</p>
                    {popup.imageSrc && <img src={popup.imageSrc} alt="Feedback" />}
                    <button onClick={closePopup}>
                        {popup.type === 'finish' ? 'Main Lagi' : 'Lanjut'}
                    </button>
                </div>
            </div>
        )}
      </div>
    </DndProvider>
  );
};

const Perkalian = () => (
  <DndProvider backend={HTML5Backend}>
    <PerkalianGame />
  </DndProvider>
);

export default Perkalian;
