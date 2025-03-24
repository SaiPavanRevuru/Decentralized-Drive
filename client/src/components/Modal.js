import { useEffect } from "react";
import "./Modal.css";
const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };
  useEffect(() => {
    const accessList = async () => {
      try {
        const addressList = await contract.shareAccess();
  
        // ✅ Remove duplicates
        const uniqueAddresses = [...new Set(addressList)];
  
        let select = document.querySelector("#selectNumber");
  
        // ✅ Ensure the <select> element is cleared before adding new ones
        select.replaceChildren(); // Better alternative to innerHTML = ''
  
        // ✅ Add default option first
        let defaultOption = document.createElement("option");
        defaultOption.textContent = "People With Access";
        defaultOption.value = "";
        select.appendChild(defaultOption);
  
        // ✅ Append unique addresses
        uniqueAddresses.forEach((opt) => {
          let e1 = document.createElement("option");
          e1.textContent = opt;
          e1.value = opt;
          select.appendChild(e1);
        });
  
        console.log("Fetched addresses:", uniqueAddresses); // Debugging
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
  
    if (contract) {
      accessList();
    }
  }, [contract]); // Runs only when `contract` changes

  console.log("Fetched addresses from contract:", contract.shareAccess());
  
  
  
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;