var kkXML; // XML mit Krankenkassen Daten
var rechnerXML; // XML mit Gehaltsrechner Daten
var defaultKinderlos = 1;
var kinderlosArr = []; // contains the pflegeversicherungbeitragssaetze
kinderlosArr[0] = [];
kinderlosArr[1] = [];
var defaultKKId = "aok-bw"; // Krankenkasse ID to be choosen by default
var defaultWohnortBundesland = "keine"; // Keine Kirchensteuer - Kein Wohnortbundesland
var bundeslaender = [];
var kirchensteuersaetze = [];
var commaPrecision = 5;
slikcalc.precision = commaPrecision;

$(document).ready(function() {
	
	readURLParameters();
	addBindings();
	
	initializeDaten();
	initializeKrankenkassen();
});

function readURLParameters() {
	
	var urlKK = getUrlVar("kk");
	if (urlKK.length != 0)
		defaultKKId = urlKK;
		
	var urlBruttogehalt = getUrlVar("bruttogehalt");
	if (urlBruttogehalt.length != 0) {
		$('#bruttogehalt').val(urlBruttogehalt);
		$('#netto_bruttogehalt').text(urlBruttogehalt);
		lohnsteuerberechnen();
	}
	
	var urlKinderlos = getUrlVar("kinderlos");
	if (urlKinderlos.length != 0 && (urlKinderlos == 1 || urlKinderlos == 0)) {
		defaultKinderlos = urlKinderlos;
	}
	
	var urlKirchensteuer = getUrlVar("kirchensteuer");
	if (urlKirchensteuer.length != 0) {
		defaultWohnortBundesland = urlKirchensteuer;
	}
}

function addBindings() {
	
	var typingTimer;                //timer identifier for the lohnsteuerberechnung
	var doneTypingInterval = 2500;  //time in ms, 2,5 seconds
	
	$('#bruttogehalt').bind('keyup', function(event) {
		typingTimer = setTimeout(lohnsteuerberechnen, doneTypingInterval);
		// clean on changes
		$('#lohnsteuerbeitrag').text("0");
		$('#kirchensteuerbeitrag').text("0");
		
		// mirror the value
		$('#netto_bruttogehalt').text($(this).val());
	});
	$('#bruttogehalt').keydown(function(){
		clearTimeout(typingTimer);
	});
	//$('#bruttogehalt').bind('DOMCharacterDataModified', function(event) {
	//});
	$('#kvbeitrag_arbeitnehmer').bind('DOMSubtreeModified', function(event) { // mirror the value
		$('#netto_kvbeitrag_arbeitnehmer').text($('#kvbeitrag_arbeitnehmer').text());
	});
	$('#rvbeitrag_arbeitnehmer').bind('DOMSubtreeModified', function(event) { // mirror the value
		$('#netto_rvbeitrag_arbeitnehmer').text($('#rvbeitrag_arbeitnehmer').text());
	});
	$('#alvbeitrag_arbeitnehmer').bind('DOMSubtreeModified', function(event) { // mirror the value
		$('#netto_alvbeitrag_arbeitnehmer').text($('#alvbeitrag_arbeitnehmer').text());
	});
	$('#pvbeitrag_arbeitnehmer').bind('DOMSubtreeModified', function(event) { // mirror the value
		$('#netto_pvbeitrag_arbeitnehmer').text($('#pvbeitrag_arbeitnehmer').text());
	});
	$('#lohnsteuerbeitrag').bind('DOMSubtreeModified', function(event) { // mirror the value
		$('#lohnsteuerbeitrag_arbeitnehmer').text($('#lohnsteuerbeitrag').text());
	});
	$('#lohnsteuerbeitrag_arbeitnehmer').bind('DOMSubtreeModified', function(event) { // mirror the value
		$('#netto_lohnsteuerbeitrag_arbeitnehmer').text($('#lohnsteuerbeitrag_arbeitnehmer').text());
	});
	$('#kirchensteuerbeitrag').bind('DOMSubtreeModified', function(event) { // mirror the value
		$('#kirchensteuerbeitrag_arbeitnehmer').text($('#kirchensteuerbeitrag').text());
	});
	$('#kirchensteuerbeitrag_arbeitnehmer').bind('DOMSubtreeModified', function(event) { // mirror the value
		$('#netto_kirchensteuerbeitrag_arbeitnehmer').text($('#kirchensteuerbeitrag_arbeitnehmer').text());
	});
	$('#umlageu1beitrag').bind('DOMSubtreeModified', function(event) { // mirror the value
		$('#umlageu1beitrag_arbeitgeber').text($('#umlageu1beitrag').text());
	});
	$('#umlageu2beitrag').bind('DOMSubtreeModified', function(event) { // mirror the value
		$('#umlageu2beitrag_arbeitgeber').text($('#umlageu2beitrag').text());
	});
	$('#nettogehalt_berechnung').bind('DOMSubtreeModified', function(event) { // mirror the value
		var bruttogehalt = $('#bruttogehalt').val();
		var netto_kvbeitrag_arbeitnehmer = $('#netto_kvbeitrag_arbeitnehmer').text();
		var netto_rvbeitrag_arbeitnehmer = $('#netto_rvbeitrag_arbeitnehmer').text();
		var netto_alvbeitrag_arbeitnehmer = $('#netto_alvbeitrag_arbeitnehmer').text();
		var netto_pvbeitrag_arbeitnehmer = $('#netto_pvbeitrag_arbeitnehmer').text();
		var netto_lohnsteuerbeitrag_arbeitnehmer = $('#netto_lohnsteuerbeitrag_arbeitnehmer').text();
		var netto_kirchensteuerbeitrag_arbeitnehmer = $('#netto_kirchensteuerbeitrag_arbeitnehmer').text();
		
		var nettogehalt = bruttogehalt - netto_kvbeitrag_arbeitnehmer - netto_rvbeitrag_arbeitnehmer - netto_alvbeitrag_arbeitnehmer - netto_pvbeitrag_arbeitnehmer - netto_lohnsteuerbeitrag_arbeitnehmer - netto_kirchensteuerbeitrag_arbeitnehmer;
		nettogehalt = nettogehalt.toFixed(commaPrecision);
		$('#nettogehalt_arbeitnehmer').text(nettogehalt);
	});
	$('#insolvenzbeitrag').bind('DOMSubtreeModified', function(event) {
		$('#insolvenzbeitrag_arbeitgeber').text($('#insolvenzbeitrag').text()); // mirror the value
	});
	$('#krankenkassen').bind('change', function(event) {
		var selectedOption = $('#krankenkassen').find(":selected");
		var kkId = selectedOption.val();
		var kkName = selectedOption.text();
		var kkXMLSelectedEl = kkXML[kkId];
		//$("#textoutput").text($("#textoutput").text() + ":C:");
		if (kkXMLSelectedEl == undefined) {
			alert("Die Umlagedaten für die ausgewählte Krankenkasse mit ID "+kkId+" wurden nicht geladen.");
		} else {
			updateKrankenkassename(kkXMLSelectedEl, kkName);
			$('#umlagesatzU1CheckBox_1').trigger('click');
			$('#umlagesatzU1CheckBox_1').trigger('click');
		}
	});
	$('#krankenkassen').bind('change', function(event) {
		var selectedOption = $('#krankenkassen').find(":selected");
		var kkId = selectedOption.val();
		var kkName = selectedOption.text();
		// ...
	});
	$("input:radio[name=kinderlos]").click(function(event) {
		var selectedKinderlos = $(this).attr("value");
		updateKinderlosdaten(selectedKinderlos);
	});
	$('input:radio[name=umlagesatz_u1]').change(function() {
		selectedUmlageU1($(this));
	});
}

function getUrlVar(key){
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
	return result && unescape(result[1]) || ""; 
}

function lohnsteuerberechnen() {
	
	//$("#textoutput").text($("#textoutput").text() + "-lohnsteuerberechnen-");
	
	$('#lohnsteuerbeitrag').text("0");
	$('#kirchensteuerbeitrag').text("0");
	// The PHP script uses this interface: https://www.abgabenrechner.de/interface/
	var bruttogehaltvalue = document.getElementById("bruttogehalt").value;			
	$.ajax({
		type: "GET",
		url: "lohnsteuer.php",
		data: "RE4=" + bruttogehaltvalue,
		dataType: "text",
		success: function(data){
			$('#lohnsteuerbeitrag').text(data);
			var selectedWohnortBundesland = $('#wohnort').find(":selected");
			var bundesLandId = selectedWohnortBundesland.val();
			updateKirchensteuerdaten(bundesLandId);
		},
		error:function (result) {
			alert("Service call failed: " + result.status + ", " + result.statusText);
		}
	});
}

function initializeDaten() {

	var wohnortElement = $('#wohnort');
	wohnortElement.append("<option value='keine'>Keine Kirchensteuer</option>");
	
	$.ajax({
		type: "GET",
		url: "public/data/gehaltsrechnerdaten.xml",
		dataType: "xml",
		success: function(data) {
			rechnerXML = $(data);
			
			// set KV-Beitragssätze
			rechnerXML.find('krankenversicherung beitragsatz').each(function(){
				var gesamt = $(this).attr("gesamt");
				var arbeitgeber = $(this).attr("arbeitgeber");
				var arbeitnehmer = $(this).attr("arbeitnehmer");
				
				$('#kvbeitragsatz').text(gesamt);
				$('#kvbeitragsatz_arbeitgeber').text(arbeitgeber);
				$('#kvbeitragsatz_arbeitnehmer').text(arbeitnehmer);
				slikcalc.gehaltsrechner.KVFormulaCalc.calculate();
				slikcalc.gehaltsrechner.KVANFormulaCalc.calculate();
				slikcalc.gehaltsrechner.KVAGFormulaCalc.calculate();
			});
			
			// set RV-Beitragssätze
			rechnerXML.find('rentenversicherung beitragsatz').each(function(){
				var gesamt = $(this).attr("gesamt");
				var arbeitgeber = $(this).attr("arbeitgeber");
				var arbeitnehmer = $(this).attr("arbeitnehmer");
				
				$('#rvbeitragsatz').text(gesamt);
				$('#rvbeitragsatz_arbeitgeber').text(arbeitgeber);
				$('#rvbeitragsatz_arbeitnehmer').text(arbeitnehmer);
				slikcalc.gehaltsrechner.RVFormulaCalc.calculate();
				slikcalc.gehaltsrechner.RVANFormulaCalc.calculate();
				slikcalc.gehaltsrechner.RVAGFormulaCalc.calculate();
			});
			
			// set ALV-Beitragssätze
			rechnerXML.find('arbeitslosenversicherung beitragsatz').each(function(){
				var gesamt = $(this).attr("gesamt");
				var arbeitgeber = $(this).attr("arbeitgeber");
				var arbeitnehmer = $(this).attr("arbeitnehmer");
				
				$('#alvbeitragsatz').text(gesamt);
				$('#alvbeitragsatz_arbeitgeber').text(arbeitgeber);
				$('#alvbeitragsatz_arbeitnehmer').text(arbeitnehmer);
				slikcalc.gehaltsrechner.ALVFormulaCalc.calculate();
				slikcalc.gehaltsrechner.ALVANFormulaCalc.calculate();
				slikcalc.gehaltsrechner.ALVAGFormulaCalc.calculate();
			});
			
			// set PV-Beitragssätze
			rechnerXML.find('pflegeversicherung beitragsatz').each(function(){
				var kinderlos = $(this).attr("kinderlos");
				var gesamt = $(this).attr("gesamt");
				var arbeitgeber = $(this).attr("arbeitgeber");
				var arbeitnehmer = $(this).attr("arbeitnehmer");
				
				// save the data
				kinderlosArr[kinderlos]["gesamt"] = gesamt;
				kinderlosArr[kinderlos]["arbeitgeber"] = arbeitgeber;
				kinderlosArr[kinderlos]["arbeitnehmer"] = arbeitnehmer;
				
				if (kinderlos == defaultKinderlos) {
					// $("input:radio[name=kinderlos]:eq("+kinderlos+")").click();
					$("#kinderlos"+kinderlos+"").click();
				}
			});
			
			// set Insolvenzbeitragsatz
			rechnerXML.find('umlagen insolvenzgeldumlage').each(function(){
				var insolvenzbeitragsatz = $(this).attr("beitragsatz");
				$('#insolvenzbeitragsatz').text(insolvenzbeitragsatz);
				slikcalc.gehaltsrechner.InsolvenzFormulaCalc.calculate();
			});
			
			// Save Bundeslaender
			rechnerXML.find('bundeslaender bundesland').each(function(){
				var bundesLandId = $(this).attr("id");
				var bundesLandName = $(this).attr("name");
				bundeslaender[bundesLandId] = bundesLandName;
			});
			
			// Save Kirchensteuersaetze and show Bundeslaender
			rechnerXML.find('kirchensteuer bundesland').each(function(){
				var bundesLandId = $(this).attr("id");
				var kirchensteuersatz = $(this).find('kirchensteuersatz').text();
				kirchensteuersaetze[bundesLandId] = kirchensteuersatz;
				wohnortElement.append("<option value='"+bundesLandId+"'>"+bundeslaender[bundesLandId]+"</option>");
			
				if (bundesLandId == defaultWohnortBundesland) {
					wohnortElement.val(bundesLandId);
					updateKirchensteuerdaten(bundesLandId);
				}
			});
		},
		error:function (result) {
			alert("Die Rechnerdaten konnten nicht abgerufen werden: " + result.status + ", " + result.statusText);
		}
	});
}

function initializeKrankenkassen() {
	$.ajax({
		type: "GET",
		url: "public/data/umlagesaetze.xml",
		dataType: "xml",
		success: function(data) {
			//var xmlstr = data.xml ? data.xml : (new XMLSerializer()).serializeToString(data);
			//alert("succ = " + xmlstr);
			kkXML = $(data);
			kkXML.find('krankenkasse').each(function(){
				var kkId = $(this).attr("id");
				var kkName = $(this).attr("name");
				kkXML[kkId] = $(this);
				$('#krankenkassen').append("<option value='"+kkId+"'>"+kkName+"</option>");
				if (kkId == defaultKKId) {
					$('#krankenkassen').val(defaultKKId);
					updateKrankenkassename($(this), kkName);
					$('#umlagesatzU1CheckBox_1').trigger('click');
					$('#umlagesatzU1CheckBox_1').trigger('click');
				}
			});
		},
		error:function (result) {
			alert("Die Umlagesätze konnten nicht abgerufen werden: " + result.status + ", " + result.statusText);
		}
	});
}

function updateKinderlosdaten(kinderlos) {
	// get the data
	var gesamt = kinderlosArr[kinderlos]["gesamt"];
	var arbeitgeber = kinderlosArr[kinderlos]["arbeitgeber"];
	var arbeitnehmer = kinderlosArr[kinderlos]["arbeitnehmer"];
	
	// update the UI
	$('#pvbeitragsatz').text(gesamt);
	$('#pvbeitragsatz_arbeitgeber').text(arbeitgeber);
	$('#pvbeitragsatz_arbeitnehmer').text(arbeitnehmer);
	slikcalc.gehaltsrechner.PVFormulaCalc.calculate();
	slikcalc.gehaltsrechner.PVANFormulaCalc.calculate();
	slikcalc.gehaltsrechner.PVAGFormulaCalc.calculate();
}

function updateKirchensteuerdaten(bundesLandId) {
	$('#wohnortbundesland').text(bundeslaender[bundesLandId]);
	var kirchensteuersatz = kirchensteuersaetze[bundesLandId]
	$('#kirchensteuersatz').text(kirchensteuersatz);
	
	if(bundesLandId == "keine") {
		$('#kirchensteuerbeitrag').text("0");
	} else {
		var lohnsteuerbeitrag = parseFloat($('#lohnsteuerbeitrag').text());
		if (lohnsteuerbeitrag > 0) {
			var kirchensteuerbeitrag = ((kirchensteuersatz / 100) * lohnsteuerbeitrag).toFixed(commaPrecision);
			kirchensteuerbeitrag = (Math.floor(kirchensteuerbeitrag*100))/100; // floor it
			kirchensteuerbeitrag = kirchensteuerbeitrag.toFixed(commaPrecision); // two decimals after comma
			$('#kirchensteuerbeitrag').text(kirchensteuerbeitrag);
		} else {
			$('#kirchensteuerbeitrag').text("0");
		}
	}
}

function updateKrankenkassename(kkXmlObj, kkName) {

	//$("#textoutput").text($("#textoutput").text() + "-"+kkName+"-");
	
	// update names
	$('.krankenkasse_name').each(function() {
		var url = kkXmlObj.find('umlagesaetze').attr("url");
		if (url != undefined) {
			$(this).text("");
			$(this).append("<a href='"+url+"' target='_blank'>"+kkName+"</a>");
		} else {
			$(this).text(kkName);
		}
	});
	
	
	// add umlagesaetze U1
	var count = 0;
	kkXmlObj.find('umlagesatzU1').each(function(){
		count++;
		if (count == 4) {
			$('#umlagesatzU1_Choice4').css("display", "inline");
		}
		var umlageWert = $(this).attr("wert");
		var umlageErstattung = $(this).attr("erstattung");
		
		$('#umlagesatzU1Wert_'+count).text(umlageWert);
		$('#umlagesatzU1Erstattung_'+count).text(umlageErstattung);
	});
	if (count == 3) {
		$('#umlagesatzU1_Choice4').css("display", "none");
	}

	// add umlagesaetze U2
	kkXmlObj.find('umlagesatzU2').each(function(){
		var umlageWert = $(this).attr("wert");
		var umlageErstattung = $(this).attr("erstattung");
		
		$('#umlagesatzU2Wert').text(umlageWert);
		$('#umlagesatzU2Erstattung').text(umlageErstattung);
		slikcalc.gehaltsrechner.UmlageU2FormulaCalcRows.calculate();
	});
	
}

function selectedUmlageU1(thisObj) {
	var selectedUmlageU1Id = $(this).attr("id");
	var idNumber = selectedUmlageU1Id.charAt(selectedUmlageU1Id.length-1);
	var umlagesatz = $('#umlagesatzU1Wert_'+idNumber).text();
}