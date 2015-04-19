Open-Source-Gehaltsrechner
==========================

Open Source Gehaltsrechner

* source for every calculation

IMPORTANT: The source code is from 2012 and does not represent AT ALL the current best practices of Frontend Development!!!


ULR Parameters
==============
You can share the calculation of the salary of a person, just by sending him a link with the appropriate parameters.
For example: http://opensourceecology.de/tools/gehaltsrechner/?bruttogehalt=1350&kinderlos=1&kk=aok-bw&kirchensteuer=bw

The following parameters are supported:
* bruttogehalt -> the brutto salary
* kinderlos -> value 1 if the person has kids and is older than 23 years, otherwise value 0.
* kk -> the id of the health insurance:
  * tk = Techniker Krakenkasse
  * aok-bw = AOK Baden Württemberg
  * securvita = SECURVITA
  * see other ids here: https://github.com/ngeorgiev/Open-Source-Gehaltsrechner/blob/master/public/data/umlagesaetze.xml
* kirchensteuer - only if you pay church taxes
  * id of German state of the residence
    * bw = Baden Württemberg
    * see more ids here: https://github.com/ngeorgiev/Open-Source-Gehaltsrechner/blob/master/public/data/gehaltsrechnerdaten.xml

