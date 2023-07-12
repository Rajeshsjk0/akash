import React, { useState } from "react";

import "./NewTransaction.css";
import TransactionForm from "../../components/transactionForm/TransactionForm";

const NewTransaction = () => {
  const [formInstances, setFormInstances] = useState([{ id: 1 }]);

  const handleDeleteForm = (id) => {
    const updatedInstances = formInstances.filter(
      (formInstance) => formInstance.id !== id
    );
    setFormInstances(updatedInstances);
  };

  const handleAddForm = () => {
    setFormInstances((prevInstances) => {
      const lastId = prevInstances[prevInstances.length - 1]?.id || 0;
      const newFormInstance = { id: lastId + 1 };
      return [...prevInstances, newFormInstance];
    });
  };

  const handleClearForms = () => {
    setFormInstances((prevInstances) => {
      const clearedInstances = prevInstances.map((instance) => ({
        id: instance.id,
        cleared: true,
      }));
      return clearedInstances;
    });
  };

  return (
    <div className="trasaction-form-container">
      <h2 className="form-header">Transaction Form</h2>

      {formInstances.map((instance, index) => (
        <>
          <div className="button-container">
            <button onClick={handleAddForm}>Add Form</button>
          </div>
          <TransactionForm
            key={instance.id}
            instance={instance}
            cleared={instance.cleared || false}
            onDelete={() => handleDeleteForm(instance.id)}
          />
        </>
      ))}

      <div className="button-container">
        <button onClick={handleClearForms}>Clear All</button>
      </div>
    </div>
  );
};

export default NewTransaction;
