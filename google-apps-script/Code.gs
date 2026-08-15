/**
 * GOOGLE APPS SCRIPT FOR ANANYA THORAT PORTFOLIO BOOKING ENQUIRIES
 * 
 * Target Spreadsheet ID: 1d1cXPo_BeHc9pcDd6uNaU5ITbSLoELx3ZtuzGSvLh8I
 * Target Owner Email: ananyathorat26@gmail.com
 * 
 * INSTRUCTIONS FOR DEPLOYMENT:
 * 1. Open Google Sheet: https://docs.google.com/spreadsheets/d/1d1cXPo_BeHc9pcDd6uNaU5ITbSLoELx3ZtuzGSvLh8I/edit
 * 2. Click Extensions > Apps Script.
 * 3. Delete any default code and paste this ENTIRE code into Code.gs.
 * 4. Click 'Save' (disk icon).
 * 5. Click 'Deploy' > 'New deployment'.
 * 6. Click gear icon next to 'Select type' -> Choose 'Web app'.
 * 7. Set:
 *    - Description: "Ananya Portfolio Booking Backend"
 *    - Execute as: "Me (ananyathorat26@gmail.com)"
 *    - Who has access: "Anyone"
 * 8. Click 'Deploy', authorize permissions if prompted.
 * 9. Copy the Web App URL (must end in /exec, NOT /dev).
 * 10. Set GOOGLE_APPS_SCRIPT_URL on Netlify Environment Variables.
 */

var SPREADSHEET_ID = "1d1cXPo_BeHc9pcDd6uNaU5ITbSLoELx3ZtuzGSvLh8I";
var OWNER_EMAIL = "ananyathorat26@gmail.com";

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for concurrent requests to complete
  try {
    lock.waitLock(10000);
  } catch (err) {
    return createJsonResponse({
      success: false,
      error: "Server busy. Please try again."
    });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        success: false,
        error: "Empty request payload received."
      });
    }

    var data = JSON.parse(e.postData.contents);

    // 1. Validate mandatory fields
    var clientName = (data.clientName || "").toString().trim();
    var email = (data.email || "").toString().trim();
    var eventType = (data.eventType || "").toString().trim();
    var bookingId = (data.bookingId || "").toString().trim();
    var organization = (data.organization || "Not Specified").toString().trim();
    var eventDate = (data.eventDate || "TBD").toString().trim();
    var city = (data.city || "Not Specified").toString().trim();
    var audienceSize = (data.audienceSize || "Not Specified").toString().trim();
    var notes = (data.notes || "None").toString().trim();

    if (!clientName || !email || !eventType || !bookingId) {
      return createJsonResponse({
        success: false,
        bookingId: bookingId,
        sheetSaved: false,
        ownerEmailSent: false,
        visitorEmailSent: false,
        error: "Missing required fields (Name, Email, Event Type, or Booking ID)."
      });
    }

    var timestamp = new Date().toISOString();

    // 2. Open Spreadsheet & Sheet
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getActiveSheet();

    // Create Headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Booking ID",
        "Name",
        "Email",
        "Organization",
        "Event Format",
        "Tentative Date",
        "City / Location",
        "Audience Size",
        "Special Requirements",
        "Status"
      ]);
      // Format header row bold
      sheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#F0E6E8");
    }

    // 3. Append Row
    sheet.appendRow([
      timestamp,
      bookingId,
      clientName,
      email,
      organization,
      eventType,
      eventDate,
      city,
      audienceSize,
      notes,
      "New"
    ]);

    var sheetSaved = true;

    // 4. Send Owner Email Notification
    var ownerEmailSent = false;
    try {
      var ownerSubject = "New Anchor Booking Brief — " + clientName;
      var ownerBody = 
        "NEW ANCHOR BOOKING BRIEF\n\n" +
        "A new hosting enquiry has been submitted through Ananya Thorat's portfolio website.\n\n" +
        "CONTACT DETAILS\n" +
        "----------------------------------------\n" +
        "Name: " + clientName + "\n" +
        "Email: " + email + "\n" +
        "Organization: " + organization + "\n\n" +
        "EVENT DETAILS\n" +
        "----------------------------------------\n" +
        "Event Format: " + eventType + "\n" +
        "Tentative Date: " + eventDate + "\n" +
        "City / Location: " + city + "\n" +
        "Audience Size: " + audienceSize + "\n\n" +
        "SPECIAL REQUIREMENTS\n" +
        "----------------------------------------\n" +
        "Notes: " + notes + "\n\n" +
        "SUBMISSION DETAILS\n" +
        "----------------------------------------\n" +
        "Booking ID: " + bookingId + "\n" +
        "Submitted At: " + timestamp + "\n" +
        "Status: New\n\n" +
        "Reply directly to this email to contact the requester.";

      MailApp.sendEmail({
        to: OWNER_EMAIL,
        replyTo: email,
        subject: ownerSubject,
        body: ownerBody
      });

      ownerEmailSent = true;
    } catch (mailErr) {
      Logger.log("Owner email failed: " + mailErr.toString());
    }

    // 5. Send Visitor Confirmation Email
    var visitorEmailSent = false;
    try {
      var visitorSubject = "Your Anchor Booking Brief Has Been Received — Ananya Thorat";
      var visitorBody =
        "Hello " + clientName + ",\n\n" +
        "Thank you for reaching out to Ananya regarding your upcoming event!\n\n" +
        "Your anchor booking brief has been successfully received.\n\n" +
        "HERE ARE THE DETAILS SUBMITTED:\n" +
        "----------------------------------------\n" +
        "Event Format: " + eventType + "\n" +
        "Organization: " + organization + "\n" +
        "Tentative Date: " + eventDate + "\n" +
        "Location: " + city + "\n" +
        "Audience Size: " + audienceSize + "\n" +
        "Special Requirements: " + notes + "\n\n" +
        "Reference ID: " + bookingId + "\n\n" +
        "Ananya will review your event details and get back to you shortly regarding date availability and next steps.\n\n" +
        "Please note: This enquiry serves as an initial brief and does not confirm the event date until availability is formally confirmed.\n\n" +
        "Warm regards,\n\n" +
        "Ananya Thorat\n" +
        "Professional Event Anchor • Host • MC • Public Speaker\n" +
        "ananyathorat26@gmail.com";

      MailApp.sendEmail({
        to: email,
        replyTo: OWNER_EMAIL,
        subject: visitorSubject,
        body: visitorBody
      });

      visitorEmailSent = true;
    } catch (mailErr2) {
      Logger.log("Visitor email failed: " + mailErr2.toString());
    }

    return createJsonResponse({
      success: sheetSaved && ownerEmailSent && visitorEmailSent,
      bookingId: bookingId,
      sheetSaved: sheetSaved,
      ownerEmailSent: ownerEmailSent,
      visitorEmailSent: visitorEmailSent
    });

  } catch (err) {
    Logger.log("Apps Script Error: " + err.toString());
    return createJsonResponse({
      success: false,
      error: "Google Apps Script internal processing error: " + err.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
