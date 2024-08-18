import { useEffect, useState } from "react";
import { FoodData } from "../../interfaces/FoodData";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import './CreateModal.css';

interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: unknown): void;
}

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input
                value={value}
                onChange={(event) => updateValue(event.target.value)} 
            />
        </>
    );
};

export function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, status } = useFoodDataMutate();

    const onSubmit = () => {
        const foodData: FoodData = {
            title,
            price,
            image,
        };
        mutate(foodData);
    };

    useEffect(() => {
        if(!isSuccess) return;
        closeModal();
        
    },[isSuccess])

    const isLoading = status === "pending";

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-body"> {/* Adicionando a classe modal-body */}
                    <h2>Adicione um novo prato:</h2>
                    <form className="input-container">
                        <Input label="title" value={title} updateValue={setTitle} />
                        <Input label="price" value={price} updateValue={setPrice} />
                        <Input label="image" value={image} updateValue={setImage} />
                    </form>
                    <div className="buttons">
                        <button onClick={onSubmit} className="btn-secondary">
                            {isLoading? 'Criando...' : 'Criar'}
                        </button>
                        <button onClick={closeModal} className="btn-secondary">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
