import React, { useEffect, useState } from "react";
import "./TransactionForm.css";
import { useNavigate } from "react-router-dom";

const TransactionForm = ({ instance, cleared, onDelete }) => {
  const CustomerModel = {
    customerNumber: "",
    customerName: "",
    customerAddress: "",
    phoneNumber: "",
  };

  const FieldModel = {
    reference: "",
    transferAmount: "",
    transferCurrency: "",
    beneficiaryBank: "",
    beneficiaryAccountNumber: "",
    paymentDetails: "",
    cardDetails: "",
    region: "",
  };

  useEffect(() => {
    if (cleared) {
      setCustomer(CustomerModel);
      setFields(FieldModel);
    }
  }, [cleared]);

  const handleDelete = () => {
    onDelete(instance);
  };

  const [customer, setCustomer] = useState(CustomerModel);
  const [fields, setFields] = useState(FieldModel);
  const [formErrors, setformErrors] = useState({});

  const navigate = useNavigate();

  const getSequenceNumber = () => {
    return Math.floor(Math.random() * 90000) + 10000;
  };

  const generateRef = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const sequenceNumber = getSequenceNumber();

    const reference = `CUS${year}${month}${day}${sequenceNumber}`;

    setFields((prevValues) => ({
      ...prevValues,
      reference: reference,
    }));
  };

  const validateNumberOnly = (value) => /^[0-9]+$/.test(value);
  const validateCharactersOnly = (value) => /^[a-zA-Z\s]+$/.test(value);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({ ...prevCustomer, [name]: value }));
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleCustomerNumberKeyDown = async () => {
    const customerNumber = customer.customerNumber;
    if (customerNumber) {
      try {
        const response = await fetch(
          "https://63e63fd9c8839ccc2854503d.mockapi.io/contacts/transactions"
        );
        const data = await response.json();
        const customer = data.find(
          (customer) => customer.customerNumber === customerNumber
        );
        if (customer) {
          setCustomer((prevValues) => ({
            ...prevValues,
            customerName: customer.customerName,
            customerAddress: customer.customerAddress,
            phoneNumber: customer.phoneNumber,
          }));
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    if (customer.phoneNumber && !validateNumberOnly(customer.phoneNumber)) {
      errors.phoneNumber = "Phone number must contain numbers only";
    }

    if (fields.transferAmount && !validateNumberOnly(fields.transferAmount)) {
      errors.transferAmount = "Transfer amount must contain numbers only";
    }

    if (
      fields.beneficiaryBank &&
      !validateCharactersOnly(fields.beneficiaryBank)
    ) {
      errors.beneficiaryBank = "Beneficiary bank must contain characters only";
    }

    if (
      fields.paymentDetails &&
      !validateCharactersOnly(fields.paymentDetails)
    ) {
      errors.paymentDetails = "Payment details must contain characters only";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    generateRef();

    const errors = validateForm();

    const payload = {
      ...customer,
      ...fields,
    };

    if (fields.region === "Port Mathurin") {
      delete payload.customerAddress;
    }

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(
          "https://63e63fd9c8839ccc2854503d.mockapi.io/contacts/transactions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        console.log(response);
        if (response.ok) {
          navigate("/");
        } else {
          throw new Error("Error submitting the form");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    } else {
      setformErrors(errors);
    }
  };

  return (
    <>
      <div className="buttton-container">
        <button onClick={handleDelete}>Delete this form</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group radio-container">
          <label className="radio-label">
            <input
              type="radio"
              name="type"
              value="new"
              checked={fields.type === "new"}
              onChange={handleFieldChange}
              required
            />
            New
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="type"
              value="existing"
              checked={fields.type === "existing"}
              onChange={handleFieldChange}
              required
            />
            Existing
          </label>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              Reference:
              <input
                type="text"
                name="reference"
                value={fields.reference}
                onChange={handleFieldChange}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Customer Number:
              <input
                type="text"
                name="customerNumber"
                value={customer.customerNumber}
                onChange={handleCustomerChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCustomerNumberKeyDown();
                  }
                }}
                onBlur={handleCustomerNumberKeyDown}
                disabled={fields.type === "new"}
                required={fields.type === "existing"}
              />
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Customer Name:
              <input
                type="text"
                name="customerName"
                value={customer.customerName}
                onChange={handleCustomerChange}
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              Customer Phone Number:
              <input
                type="number"
                name="phoneNumber"
                value={customer.phoneNumber}
                onChange={handleCustomerChange}
                required={fields.type === "existing"}
              />
            </label>
            {formErrors.phoneNumber && (
              <span
                style={{ color: "red", fontSize: "10px" }}
                className="error-message"
              >
                {formErrors.phoneNumber}
              </span>
            )}
          </div>
        </div>

        {fields.region !== "Port Mathurin" && (
          <div className="form-group">
            <label>
              Customer Address:
              <input
                type="text"
                name="customerAddress"
                value={customer.customerAddress}
                onChange={handleCustomerChange}
                required={fields.type === "existing"}
              />
            </label>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>
              Transfer Amount:
              <input
                type="number"
                name="transferAmount"
                value={fields.transferAmount}
                onChange={handleFieldChange}
                required={fields.type === "existing"}
              />
            </label>
            {formErrors.transferAmount && (
              <span
                style={{ color: "red", fontSize: "10px" }}
                className="error-message"
              >
                {formErrors.transferAmount}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>
              Transfer Currency:
              <select
                name="transferCurrency"
                value={fields.transferCurrency}
                onChange={handleFieldChange}
                required={fields.type === "existing"}
              >
                <option value="">Select Currency</option>
                <option value="AED">AED</option>
                <option value="EUR">EUR</option>
                <option value="CHF">CHF</option>
                <option value="MUR">MUR</option>
                <option value="USD">USD</option>
              </select>
            </label>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              Beneficiary Bank:
              <input
                type="text"
                name="beneficiaryBank"
                value={fields.beneficiaryBank}
                onChange={handleFieldChange}
                required={fields.type === "existing"}
              />
            </label>
            {formErrors.beneficiaryBank && (
              <span
                style={{ color: "red", fontSize: "10px" }}
                className="error-message"
              >
                {formErrors.beneficiaryBank}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>
              Beneficiary Account Number:
              <input
                type="text"
                name="beneficiaryAccountNumber"
                value={fields.beneficiaryAccountNumber}
                onChange={handleFieldChange}
                required={fields.type === "existing"}
              />
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Payment Details:
              <input
                type="text"
                name="paymentDetails"
                value={fields.paymentDetails}
                onChange={handleFieldChange}
                required={fields.type === "existing"}
              />
            </label>
            {formErrors.paymentDetails && (
              <span
                style={{ color: "red", fontSize: "10px" }}
                className="error-message"
              >
                {formErrors.paymentDetails}
              </span>
            )}
          </div>
          <div className="form-group">
            <label>
              Debit/Credit Card Details:
              <input
                type="text"
                name="cardDetails"
                value={fields.cardDetails}
                onChange={handleFieldChange}
                required={fields.type === "existing"}
              />
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>
            Region:
            <select
              name="region"
              value={fields.region}
              onChange={handleFieldChange}
              required={fields.type === "existing"}
            >
              <option value="">Select Region</option>
              <option value="Port Louis">Port Louis</option>
              <option value="Curepipe">Curepipe</option>
              <option value="Vacoas">Vacoas</option>
              <option value="Port Mathurin">Port Mathurin</option>
            </select>
          </label>
        </div>
        <div className="buttton-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default TransactionForm;
