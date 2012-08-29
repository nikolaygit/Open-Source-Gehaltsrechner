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
		
		this.setupFormulaCalcRows();
		this.setupChainedCalcs();
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
	}
	
};
slikcalc.gehaltsrechner.initialize();
