import {Injectable, OnInit} from '@angular/core';
import {IProjectEntity} from "../interfaces/IProjectEntity";
import {DatePipe} from "@angular/common";

import * as jsPDF from 'jspdf'
import {LoggingService} from "../../shared/services/logging.service";

@Injectable()
export class PdfService implements OnInit {

  constructor ( private logService: LoggingService ) {
  }

  public ngOnInit () {
  }

  public createContractPDF (contract: IProjectEntity): void {
    this.logService.log("Creating PDF");

    var logo = new Image();
    logo.src = "assets/img/logo.png";

    var pdf = new jsPDF("portrait", "mm", "a4");

    const demandOrg = contract["demand"].ownerOrg.name;
    const offerOrg = contract["offer"].ownerOrg.name;
    const title = contract["demand"].name;
    const contractNr = "Vertrag Nr. " + contract['id'];

    let yPos = 34;
    // Titel
    pdf.setFontSize(24);
    pdf.setFontType("bold");
    pdf.text(title , 70, yPos);

    // Vertr. nr ...
    yPos += 23;
    pdf.setFontSize(16); // scheinbar default
    pdf.text(contractNr , 30, yPos);

    // Zwischen...
    yPos += 15;
    pdf.setFontSize(11);
    pdf.text("Zwischen" , 30, yPos);
    pdf.setFontType("normal");
    pdf.text(demandOrg , 65, yPos);

    // und ...
    yPos += 5;
    pdf.setFontType("bold");
    pdf.setFontSize(11);
    pdf.text("und" , 30, yPos);
    pdf.setFontType("normal");
    pdf.text(offerOrg , 65, yPos);

    // wird folgender Vertrag geschlossen
    yPos += 10;
    pdf.setFontSize(11);
    pdf.text("wird folgender Vertrag geschlossen" , 30, yPos);

    // demand sub-titel
    yPos += 15;
    pdf.setFontSize(11);
    pdf.setFontType("bold");
    pdf.text("Bedarf" , 30, yPos);
    pdf.setFontType("normal");
    pdf.text("(" + demandOrg + ")" , 48, yPos);

    // demand details: name
    yPos += 10;
    const demandDetailsTitle = [];
    demandDetailsTitle.push("Name:");
    demandDetailsTitle.push("Budget:" );
    demandDetailsTitle.push("Priorität:");
    demandDetailsTitle.push("Enddatum:");
    demandDetailsTitle.push("");
    demandDetailsTitle.push("Beschreibung:");

    pdf.setFontType("normal");
    pdf.setFontSize(11);
    pdf.text(demandDetailsTitle , 42, yPos);

    const demandDetails = [];
    demandDetails.push(contract["demand"].name);
    demandDetails.push(contract["demand"].budget);
    demandDetails.push(contract["demand"].priority);

    const endDate = new DatePipe("de-DE").transform( contract["demand"].endDate, "dd.MM.yyyy");
    demandDetails.push(endDate);
    demandDetails.push("");
    demandDetails.push(contract["demand"].description);

    pdf.setFontType("normal");
    pdf.setFontSize(11);
    pdf.text(demandDetails , 72, yPos);

    // offer sub-titel
    yPos += 40;
    pdf.setFontSize(11);
    pdf.setFontType("bold");
    pdf.text("Angebot " , 30, yPos);
    pdf.setFontType("normal");
    pdf.text("(" + offerOrg + ")" , 48, yPos);

    // offer details: name
    yPos += 10;
    const offerDetailsTitle = [];
    offerDetailsTitle.push("Anfangsdatum:");
    offerDetailsTitle.push("Lieferdatum:");
    offerDetailsTitle.push("Preis:");
    offerDetailsTitle.push("Zahlungsart:");
    offerDetailsTitle.push("Vertragstyp:");
    offerDetailsTitle.push("");
    offerDetailsTitle.push("Beschreibung:" );


    pdf.setFontType("normal");
    pdf.setFontSize(11);
    pdf.text(offerDetailsTitle , 42, yPos);

    const offerDetails = [];
    const startDate = new DatePipe("de-DE").transform( contract["offer"].startDate, "dd.MM.yyyy");
    const deliveryDate = new DatePipe("de-DE").transform( contract["offer"].endDate, "dd.MM.yyyy");
    offerDetails.push(startDate);
    offerDetails.push(deliveryDate);
    offerDetails.push(contract["offer"].price);
    offerDetails.push(contract["offer"].paymentType);
    offerDetails.push(contract["offer"].contractType);
    offerDetails.push("");
    offerDetails.push(contract["offer"].description);

    pdf.setFontType("normal");
    pdf.setFontSize(11);
    pdf.text(offerDetails , 72, yPos);

    // Unterschrift
    yPos += 45;
    pdf.setFontType("bold");
    pdf.setFontSize(16);
    pdf.text("Unterschrift" , 30, yPos);

    const signatureTitles = [];
    signatureTitles.push("Datum:");
    signatureTitles.push("Name:");
    signatureTitles.push("Transaktion:");
    signatureTitles.push("");
    signatureTitles.push("");
    signatureTitles.push("Datum:");
    signatureTitles.push("Name:");
    signatureTitles.push("Transaktion:");

    yPos += 10;
    pdf.setFontType("normal");
    pdf.setFontSize(11);
    pdf.text(signatureTitles , 42, yPos);


    const signatureDetails = [];
    const signatureEntry1 = contract["progressHistory"][0]["entries"][0];
    const signatureEntry2 = contract["progressHistory"][0]["entries"][1];

    const signatureDate1 = new DatePipe("de-DE").transform( signatureEntry1.date, "dd.MM.yyyy");
    signatureDetails.push(signatureDate1);
    signatureDetails.push(signatureEntry1['author'].firstName + " " + signatureEntry1['author'].lastName);
    signatureDetails.push(signatureEntry1['transactionId']);

    signatureDetails.push("");
    signatureDetails.push("");

    const signatureDate2 = new DatePipe("de-DE").transform( signatureEntry2.date, "dd.MM.yyyy");
    signatureDetails.push(signatureDate2);
    signatureDetails.push(signatureEntry2['author'].firstName + " " + signatureEntry2['author'].lastName);
    signatureDetails.push(signatureEntry2['transactionId']);

    pdf.text(signatureDetails , 72, yPos);

    logo.onload = function(){
      // imgage has to be loaded before the pdf is created
      pdf.addImage(logo, 'png', 10, 10);

      const fileName = "Vertrag " + contract['id'] + ".pdf";
      pdf.save(fileName);
    };

  }


}
