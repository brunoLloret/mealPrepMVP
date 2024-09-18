import React, { useState, useEffect } from "react";

interface StepPopupProps {
  onClose: () => void;
  onAddStep: (step: string) => void;
  onUpdateStep: (index: number, step: string) => void; // Changed from onEditStep to onUpdateStep
  stepToEdit: { index: number; step: string } | null;
}

const StepPopup: React.FC<StepPopupProps> = ({
  onClose,
  onAddStep,
  onUpdateStep,
  stepToEdit,
}) => {
  const [stepInput, setStepInput] = useState<string>("");

  useEffect(() => {
    if (stepToEdit) {
      setStepInput(stepToEdit.step);
    } else {
      setStepInput("");
    }
  }, [stepToEdit]);

  const handleSubmit = () => {
    if (stepInput.trim() !== "") {
      if (stepToEdit) {
        onUpdateStep(stepToEdit.index, stepInput);
      } else {
        onAddStep(stepInput);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-violet-800 bg-opacity-50 font-mono">
      <div className="bg-lime-100 h-72 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg mb-2">
          {stepToEdit ? "edit step" : "add step"}
        </h3>
        <textarea
          placeholder="describe the step"
          value={stepInput}
          onChange={(e) => setStepInput(e.target.value)}
          className="border border-gray-300 p-2 rounded text-black w-full mb-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white p-2 font-semibold rounded mt-2 w-full"
        >
          {stepToEdit ? "Update Step" : "Add Step"}
        </button>
        <button
          onClick={onClose}
          className="bg-red-400 text-white  font-semibold p-2 rounded mt-2 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StepPopup;
