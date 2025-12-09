import { jsPDF } from "jspdf";
import { DateTime } from "luxon";

export interface EventDetails {
  // The name of the trail. Can be missing.
  trail_name?: string;

  // The date the run will take place.
  // Time is ignored on this property.
  // Assumed to be America/Phoenix timezone.
  // This is separate from time_of_run because it's a separate form field.
  date_of_run?: DateTime;

  // The time of day the run will take place.
  // The date is ignored on this property.
  // Assumed to be America/Phoenix timezone.
  // This is separate from date_of_run because it's a separate form field.
  time_of_run?: DateTime;

  // The meeting location (short address / description)
  meeting_location?: string;

  // A short list/description of required permits.
  // e.g. "state trust", "tonto forest", etc...
  permits_required?: string;

  // Any additional vehicle requirements.
  // e.g. "4x4, rear locker, etc..."
  vehicular_requirements?: string;

  invite?: "members-only" | "open" | "invite-only";
}

// document text
const release_and_covenant =
  "I, the undersigned, acknowledge that Copperstate 4 wheeler trail leaders are not professional drivers and that I MUST BE THE FINAL JUDGE OF THE SAFETY OF ANY ACTIONS THAT I TAKE. I understand that participation in this event involves RISKS AND DANGERS, BOTH KNOWN AND UNKNOWN, of both BODILY INJURY, including PERMANENT DISABILITY, PARALYSIS, DEATH, and property damage. Therefore, in consideration of being hosted by the Copperstate 4 wheelers, I do hereby ASSUME FULL RESPONSIBILITY FOR MY ACTIONS AND ANY SUCH RISKS OF BODILY INJURY OR DEATH TO MYSELF, including property damage, AND RELEASE, REMISE, WAIVE, COVENANT NOT TO SUE, commence, maintain, or prosecute, at law or in equity, any suit thereon against the Copperstate 4wheelers, its Officers and Members of, and FOREVER DISCHARGE from ALL LIABILITY, CLAIMS, ACTIONS AND POSSIBLE CAUSES OF ACTION, WHATSOEVER, that may accrue to me or to my heirs FROM EVERY AND ANY LOSS, DAMAGE, AND/OR INJURY (INCLUDING DEATH) that may be sustained by my person and/or property while in, about, en route to, and on the premises where this event/trail run is being held. I agree that I am participating in this event/trail run at my own risk. I ASSUME FULL RESPONSIBILITY for my actions, any injuries and/or damages that may occur to me, to my property, and to all persons accompanying me. I UNDERSTAND DRUGS AND ALCOHOL WILL NOT BE PERMITTED AT ANY TIME DURING THIS EVENT/TRAIL RUN. I shall adhere to the directions of the trail leader or the assistant trail leader from the beginning of the event/trail run until the trail leader terminates the event/trail run. I understand that my vehicle may be subject to technical inspection, varying, according to the type of event or event/trail run and shall be disqualified if found to be mechanically unsafe, or does not meet the trail requirements set forth by the trail leader. I agree, that myself and any potential driver of my vehicle during this event/trail run will also be required to sign this waiver. I acknowledge that I will adhere to Copperstate 4 Wheelers club rules and bylaws, state laws, common sense, and be a good steward to the environment during this event/trail run. Any actions found to be unsafe or unsatisfactory by the trail leader may result in my dismissal from the event/trail run.";

// document constants
const margin = 1;
const left = margin;
const right = 8.5 - margin;
const underline_offset = 0.05;
const font = "times";

function PageHeader(doc: jsPDF) {
  doc.setFont(font, "normal");
  doc.setFontSize(14);
  doc.text(
    ["Copperstate 4 Wheelers, Inc", "www.copperstate4wheelers.com"],
    8,
    0.75,
    { align: "right" },
  );
}

function BuildDetailsPage(doc: jsPDF) {
  PageHeader(doc);

  // Writes left-aligned text + a full-width underline
  const text_line = (text: string, y: number) => {
    doc.text(text, left, y);
    doc.line(left, y + underline_offset, right, y + underline_offset);
  };

  doc.setFont(font, "normal");
  doc.setFontSize(14);
  doc.setLineWidth(0.0125);

  doc.addImage("/copperstate_logo_small.png", "PNG", 0.5, 0.5, 1.5, 1.5);

  doc.setFont(font, "bold");
  doc.setFontSize(22);
  doc.text("Club Trail Submission Form:", 3.25, 2);

  text_line("Trail Name:", 3);
  text_line("Date Of Run:", 3.5);
  text_line("Meeting Time:", 4);
  text_line("Meeting Location:", 4.5);
  text_line("Permits Required:", 5);
  doc.text("Vehicular Requirements:", left, 5.5);

  doc.text("Members Only:", left, 7.5);
  doc.circle(3.5, 7.35, 0.25);
  doc.text("Open:", 4, 7.5);
  doc.circle(5.35, 7.35, 0.25);
  doc.text("Invite:", 6, 7.5);
  doc.circle(7.5, 7.35, 0.25);

  text_line("President", 8.5);
  text_line("Vice President:", 9);
  text_line("Treasurer:", 9.5);
  text_line("Secretary:", 10.0);
}

function WriteFormDetails(doc: jsPDF, details: EventDetails) {
  // form data
  doc.setFontSize(14);
  doc.setFont(font, "normal");
  if (details.trail_name) {
    doc.text(details.trail_name, 3, 3);
  }
  if (details.date_of_run) {
    doc.text(details.date_of_run.toLocaleString(DateTime.DATE_HUGE), 3, 3.5);
  }
  if (details.time_of_run) {
    doc.text(details.time_of_run.toLocaleString(DateTime.TIME_SIMPLE), 3.5, 4);
  }
  if (details.meeting_location) {
    doc.text(details.meeting_location, 3.5, 4.5);
  }
  if (details.permits_required) {
    doc.text(details.permits_required, 3.5, 5);
  }
  if (details.vehicular_requirements) {
    doc.text(
      doc.splitTextToSize(details.vehicular_requirements, 8.5 - margin * 2),
      margin,
      5.8,
    );
  }

  doc.setFontSize(24).setFont(font, "bold");
  if (details.invite == "members-only") {
    doc.text("X", 3.4, 7.5);
  } else if (details.invite == "open") {
    doc.text("X", 5.25, 7.5);
  } else if (details.invite == "invite-only") {
    doc.text("X", 7.4, 7.5);
  }
}

function BuildSignUpPage(doc: jsPDF) {
  PageHeader(doc);

  const top = margin + 0.5;

  // top of page
  doc.addImage("/asa_logo.png", "PNG", left, top, 1, 1);
  doc.addImage("/copperstate_logo_small.png", "PNG", right - 1, top, 1, 1);
  doc.rect(left + 1.25, margin + 0.25, 8.5 - 2 * (1.25 + margin), 1 + 0.25);

  doc.setFontSize(23);
  doc.text("Copperstate4Wheelers", 8.5 / 2, margin + 0.7, { align: "center" });

  doc.setFontSize(21);
  doc.text("www.copperstate4wheelers.com", 8.5 / 2, margin + 1.2, {
    align: "center",
  });

  // header
  doc.setFontSize(14);
  doc.text(
    "Description: ____________________    Leader: ____________________",
    left,
    top + 1.3,
  );
  doc.text("Date: _______________", left, top + 1.55);

  // content
  doc.setFontSize(16).setFont(font, "bold");
  doc.text("RELEASE and COVENANT", 8.5 / 2, top + 1.9, { align: "center" });
  doc.setFontSize(9).setFont(font, "normal");
  doc.text(
    doc.splitTextToSize(release_and_covenant, 8.5 - 2 * (margin + 0.25)),
    left + 0.25,
    top + 2.1,
  );

  // header
  doc.setFontSize(16).setFont(font, "bold");
  doc.text("Members", 8.5 / 2, 6.9, {
    align: "center",
  });
  {
    const height = 7.3;
    doc.setFontSize(14).setFont(font, "bold");
    doc.text("Name", left + 0.2, height);
    doc.text("Phone Number", left + 1.5, height);
    doc.text("License Plate", left + 3.2, height);
    doc.text("Signature", left + 5, height);
  }

  doc.setFontSize(14).setFont(font, "normal");
  doc.setLineWidth(0.0125);

  {
    const line_start = 7.5;
    const line_step = 0.3;
    for (let i = 0; i < 10; i++) {
      const line = line_start + line_step * i;
      doc.text(`${i + 1}.`, left, line, { align: "right" });
      doc.line(left + 0.1, line + 0.02, right, line + 0.02);
    }
  }

  // page 2
  doc.addPage("letter", "p");
  PageHeader(doc);

  {
    const line_start = 1.5;
    const line_step = 0.3;
    for (let i = 0; i < 6; i++) {
      const line = line_start + line_step * i;
      doc.text(`${i + 11}.`, left, line, { align: "right" });
      doc.line(left + 0.1, line + 0.02, right, line + 0.02);
    }
  }

  doc.setFontSize(16).setFont(font, "bold");
  doc.text("Guests & Passengers", 8.5 / 2, 3.7, {
    align: "center",
  });

  // guest heading
  {
    const height = 4.1;
    doc.setFontSize(14).setFont(font, "bold");
    doc.text("Name", left + 0.2, height);
    doc.text("Phone Number", left + 1.5, height);
    doc.text("License Plate", left + 3.2, height);
    doc.text("Signature", left + 5, height);
  }

  doc.setFontSize(14).setFont(font, "normal");
  {
    const line_start = 4.4;
    const line_step = 0.3;
    for (let i = 0; i < 16; i++) {
      const line = line_start + line_step * i;
      doc.text(`${i + 1}.`, left, line, { align: "right" });
      doc.line(left + 0.1, line + 0.02, right, line + 0.02);
    }
  }
}

/**
 * Builds the complete updated sign-in form.
 **/
export function BuildUpdatedForm(details: EventDetails): jsPDF {
  const doc = new jsPDF("p", "in", "letter");

  BuildDetailsPage(doc);
  WriteFormDetails(doc, details);

  doc.addPage("letter", "p");
  BuildSignUpPage(doc);

  return doc;
}
