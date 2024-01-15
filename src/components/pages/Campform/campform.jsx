import React, { useState } from "react";
import "./campform.css";
import supabase from "../../../supabase";

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    campaignType: "",
    budget: "",
    date: "",
    contactNumber: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("CUSTOMER ORIENTED CAMPAIGN")
        .insert([
          {
            cusname: formData.customerName || "",
            camptype: formData.campaignType || "",
            budget: formData.budget || "",
            needdate: formData.date || "",
            cusnum: formData.contactNumber || "", 
          },
        ]);
      alert("Sent successfully");

      console.log("Form Data:", formData);

      if (error) {
        console.error("Error inserting data into Supabase:", error);
      } else {
        console.log("Data inserted successfully:", data);
      }
      setFormData({
        customerName: "",
        campaignType: "",
        budget: "",
        date: "",
        contactNumber: "", 
      });
    } catch (error) {
      console.error("Error inserting data into Supabase:", error);
    }
  };

  return (
    <div className="campaign-form-container">
      <h1>Campaign Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="cuscform">Customer Name:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            placeholder="Enter customer name"
          />
        </div>
        <div>
          <label className="cuscform">Campaign Type:</label>
          <select
            id="campaignType"
            name="campaignType"
            value={formData.campaignType}
            onChange={handleChange}
            required
          >
            <option value="">Select Campaign Type</option>
            <option value="treePlantation">Tree Plantation</option>
            <option value="bloodDonation">Blood Donation Campaign</option>
            <option value="beachCleanups">Beach Cleanups</option>
            <option value="Waste Reduction">Waste Reduction</option>
            <option value="homelessoutreach">Homeless Outreach</option>
            <option value="schoolrenovation">School Renovation</option>
          </select>
        </div>
        <div>
          <label className="cuscform">Budget (LKR):</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            placeholder="Enter budget in LKR"
            pattern="\d+(\.\d{1,2})?"
          />
        </div>
        <div>
          <label className="cuscform">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="cuscform">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            placeholder="Enter contact number"
            pattern="[0-9]{10}"
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;
