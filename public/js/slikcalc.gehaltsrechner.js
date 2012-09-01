slikcalc.gehaltsrechner = {

	KVFormulaCalc : {},
	KVAGFormulaCalc : {},
	KVANFormulaCalc : {},
	
	RVFormulaCalc : {},
	RVAGFormulaCalc : {},
	RVANFormulaCalc : {},
	
	ALVFormulaCalc : {},
	ALVAGFormulaCalc : {},
	ALVANFormulaCalc : {},
	
	PVFormulaCalc : {},
	PVAGFormulaCalc : {},
	PVANFormulaCalc : {},
	
	UmlageU1FormulaCalcRows: {},
	UmlageU2FormulaCalcRows: {},
	
	InsolvenzFormulaCalc : {},
	
	ANNettoFormulaCalc : {},

	initialize : function() {
		this.setupKVFormulaCalc();
		this.setupKVAGFormulaCalc();
		this.setupKVANFormulaCalc();
		
		this.setupRVFormulaCalc();
		this.setupRVAGFormulaCalc();
		this.setupRVANFormulaCalc();
		
		this.setupALVFormulaCalc();
		this.setupALVAGFormulaCalc();
		this.setupALVANFormulaCalc();
		
		this.setupPVFormulaCalc();
		this.setupPVAGFormulaCalc();
		this.setupPVANFormulaCalc();
		
		this.setupUmlageU1FormulaCalcRows();
		this.setupUmlageU2FormulaCalcRows();
		
		this.setupInsolvenzFormulaCalc();
		
		this.setupANNettoFormulaCalc();
	},

	
	// ---------------- KRANKENVERSICHERUNG (KV)---------------------
	setupKVFormulaCalc : function() {
		this.KVFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'kvbeitragsatz' },
				b: { id: 'bruttogehalt'},
				c: { id: 'kvbeitrag'}
			}
		});
	},

	setupKVAGFormulaCalc : function() {
		this.KVAGFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'kvbeitragsatz_arbeitgeber' },
				b: { id: 'bruttogehalt'},
				c: { id: 'kvbeitrag_arbeitgeber'}
			}
		});
	},

	setupKVANFormulaCalc : function() {
		this.KVANFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'kvbeitragsatz_arbeitnehmer' },
				b: { id: 'bruttogehalt'},
				c: { id: 'kvbeitrag_arbeitnehmer'}
			}
		});
	},

	
	// ---------------- RENTENVERSICHERUNG (RV)---------------------
	setupRVFormulaCalc : function() {
		this.RVFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'rvbeitragsatz' },
				b: { id: 'bruttogehalt'},
				c: { id: 'rvbeitrag'}
			}
		});
	},
	
	setupRVAGFormulaCalc : function() {
		this.RVAGFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'rvbeitragsatz_arbeitgeber' },
				b: { id: 'bruttogehalt'},
				c: { id: 'rvbeitrag_arbeitgeber'}
			}
		});
	},
	
	setupRVANFormulaCalc : function() {
		this.RVANFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'rvbeitragsatz_arbeitnehmer' },
				b: { id: 'bruttogehalt'},
				c: { id: 'rvbeitrag_arbeitnehmer'}
			}
		});
	},
	
	// ---------------- ARBEITSLOSENVERSICHERUNG (ALV)---------------------
	setupALVFormulaCalc : function() {
		this.ALVFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'alvbeitragsatz' },
				b: { id: 'bruttogehalt'},
				c: { id: 'alvbeitrag'}
			}
		});
	},
	
	setupALVAGFormulaCalc : function() {
		this.ALVAGFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'alvbeitragsatz_arbeitgeber' },
				b: { id: 'bruttogehalt'},
				c: { id: 'alvbeitrag_arbeitgeber'}
			}
		});
	},
	
	setupALVANFormulaCalc : function() {
		this.ALVANFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'alvbeitragsatz_arbeitnehmer' },
				b: { id: 'bruttogehalt'},
				c: { id: 'alvbeitrag_arbeitnehmer'}
			}
		});
	},
	
	// ---------------- PFLEGEVERSICHERUNG (PV)---------------------
	setupPVFormulaCalc : function() {
		this.PVFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'pvbeitragsatz' },
				b: { id: 'bruttogehalt'},
				c: { id: 'pvbeitrag'}
			}
		});
	},
	
	setupPVAGFormulaCalc : function() {
		this.PVAGFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'pvbeitragsatz_arbeitgeber' },
				b: { id: 'bruttogehalt'},
				c: { id: 'pvbeitrag_arbeitgeber'}
			}
		});
	},
	
	setupPVANFormulaCalc : function() {
		this.PVANFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'pvbeitragsatz_arbeitnehmer' },
				b: { id: 'bruttogehalt'},
				c: { id: 'pvbeitrag_arbeitnehmer'}
			}
		});
	},
	
	// ---------------- INSOLVENZGELDUMLAGE ---------------------
	setupInsolvenzFormulaCalc : function() {
		this.InsolvenzFormulaCalc = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'insolvenzbeitragsatz' },
				b: { id: 'bruttogehalt'},
				c: { id: 'insolvenzbeitrag'}
			}
		});
	},
	
	
	// ---------------- UMLAGE U1 ---------------------
	setupUmlageU1FormulaCalcRows : function() {
		this.UmlageU1FormulaCalcRows = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
			total: { id: 'umlageu1beitrag' },
            registerListeners: true
		});
		this.UmlageU1FormulaCalcRows.addRow({
			vars: {
				a: { id: 'umlagesatzU1Wert_1' },
				b: { id: 'bruttogehalt' },
				c: { id: 'umlageu1beitragxxx'}
			},
			checkbox: {
				id: 'umlagesatzU1CheckBox_1'
			}
		});
		this.UmlageU1FormulaCalcRows.addRow({
			vars: {
				a: { id: 'umlagesatzU1Wert_2' },
				b: { id: 'bruttogehalt' },
				c: { id: 'umlageu1beitragyyy'}
			},
			checkbox: {
				id: 'umlagesatzU1CheckBox_2'
			}
		});
		this.UmlageU1FormulaCalcRows.addRow({
			vars: {
				a: { id: 'umlagesatzU1Wert_3' },
				b: { id: 'bruttogehalt' },
				c: { id: 'umlageu1beitragzzz'}
			},
			checkbox: {
				id: 'umlagesatzU1CheckBox_3'
			}
		});
		this.UmlageU1FormulaCalcRows.addRow({
			vars: {
				a: { id: 'umlagesatzU1Wert_4' },
				b: { id: 'bruttogehalt' },
				c: { id: 'umlageu1beitragwww'}
			},
			checkbox: {
				id: 'umlagesatzU1CheckBox_4'
			}
		});
	},
	
	// ---------------- UMLAGE U2 ---------------------
	setupUmlageU2FormulaCalcRows : function() {
		this.UmlageU2FormulaCalcRows = slikcalc.create('formula', {
			formula: '( ({a} / 100) * {b} )= {c}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'umlagesatzU2Wert' },
				b: { id: 'bruttogehalt'},
				c: { id: 'umlageu2beitrag'}
			}
		});
	},
	
	// ---------------- Netto-Gehalt-Arbeitnehmer ---------------------
	setupANNettoFormulaCalc : function() {
		this.ANNettoFormulaCalc = slikcalc.create('formula', {
			formula: '{a} - {b} - {c} - {d} - {e} - {f} - {g} = {n}',
			calcOnLoad: true,
            registerListeners: true,
			vars: {
				a: { id: 'bruttogehalt' },
				b: { id: 'netto_kvbeitrag_arbeitnehmer'},
				c: { id: 'netto_rvbeitrag_arbeitnehmer'},
				d: { id: 'netto_alvbeitrag_arbeitnehmer'},
				e: { id: 'netto_pvbeitrag_arbeitnehmer'},
				f: { id: 'netto_lohnsteuerbeitrag_arbeitnehmer'},
				g: { id: 'netto_kirchensteuerbeitrag_arbeitnehmer'},
				n: { id: 'nettogehalt_arbeitnehmer'}
			}
		});
	}

};
slikcalc.gehaltsrechner.initialize();
