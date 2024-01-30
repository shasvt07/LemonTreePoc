import express from 'express';
import { bookingidSearch, bookingnameSearch,addDetails, editBookingDeatails, getDetails} from '../controllers/bookings.js';
import {scanAdhaarBack, scanAdhaarFront} from '../controllers/scanAdhaar.js';
import { createOrder, verifyPayment } from '../controllers/razorpay.js';
import { maximumMatching } from '../controllers/maximumMatching.js';
import { scanVoterIdBack, scanVoterIdFront} from '../controllers/ScanVoterId.js';
import { scanPassport } from '../controllers/scanPassport.js';
import { scanDl } from '../controllers/scanDl.js';

const router = express.Router();


router.get("/search/id",bookingidSearch);
router.get("/search/name",bookingnameSearch);
router.post('/newDetails',addDetails);
router.get('/getDetails',getDetails);
router.patch('/editBookings',editBookingDeatails);
router.post('/makePayment', createOrder);
router.get('/verifyPayment', verifyPayment);
router.post('/maximumMatch',maximumMatching);

//Scaneing Routes
router.post("/AdhaarScanfront",scanAdhaarFront);
router.patch("/AdhaarScanback",scanAdhaarBack);
router.post("/VoterIdScanfront",scanVoterIdFront);
router.patch("/VoterIdScanback",scanVoterIdBack);
router.post('/PassportScan', scanPassport);
router.post("/DlScan",scanDl);
router.patch('/VisaScan',scanDl);




export default router;
