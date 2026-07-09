// Mock database for SolarSquad AI Safety Intelligence Platform


export const KPI_STATS = [
  { id: 'workers', label: 'Workers on Floor', value: 142, change: '+12%', type: 'neutral' },
  { id: 'compliance', label: 'PPE Compliance %', value: 98.4, change: '+1.2%', type: 'safe' },
  { id: 'alerts', label: 'Active Alerts', value: 3, change: '-40%', type: 'critical' },
  { id: 'highRisk', label: 'High Risk Zones', value: 2, change: '0', type: 'warning' },
  { id: 'predicted', label: 'Predicted Violations', value: 5, change: '-2', type: 'warning' },
  { id: 'safetyScore', label: 'Overall Safety Score', value: 94, change: '+3%', type: 'safe' },
];

export const ZONES = [
  {
    id: 'assembly',
    name: 'Assembly Line',
    status: 'Safe',
    riskLevel: 'Low',
    currentWorkers: 45,
    complianceRate: 100,
    supervisor: 'Sarah Jenkins',
    requiredPPE: ['Helmet', 'Safety Vest', 'Steel Toe Shoes', 'Safety Glasses'],
    aiStatus: 'Active',
  },
  {
    id: 'paint',
    name: 'Paint Shop',
    status: 'Warning',
    riskLevel: 'Medium',
    currentWorkers: 28,
    complianceRate: 96.4,
    supervisor: 'Marcus Vance',
    requiredPPE: ['Helmet', 'Respirator Mask', 'Safety Vest', 'Chemical Gloves'],
    aiStatus: 'Active',
  },
  {
    id: 'welding',
    name: 'Welding Area',
    status: 'Critical',
    riskLevel: 'High',
    currentWorkers: 18,
    complianceRate: 88.9,
    supervisor: 'David Kovalenko',
    requiredPPE: ['Helmet', 'Welding Shield', 'Fire-Resistant Vest', 'Leather Gloves'],
    aiStatus: 'Active',
  },
  {
    id: 'machine',
    name: 'Machine Shop',
    status: 'Safe',
    riskLevel: 'Medium',
    currentWorkers: 32,
    complianceRate: 97.8,
    supervisor: 'Elena Rostova',
    requiredPPE: ['Helmet', 'Safety Glasses', 'Safety Vest', 'Hearing Protection'],
    aiStatus: 'Active',
  },
  {
    id: 'warehouse',
    name: 'Warehouse',
    status: 'Safe',
    riskLevel: 'Low',
    currentWorkers: 19,
    complianceRate: 100,
    supervisor: 'Tom Redman',
    requiredPPE: ['Helmet', 'Safety Vest', 'Steel Toe Shoes'],
    aiStatus: 'Active',
  },
];

export const ALERTS = [
  {
    id: 'ALT-1049',
    severity: 'Critical',
    timestamp: '16:24:02',
    timeAgo: '10m ago',
    camera: 'CAM-02 (Welding West)',
    zone: 'Welding Area',
    workerId: 'WRK-084',
    workerName: 'Praveen',
    duration: '4m 12s',
    status: 'Pending',
    type: 'Missing Leather Gloves',
    details: 'Worker entered the welding zone and initiated a weld arc without flame-resistant gloves.'
  },
  {
    id: 'ALT-1048',
    severity: 'Warning',
    timestamp: '16:18:15',
    timeAgo: '16m ago',
    camera: 'CAM-03 (Paint Spray Booth)',
    zone: 'Paint Shop',
    workerId: 'WRK-112',
    workerName: 'Hari Priya',
    duration: '12s',
    status: 'Acknowledged',
    type: 'Respirator Mask Not Sealed',
    details: 'Respirator mask loose or improperly secured in high-fume environment.'
  },
  {
    id: 'ALT-1047',
    severity: 'Critical',
    timestamp: '15:45:22',
    timeAgo: '49m ago',
    camera: 'CAM-01 (Assembly East)',
    zone: 'Assembly Line',
    workerId: 'WRK-029',
    workerName: 'Joshua',
    duration: '1m 30s',
    status: 'Resolved',
    type: 'Restricted Area Intrusion',
    details: 'Unauthorized entry into robotic cell during operation cycle.'
  },
  {
    id: 'ALT-1046',
    severity: 'Warning',
    timestamp: '15:10:04',
    timeAgo: '1h ago',
    camera: 'CAM-05 (Warehouse Dock B)',
    zone: 'Warehouse',
    workerId: 'WRK-203',
    workerName: 'Harris',
    duration: '2m 15s',
    status: 'Resolved',
    type: 'No Safety Vest',
    details: 'Worker spotted in forklift traffic lane without high-visibility safety vest.'
  }
];

export const CAMERA_FEEDS = [
  {
    id: 'CAM-01',
    name: 'CAM-01 (Assembly Main)',
    location: 'Assembly Line',
    resolution: '1920x1080',
    fps: 30,
    status: 'Active',
    confidence: 98,
    connectionStatus: 'Excellent',
    detectedCount: 2,
    lastActive: 'Online',
    workerDetails: [
      { id: 'WRK-105', role: 'Assembler', ppe: { helmet: true, vest: true, gloves: true, shoes: true, faceShield: false }, risk: 'Safe' },
      { id: 'WRK-072', role: 'Assembler', ppe: { helmet: true, vest: true, gloves: true, shoes: true, faceShield: false }, risk: 'Safe' }
    ]
  },
  {
    id: 'CAM-02',
    name: 'CAM-02 (Welding West)',
    location: 'Welding Area',
    resolution: '1920x1080',
    fps: 28,
    status: 'Active',
    confidence: 94,
    connectionStatus: 'Good',
    detectedCount: 10,
    lastActive: 'Online',
    workerDetails: [
      { id: 'WRK-084', role: 'Welder', ppe: { helmet: true, vest: true, gloves: false, shoes: true, faceShield: true }, risk: 'Critical' }
    ]
  },
  {
    id: 'CAM-03',
    name: 'CAM-03 (Paint Spray Booth)',
    location: 'Paint Shop',
    resolution: '1920x1080',
    fps: 25,
    status: 'Active',
    confidence: 97,
    connectionStatus: 'Excellent',
    detectedCount: 3,
    lastActive: 'Online',
    workerDetails: [
      { id: 'WRK-112', role: 'Painter', ppe: { helmet: true, vest: true, gloves: true, shoes: true, faceShield: false }, risk: 'Warning' }
    ]
  },
  {
    id: 'CAM-04',
    name: 'CAM-04 (Warehouse Dock B)',
    location: 'Warehouse',
    resolution: '1280x720',
    fps: 30,
    status: 'Active',
    confidence: 99,
    connectionStatus: 'Excellent',
    detectedCount: 16,
    lastActive: 'Online',
    workerDetails: [
      { id: 'WRK-203', role: 'Forklift Operator', ppe: { helmet: true, vest: false, gloves: true, shoes: true, faceShield: false }, risk: 'Warning' }
    ]
  },
  {
    id: 'CAM-05',
    name: 'CAM-05 (Machine Mill A)',
    location: 'Machine Shop',
    resolution: '1920x1080',
    fps: 30,
    status: 'Inactive',
    confidence: 0,
    connectionStatus: 'Offline',
    detectedCount: 0,
    lastActive: '12m ago',
    workerDetails: []
  }
];

export const INCIDENTS = [
  {
    id: 'INC-2026-894',
    workerId: 'WRK-084',
    workerName: 'Praveen',
    time: '16:24:02',
    location: 'Welding Area',
    missingPpe: 'Leather Gloves',
    duration: '4m 12s',
    severity: 'Critical',
    status: 'Pending',
    date: '2026-07-09',
    rootCauses: [
      { reason: 'Helmet removed due to excessive heat', confidence: 12, evidence: 'N/A', explanation: 'No evidence found.' },
      { reason: 'PPE unavailable nearby', confidence: 18, evidence: 'Station 4 dispenser log', explanation: 'Station 4 reported low glove stock.' },
      { reason: 'Forgot PPE', confidence: 65, evidence: 'Worker interview history', explanation: 'Worker forgot gloves after taking water break.' },
      { reason: 'Damaged PPE during task', confidence: 5, evidence: 'Discard bin scanner', explanation: 'No damaged gloves found in bin.' }
    ]
  },
  {
    id: 'INC-2026-893',
    workerId: 'WRK-112',
    workerName: 'Hari Priya',
    time: '16:18:15',
    location: 'Paint Shop',
    missingPpe: 'Respirator Mask (Loose)',
    duration: '12s',
    severity: 'Warning',
    status: 'Acknowledged',
    date: '2026-07-09',
    rootCauses: [
      { reason: 'Improper task assignment', confidence: 15, evidence: 'Schedule mismatch', explanation: 'Assigned as helper but did spray painting.' },
      { reason: 'Damaged PPE / Tightness adjustment', confidence: 75, evidence: 'Repetitive strap adjustment detected by AI', explanation: 'Strap clasp detected as loose; worker adjusted it.' },
      { reason: 'Forgot PPE', confidence: 10, evidence: 'N/A', explanation: 'Respirator was present, just loose.' }
    ]
  },
  {
    id: 'INC-2026-892',
    workerId: 'WRK-029',
    workerName: 'Joshua',
    time: '15:45:22',
    location: 'Assembly Line',
    missingPpe: 'Restricted Entry Violation',
    duration: '1m 30s',
    severity: 'Critical',
    status: 'Pending',
    date: '2026-07-09',
    rootCauses: [
      { reason: 'Worker entered restricted zone unexpectedly', confidence: 88, evidence: 'Proximity sensor + AI skeleton tracking', explanation: 'Worker stepped over warning barrier to pick dropped bolt.' },
      { reason: 'Improper training', confidence: 12, evidence: 'LMS profile check', explanation: 'LMS profile shows safety module completed 13 months ago.' }
    ]
  }
];

export const CONTEXT_INTELLIGENCE = [
  {
    workerId: 'WRK-084',
    name: 'Praveen',
    role: 'Welder (Grade 2)',
    assignedTask: 'Heavy Welder Assembly',
    zone: 'Welding Area',
    requiredPPE: ['Welding Helmet', 'Face Shield', 'Leather Gloves', 'Fire-Resistant Vest'],
    detectedPPE: ['Welding Helmet', 'Fire-Resistant Vest'],
    missingPPE: ['Leather Gloves', 'Face Shield'],
    riskScore: 89,
    classification: 'Critical',
    aiExplanation: 'Electrician / Welder role performing active arc weld requires spark protection. Extreme heat levels detected. Operation is active while hand proximity to heat source is <15cm without safety glove barriers.',
    decisionTree: {
      step1: { node: 'Task Analysis', output: 'Welding Operation Detected (Arc Level 3)' },
      step2: { node: 'Zone Verification', output: 'Robot Cell 4 (High Voltage / High Spark)' },
      step3: { node: 'Role & Context', output: 'Welder on duty (Active welder permit)' },
      step4: { node: 'PPE Compliance Check', output: 'Gloves missing, Shield missing. Trigger Severity 4 (Critical)' }
    }
  },
  {
    workerId: 'WRK-105',
    name: 'Godwin',
    role: 'Assembler',
    assignedTask: 'Chassis Mount',
    zone: 'Assembly Line',
    requiredPPE: ['Helmet', 'Safety Vest', 'Steel Toe Shoes', 'Safety Glasses'],
    detectedPPE: ['Helmet', 'Safety Vest', 'Steel Toe Shoes', 'Safety Glasses'],
    missingPPE: [],
    riskScore: 4,
    classification: 'Safe',
    aiExplanation: 'Worker complies with all EHS regulations for Assembly line activities. Standard layout routing active.',
    decisionTree: {
      step1: { node: 'Task Analysis', output: 'Chassis Mount Assembly' },
      step2: { node: 'Zone Verification', output: 'Station 2 Assembly East' },
      step3: { node: 'Role & Context', output: 'Assembler on duty' },
      step4: { node: 'PPE Compliance Check', output: '100% compliance detected. Safety Score: 100.' }
    }
  }
];

export const PREDICTIONS = [
  {
    id: 'PRD-01',
    workerId: 'WRK-018',
    workerName: 'Dave Miller',
    zone: 'Assembly Line',
    riskType: 'Glove Removal Risk',
    confidence: 84,
    reason: 'Repeated glove adjustment and wrist flexion detected by AI skeleton models. Temperature telemetry indicates 31°C in station.',
    timeframe: 'Next 30 mins'
  },
  {
    id: 'PRD-02',
    workerId: 'WRK-055',
    workerName: 'Elena Rostova',
    zone: 'Paint Shop',
    riskType: 'Respirator Loosening Risk',
    confidence: 72,
    reason: 'Worker has logged 4 hours of paint booth operation without breaks. Statistical fatigue metrics show elevated risk of mask removal for breathability.',
    timeframe: 'Next 60 mins'
  },
  {
    id: 'PRD-03',
    zone: 'Welding Area',
    riskType: 'PPE Inventory Depletion',
    confidence: 90,
    reason: 'Glove dispenser usage rates indicate remaining glove stack will run out in 2 hours due to incoming shift rotation overlap.',
    timeframe: 'Shift B Start'
  }
];

export const ROOT_CAUSES = {
  pieData: [
    { name: 'Heat & Discomfort', value: 42, color: '#ef4444' },
    { name: 'Forgot PPE', value: 25, color: '#f59e0b' },
    { name: 'Damaged PPE', value: 12, color: '#3b82f6' },
    { name: 'PPE Storage Empty', value: 11, color: '#10b981' },
    { name: 'Improper Training', value: 6, color: '#8b5cf6' },
    { name: 'Unknown/Other', value: 4, color: '#6b7280' }
  ],
  trendData: [
    { day: '06/10', Heat: 15, Forgot: 12, StorageEmpty: 4, Damaged: 2 },
    { day: '06/15', Heat: 18, Forgot: 10, StorageEmpty: 8, Damaged: 4 },
    { day: '06/20', Heat: 22, Forgot: 15, StorageEmpty: 2, Damaged: 3 },
    { day: '06/25', Heat: 25, Forgot: 8, StorageEmpty: 1, Damaged: 5 },
    { day: '06/30', Heat: 20, Forgot: 14, StorageEmpty: 5, Damaged: 6 },
    { day: '07/05', Heat: 30, Forgot: 16, StorageEmpty: 10, Damaged: 2 },
    { day: '07/09', Heat: 42, Forgot: 25, StorageEmpty: 11, Damaged: 12 }
  ],
  insights: [
    { id: 1, title: 'Heat is the Dominant Factor', desc: '42% of safety infractions correlate with local station ambient temperature exceeding 29°C. Cooling systems at Welding Station 4 and Paint Shop are recommended.', type: 'critical' },
    { id: 2, title: 'Dispenser Refill Timing Mismatch', desc: 'Storage stock depletions peak between 14:00 and 15:30. Changing warehouse delivery rounds to 13:30 will prevent stock outages.', type: 'warning' },
    { id: 3, title: 'Worker Re-training Lag', desc: 'Warehouse loaders with >12 months since their last forklift safety review account for 85% of vest omissions.', type: 'safe' }
  ]
};

export const WORKERS = [
  {
    id: 'WRK-084',
    name: 'Praveen',
    department: 'Welding',
    complianceRate: 88.9,
    totalViolations: 4,
    mostMissedPpe: 'Leather Gloves',
    avgResponseTime: '45s',
    safetyRating: 'B-',
    riskTrend: 'Increasing',
    trainingRecommendation: 'Enroll in Spark & Thermal Protection Refresh Module'
  },
  {
    id: 'WRK-112',
    name: 'Hari Priya',
    department: 'Paint Shop',
    complianceRate: 96.4,
    totalViolations: 2,
    mostMissedPpe: 'Respirator Mask',
    avgResponseTime: '12s',
    safetyRating: 'A-',
    riskTrend: 'Stable',
    trainingRecommendation: 'Chemical Vapor Safety Review'
  },
  {
    id: 'WRK-105',
    name: 'Godwin',
    department: 'Assembly',
    complianceRate: 100,
    totalViolations: 0,
    mostMissedPpe: 'None',
    avgResponseTime: 'N/A',
    safetyRating: 'A+',
    riskTrend: 'Excellent',
    trainingRecommendation: 'Eligible for EHS Safety Mentor Role'
  },
  {
    id: 'WRK-203',
    name: 'Harris',
    department: 'Warehouse',
    complianceRate: 94.2,
    totalViolations: 3,
    mostMissedPpe: 'Safety Vest',
    avgResponseTime: '1m 20s',
    safetyRating: 'B',
    riskTrend: 'Decreasing',
    trainingRecommendation: 'Forklift Zone Proximity Training'
  },
  {
    id: 'WRK-029',
    name: 'Joshua',
    department: 'Assembly',
    complianceRate: 95.8,
    totalViolations: 2,
    mostMissedPpe: 'Safety Glasses',
    avgResponseTime: '15s',
    safetyRating: 'A',
    riskTrend: 'Stable',
    trainingRecommendation: 'Robotic Cell Proximity Protocols'
  }
];

export const SMART_RECOMMENDATIONS = [
  {
    id: 'REC-01',
    recommendation: 'Install Helmet & Glove Dispenser Rack',
    location: 'Assembly Line Access Point B',
    expectedReduction: 31,
    priority: 'High',
    cost: 'Low',
    impact: 'High',
    rationale: '80% of assembly infractions occur when workers enter from the locker room side. Placing a dispenser right at the entryway will prompt immediate compliance.'
  },
  {
    id: 'REC-02',
    recommendation: 'Implement Hydration & Rest Breaks',
    location: 'Welding Stations 3 & 4',
    expectedReduction: 45,
    priority: 'High',
    cost: 'Low',
    impact: 'High',
    rationale: 'PPE removals correlate heavily with heat fatigue. Mandatory 5-minute hydration breaks when ambient temperature exceeds 30°C will reduce mask/glove removals.'
  },
  {
    id: 'REC-03',
    recommendation: 'Smart Proximity Haptic Buzzers',
    location: 'Warehouse Forklift Corridors',
    expectedReduction: 60,
    priority: 'Medium',
    cost: 'Medium',
    impact: 'High',
    rationale: 'Workers forget vests in loading docks. Attaching RFID buzzers to forklift zones can alert workers physically if vest sensor telemetry is missing.'
  },
  {
    id: 'REC-04',
    recommendation: 'Upgrade Local Exhaust Ventilation (LEV)',
    location: 'Paint Spray Booth Area East',
    expectedReduction: 25,
    priority: 'Medium',
    cost: 'High',
    impact: 'Medium',
    rationale: 'Fume levels fluctuate, prompting painters to lift masks to clear fogging. Upgraded air ventilation will reduce mask adjustments by 70%.'
  }
];

export const ANALYTICS_DATA = {
  complianceOverTime: [
    { date: 'Mon', compliance: 95.2 },
    { date: 'Tue', compliance: 96.8 },
    { date: 'Wed', compliance: 97.5 },
    { date: 'Thu', compliance: 95.9 },
    { date: 'Fri', compliance: 98.4 },
    { date: 'Sat', compliance: 99.1 },
    { date: 'Sun', compliance: 98.4 },
  ],
  violationsByZone: [
    { zone: 'Assembly', count: 4 },
    { zone: 'Paint Shop', count: 9 },
    { zone: 'Welding', count: 18 },
    { zone: 'Machine Shop', count: 7 },
    { zone: 'Warehouse', count: 5 },
  ],
  violationTypes: [
    { name: 'No Helmet', value: 12, color: '#3b82f6' },
    { name: 'No Vest', value: 24, color: '#f59e0b' },
    { name: 'No Gloves', value: 38, color: '#ef4444' },
    { name: 'No Shield', value: 18, color: '#10b981' },
    { name: 'Zone Intrusion', value: 8, color: '#8b5cf6' },
  ],
  riskHeatmap: [
    { x: 'Row 1', Assembly: 1, Paint: 3, Welding: 8, Machine: 2, Warehouse: 1 },
    { x: 'Row 2', Assembly: 2, Paint: 4, Welding: 9, Machine: 3, Warehouse: 2 },
    { x: 'Row 3', Assembly: 1, Paint: 2, Welding: 7, Machine: 2, Warehouse: 1 },
    { x: 'Row 4', Assembly: 0, Paint: 1, Welding: 9, Machine: 1, Warehouse: 0 },
  ]
};
