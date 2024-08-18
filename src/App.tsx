import { useState } from 'react';
import './App.css';
import { Card } from './components/Card/Card';
import { useFoodData } from './hooks/useFoodDta';
import { FoodData } from './interfaces/FoodData';
import { CreateModal } from './components/CreateModal/CreateModal';
import { Spinner } from 'react-bootstrap';

function App() {
  const { data, isLoading } = useFoodData(); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  }

  return (
    <div className="container">
      <h1>Cardápio</h1>

      {isLoading ? ( 
        <Spinner animation="border" />
      ) : (
        <div className="card-grid">
          {data?.map((foodData: FoodData) =>
            <Card
              key={foodData.title} 
              price={foodData.price}
              title={foodData.title}
              image={foodData.image}
            />
          )}
        </div>
      )}

      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      <button onClick={handleOpenModal}>Novo</button>
    </div>
  );
}

export default App;
