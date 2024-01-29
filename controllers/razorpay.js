import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";
// import qrCode from "razorpay/dist/types/qrCode";
import  QRCode  from "qrcode";



var razorpay = new Razorpay({
    key_id: process.env.Razorpay_Key_Id,
    key_secret: process.env.Razorpay_Key_Secret,
  });

export const createOrder = async (req, res) => {
    try{
        const qr = await razorpay.qrCode.create({
            type: "upi_qr",
            name: "Store Front Display",
            usage: "single_use",
            fixed_amount: true,
            payment_amount: 100,
            description: "For Store 1",
            customer_id: "cust_NPluoDkhqm9nel",
            close_by: parseInt(Date.now()/1000)+1000,
            notes: {
              purpose: "Test UPI QR Code notes"
            }
          })
          console.log(qr);
          const qrCode = await QRCode.toDataURL(qr.image_url);
        console.log(qrCode);
        res.status(200).json({qrCodeId:qr.id,qrCodeUrl:qr.image_url});
    }catch(error){
        console.log(error)
        res.status(400).json({message:error.message});
    }
    
}

export const verifyPayment = async (req, res) => {
    try{
        const {qrCodeId} = req.query;
        const temp = await razorpay.qrCode.fetch(qrCodeId)
        console.log(temp);
        if(temp.payments_count_received > 0)
            res.status(200).json(true);
        else 
            res.status(200).json(false);

    }catch(error){
        res.status(400).json({message:error.message});
    }
}

