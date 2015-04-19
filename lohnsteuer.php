<?php
header('Access-Control-Allow-Origin: http://github.io');
header('Access-Control-Allow-Origin: http://nikolayhg.github.io');
header('Access-Control-Allow-Origin: http://nikolay-georgiev.net');
header('Access-Control-Allow-Origin: http://opensourceecology.de');

// Implementation of this interface https://www.bmf-steuerrechner.de/interface/

// RE4: Steuerpflichtiger Arbeitslohn
$RE4 = $_GET["RE4"];
$RE4 = $RE4."00"; // add the two 00 after the comma

// LZZ: 1 = Jahr, 2 = Monat, 3 = Woche, 4 = Tag
$LZZ = $_GET["LZZ"];
if ($LZZ != 1 && $LZZ!= 2 && $LZZ!=3 && $LZZ!=4) $LZZ = 2;

// STKL: Steuerklasse

$url = "http://www.bmf-steuerrechner.de/interface/2015.jsp?LZZ=".$LZZ."&RE4=".$RE4."&STKL=1";
$xml = simpleXML_load_file($url);

$lohsteuer_result_xml = $xml->xpath('//ausgabe [@name="LSTLZZ"]');
$soli_result_xml = $xml->xpath('//ausgabe [@name="SOLZLZZ"]');

$lohsteuer_result = $lohsteuer_result_xml[0]['value'];
$soli_result = $soli_result_xml[0]['value'];

if ($lohsteuer_result != 0) {
    $lohnsteuer = substr($lohsteuer_result, 0, -2).".". substr($lohsteuer_result, -2);
    $soli = substr($soli_result, 0, -2).".". substr($soli_result, -2);
	echo $lohnsteuer . ";" . $soli;
} else {
	echo 0;
}
?>