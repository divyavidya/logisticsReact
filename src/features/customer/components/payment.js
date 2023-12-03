import { useNavigate } from "react-router";

function PaymentComponent(){
    const navigate =useNavigate();
    return(
        <div>
            <h2>Order Placed Successfully</h2>
            <h3>Your Order Id is {localStorage.getItem("oid")}</h3>
            <p style={{ marginTop: "10px", color:"white" }}>
                  Track your Order here{" "}
                  <button
                    className="button_link"
                    onClick={() => navigate("/customer/dashboard?page=track_order")}
                  >
                    Track Order
                  </button>
                </p>
        </div>
    )
}

export default PaymentComponent;