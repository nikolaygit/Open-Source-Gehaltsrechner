<?php
header('Access-Control-Allow-Origin: http://github.io');
header('Access-Control-Allow-Origin: http://nikolayhg.github.io');
header('Access-Control-Allow-Origin: http://nikolay-georgiev.net');
header('Access-Control-Allow-Origin: http://opensourceecology.de');

// Implementation of this interface https://www.abgabenrechner.de/interface/
$RE4 = $_GET["RE4"];
$RE4 = $RE4."00"; // add the two 00 after the comma

$LZZ = $_GET["LZZ"];
if ($LZZ != 1 && $LZZ!= 2 && $LZZ!=3 && $LZZ!=4) $LZZ = 2;

$url = "http://www.bmf-steuerrechner.de/interface/2015.jsp?LZZ=".$LZZ."&RE4=".$RE4."&STKL=1";
$xml = simpleXML_load_file($url);
$results = $xml->xpath('//ausgabe [@name="LSTLZZ"]');
$lohsteuer_result = $results[0]['value'];

if ($lohsteuer_result != 0) {
	echo substr($lohsteuer_result, 0, -2).".". substr($lohsteuer_result, -2) . "000"; // add 3 zeros at the end to become 5
} else {
	echo 0;
}
?>