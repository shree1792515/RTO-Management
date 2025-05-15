
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();



const sendlicenceEmail = async (recipientEmail,holderName,licenseType,issueDate ,expiryDate,licencenumber,dateOfBirth) => {
    try {
        console.log(process.env.EMAIL,process.env.PASSWORD);
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "jayashreesivajothi17@gmail.com",
                pass: "cirx pnjb xgdh ctfj",
            }

        })

        const emailcontent =  `
        <p>Dear Admin/Officer,</p>
        <p>A new license application has been submitted with the following details:</p>
        <ul>
            <li><strong>Licence Number:</strong> ${licencenumber}</li>
            <li><strong>Holder Name:</strong> ${holderName}</li>
            <li><strong>License Type:</strong> ${licenseType}</li>
            <li><strong>Date of Birth:</strong> ${dateOfBirth}</li>
            <li><strong>Issue Date:</strong> ${issueDate}</li>
            <li><strong>Expiry Date:</strong> ${expiryDate}</li>
        </ul>
        <p>Please review and take necessary action.</p>
        <p>Regards,<br>License Application System</p>
    `

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'New License Application Submitted',
            html: emailcontent
        })

        console.log("Email sent successfully to Admin and Officer.");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}



const sendVehicleregisterationEmail = async (recipientEmail,ownerName,vehicleType,model ,brand,yearOfManufacture,color,registrationNumber) => {
    try {
     
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "jayashreesivajothi17@gmail.com",
                pass: "cirx pnjb xgdh ctfj",
            }

        })

        const emailcontent =  
 `
        <p>Dear Admin/Officer,</p>
        <p>A new vehicle has been registered and is pending approval:</p>
        <ul>
            <li><strong>Owner Name:</strong> ${ownerName}</li>
            <li><strong>Vehicle Type:</strong> ${vehicleType}</li>
            <li><strong>Registration Number:</strong> ${registrationNumber}</li>
            <li><strong>Model:</strong> ${model}</li>
            <li><strong>Brand:</strong> ${brand}</li>
            <li><strong>Year of Manufacture:</strong> ${yearOfManufacture}</li>
            <li><strong>Color:</strong> ${color}</li>
        </ul>
        <p>Please review and take the necessary action.</p>
        <p>Regards,<br> Vehicle Registration System</p>
        `
        

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'New Vehicle Registration Request',
            html: emailcontent
        })

        console.log("Email sent successfully to Admin and Officer.");

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}





module.exports = {

    sendlicenceEmail,sendVehicleregisterationEmail

}