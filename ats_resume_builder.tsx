import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Briefcase, GraduationCap, Code, Award, 
  Settings, Eye, FileText, Download, Upload, 
  Sparkles, CheckCircle2, AlertCircle, RefreshCw, 
  Trash2, Plus, ArrowUp, ArrowDown, Info, HelpCircle,
  Activity, Gauge, ListChecks, Sliders, ChevronDown, ChevronUp
} from 'lucide-react';

const INITIAL_RESUME_DATA = {
  personal: {
    fullName: "Alex Rivera",
    title: "Senior Full Stack Software Engineer",
    email: "alex.rivera@email.com",
    phone: "(555) 019-2834",
    location: "San Francisco, CA",
    website: "https://github.com/alexriveradev",
    linkedin: "https://linkedin.com/in/alexrivera-example"
  },
  summary: "Results-driven Software Engineer with 6+ years of experience designing, building, and maintaining cloud-native SaaS applications. Specialized in React, Node.js, and AWS architectures. Demonstrated track record of optimizing application performance by 40% and leading cross-functional teams to deliver critical product milestones in agile environments.",
  experience: [
    {
      id: "exp-1",
      company: "InnovateTech Solutions",
      position: "Lead Full Stack Engineer",
      location: "San Francisco, CA",
      startDate: "2023-03",
      endDate: "Present",
      current: true,
      description: "Designed and implemented microservices architecture using Node.js and AWS Lambda, improving overall API responsiveness by 35%.\nLed a team of 4 frontend developers to rebuild the core customer portal using React and Tailwind CSS, increasing user retention by 15%.\nEstablished continuous integration/continuous deployment (CI/CD) pipelines reducing deployment cycles from 5 days to 2 hours."
    },
    {
      id: "exp-2",
      company: "SaaSify Inc.",
      position: "Senior Software Engineer",
      location: "Austin, TX (Remote)",
      startDate: "2020-06",
      endDate: "2023-02",
      current: false,
      description: "Developed and optimized database schemas in PostgreSQL, reducing query latency times for active enterprise accounts by 50%.\nCollaborated directly with product and design teams to launch high-fidelity dashboard analytics tools utilized by 10,000+ daily active users.\nRefactored legacy codebases to TypeScript, mitigating runtime production bugs by 22%."
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      location: "Berkeley, CA",
      startDate: "2016",
      endDate: "2020",
      gpa: "3.8"
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "SmartInventory AI SaaS",
      role: "Lead Creator",
      link: "https://smartinventory-demo.io",
      description: "An automated inventory management platform integrated with machine learning forecasts, built with Python, FastAPIs, and React. Handled over $50k mock transaction requests weekly during beta release."
    }
  ],
  skills: [
    { category: "Languages", items: "JavaScript, TypeScript, Python, SQL, HTML5, CSS3, Go" },
    { category: "Frameworks & Libraries", items: "React, Node.js, Express, Next.js, Django, Tailwind CSS" },
    { category: "Databases & Cloud", items: "PostgreSQL, MongoDB, Redis, Amazon Web Services (AWS EC2, S3, RDS, Lambda)" },
    { category: "Tools & DevOps", items: "Git, Docker, Kubernetes, CI/CD, Jest, Cypress, Webpack" }
  ],
  certifications: [
    { id: "cert-1", name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "2024" },
    { id: "cert-2", name: "Certified ScrumMaster (CSM)", issuer: "Scrum Alliance", year: "2022" }
  ]
};

const THEMES = [
  {
    id: "executive",
    name: "Executive Classic",
    description: "Highly polished traditional layout. Great for business, leadership, finance, and traditional industries.",
    font: "Georgia",
    layout: "single",
    headerAlignment: "center",
    colors: { primary: "#1e293b", secondary: "#475569", text: "#0f172a" }
  },
  {
    id: "tech-pro",
    name: "Tech Professional",
    description: "Modern layout. Optimized with sharp dividers and headers loved by technical screeners.",
    font: "Helvetica",
    layout: "single",
    headerAlignment: "left",
    colors: { primary: "#0f766e", secondary: "#14b8a6", text: "#111827" }
  },
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    description: "Ultra-clean aesthetics with crisp visual hierarchy, high density and clean space economy.",
    font: "Arial",
    layout: "single",
    headerAlignment: "left",
    colors: { primary: "#000000", secondary: "#4b5563", text: "#1f2937" }
  },
  {
    id: "two-column-ats",
    name: "Symmetric Split",
    description: "Perfectly designed double column layout. Sequentially flowable for seamless parser compatibility.",
    font: "Calibri",
    layout: "double",
    headerAlignment: "left",
    colors: { primary: "#1e3a8a", secondary: "#3b82f6", text: "#1e293b" }
  },
  {
    id: "compact-corporate",
    name: "Compact Corporate",
    description: "High-density design highlighted in Royal Blue. Engineered to fit extensive details into a single page.",
    font: "Helvetica",
    layout: "single",
    headerAlignment: "left",
    colors: { primary: "#0f172a", secondary: "#2563eb", text: "#1e293b" }
  },
  {
    id: "editorial-serif",
    name: "Editorial Elegance",
    description: "Distinguished charcoal-toned serif design. Ideal for expert advisory, academic, or law sectors.",
    font: "Georgia",
    layout: "single",
    headerAlignment: "center",
    colors: { primary: "#27272a", secondary: "#71717a", text: "#09090b" }
  },
  {
    id: "creative-hybrid",
    name: "Creative Hybrid",
    description: "Stylish deep burgundy split borders. Adds visual flair while remaining 100% compliant.",
    font: "Arial",
    layout: "double",
    headerAlignment: "left",
    colors: { primary: "#881337", secondary: "#db2777", text: "#18181b" }
  }
];

const calculateLocalAtsScore = (data, theme) => {
  let score = 30; // Starting baseline
  const diagnostics = [];

  // Personal Info Integrity
  if (data.personal.fullName) { score += 4; diagnostics.push({ type: 'pass', text: 'Full Name configured.' }); }
  else { diagnostics.push({ type: 'fail', text: 'Missing Full Name.' }); }

  if (data.personal.email) { score += 4; diagnostics.push({ type: 'pass', text: 'Email contact configured.' }); }
  else { diagnostics.push({ type: 'fail', text: 'Missing email contact details.' }); }

  if (data.personal.phone) { score += 4; diagnostics.push({ type: 'pass', text: 'Phone number configured.' }); }
  else { diagnostics.push({ type: 'fail', text: 'Missing phone number.' }); }

  if (data.personal.location) { score += 4; diagnostics.push({ type: 'pass', text: 'City/State location configured.' }); }
  else { diagnostics.push({ type: 'warn', text: 'No location. Recruiters search by local pools.' }); }

  if (data.personal.linkedin) { score += 4; diagnostics.push({ type: 'pass', text: 'LinkedIn profile listed.' }); }
  else { diagnostics.push({ type: 'warn', text: 'Adding LinkedIn profile yields better engagement.' }); }

  // Summary Metrics
  if (data.summary) {
    const wordCount = data.summary.trim().split(/\s+/).length;
    if (wordCount >= 35 && wordCount <= 90) {
      score += 15;
      diagnostics.push({ type: 'pass', text: `Excellent summary length (${wordCount} words).` });
    } else if (wordCount > 90) {
      score += 8;
      diagnostics.push({ type: 'warn', text: `Profile summary is overly wordy (${wordCount} words). Trim under 90.` });
    } else {
      score += 5;
      diagnostics.push({ type: 'warn', text: 'Summary profile is too short. Include more keywords.' });
    }
  } else {
    diagnostics.push({ type: 'fail', text: 'No professional profile summary.' });
  }

  // Work Experience Metrics
  if (data.experience && data.experience.length > 0) {
    score += 10;
    let totalBullets = 0;
    let metricHits = 0;
    let actionVerbHits = 0;

    const strongVerbs = [
      'led', 'designed', 'developed', 'optimized', 'managed', 'built', 'created',
      'solved', 'achieved', 'increased', 'decreased', 'spearheaded', 'automated',
      'implemented', 'established', 'engineered', 'formulated', 'delivered'
    ];

    data.experience.forEach(e => {
      if (e.description) {
        const bullets = e.description.split('\n').filter(b => b.trim().length > 0);
        totalBullets += bullets.length;

        bullets.forEach(bullet => {
          if (/[\d%+$]|million|billion|thousand/i.test(bullet)) {
            metricHits++;
          }
          const words = bullet.toLowerCase().split(/\s+/);
          if (words.some(w => strongVerbs.includes(w.replace(/[^a-z]/g, '')))) {
            actionVerbHits++;
          }
        });
      }
    });

    if (totalBullets >= 4) {
      score += 5;
      diagnostics.push({ type: 'pass', text: `Comprehensive work bullets provided (${totalBullets} points).` });
    } else {
      score += 2;
      diagnostics.push({ type: 'warn', text: `Short on work bullet items (${totalBullets} points). Expand.` });
    }

    if (metricHits >= 2) {
      score += 5;
      diagnostics.push({ type: 'pass', text: `Contains quantitative metrics (${metricHits} metrics found).` });
    } else {
      diagnostics.push({ type: 'warn', text: 'Add quantitative metrics (e.g., optimized speeds by 30%, $50k sales).' });
    }

    if (actionVerbHits >= 3) {
      score += 5;
      diagnostics.push({ type: 'pass', text: `Excellent action verb usage (${actionVerbHits} action verbs).` });
    } else {
      diagnostics.push({ type: 'warn', text: 'Increase action-oriented keywords inside bullets.' });
    }
  } else {
    diagnostics.push({ type: 'fail', text: 'Missing work experience segment completely.' });
  }

  // Skills Categories
  if (data.skills && data.skills.length > 0) {
    score += 15;
    diagnostics.push({ type: 'pass', text: `${data.skills.length} skills taxonomies loaded.` });
  } else {
    diagnostics.push({ type: 'fail', text: 'Skills block is completely blank.' });
  }

  // Layout check
  if (theme.layout === 'double') {
    score += 5;
    diagnostics.push({ type: 'warn', text: 'Two-column layout active. Classic systems score single column higher.' });
  } else {
    score += 15;
    diagnostics.push({ type: 'pass', text: 'Highly compatible single column format selected.' });
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    diagnostics
  };
};

export default function App() {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('ats_resume_builder_v3_state');
    return saved ? JSON.parse(saved) : INITIAL_RESUME_DATA;
  });

  const [activeTheme, setActiveTheme] = useState(THEMES[1]); // Tech Pro default
  const [fontSize, setFontSize] = useState("sm"); // xs, sm, base, lg
  const [lineSpacing, setLineSpacing] = useState("normal"); // tight, normal, relaxed
  const [pageMargin, setPageMargin] = useState("normal"); // narrow, normal, generous
  const [activeTab, setActiveTab] = useState("personal");
  const [notification, setNotification] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [rawJsonInput, setRawJsonInput] = useState("");
  
  const [pdfParsing, setPdfParsing] = useState(false);
  const [pdfError, setPdfError] = useState("");
  
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [showScoreDiagnostics, setShowScoreDiagnostics] = useState(false);
  
  const [targetJobDescription, setTargetJobDescription] = useState("");
  const [tailoringResult, setTailoringResult] = useState(null);
  const [selectedTone, setSelectedTone] = useState("executive");
  const [interviewPrep, setInterviewPrep] = useState(null);
  const [activeAiSubTab, setActiveAiSubTab] = useState("audit"); // audit, tailor, tone, prep

  const fileInputRef = useRef(null);

  // Auto caching save
  useEffect(() => {
    localStorage.setItem('ats_resume_v3_state', JSON.stringify(resumeData));
  }, [resumeData]);

  const showToast = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handlePdfUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPdfParsing(true);
    setPdfError("");
    showToast("Initializing client-side secure PDF reader...", "info");

    try {
      // Dynamically load PDFJS from secure cdn
      if (!window.pdfjsLib) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
        document.head.appendChild(script);
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const pdfjsLib = window.pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        try {
          const typedArray = new Uint8Array(e.target.result);
          const pdfDoc = await pdfjsLib.getDocument(typedArray).promise;
          let extractedText = "";

          for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map(item => item.str).join(" ");
            extractedText += pageText + "\n";
          }

          if (!extractedText.trim()) {
            throw new Error("Unable to read selectable text from this PDF file. It might be scanned or image-based.");
          }

          showToast("Extracted raw text! Sending to Gemini AI parser...", "success");
          await parseExtractedTextWithGemini(extractedText);
        } catch (innerErr) {
          setPdfError(innerErr.message);
          setPdfParsing(false);
          showToast("PDF parsing failure", "error");
        }
      };

      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      setPdfError(err.message);
      setPdfParsing(false);
      showToast("Library initialization error", "error");
    }
  };

  const parseExtractedTextWithGemini = async (rawText) => {
    const systemPrompt = "You are a professional resume parser. Your job is to extract unstructured text from a resume PDF and convert it into a strictly structured JSON object.";
    const userPrompt = `Parse this extracted resume text and convert it to match this exact schema format:
    {
      "personal": { "fullName": "", "title": "", "email": "", "phone": "", "location": "", "website": "", "linkedin": "" },
      "summary": "",
      "experience": [ { "id": "exp-1", "company": "", "position": "", "location": "", "startDate": "", "endDate": "", "current": false, "description": "Bullet 1\\nBullet 2" } ],
      "education": [ { "id": "edu-1", "institution": "", "degree": "", "location": "", "startDate": "", "endDate": "", "gpa": "" } ],
      "projects": [ { "id": "proj-1", "name": "", "role": "", "link": "", "description": "" } ],
      "skills": [ { "category": "Languages", "items": "JavaScript, Python, ..." } ],
      "certifications": [ { "id": "cert-1", "name": "", "issuer": "", "year": "" } ]
    }
    
    Only respond with the valid JSON object. Do not include markdown wraps or dialogue. Here is the resume text:
    ${rawText}`;

    try {
      const outputText = await callGeminiAi(userPrompt, systemPrompt);
      if (outputText) {
        const cleanJson = outputText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedState = JSON.parse(cleanJson);
        
        // Ensure IDs exist
        if (parsedState.experience) {
          parsedState.experience = parsedState.experience.map((e, idx) => ({ ...e, id: e.id || `exp-${idx}` }));
        }
        if (parsedState.education) {
          parsedState.education = parsedState.education.map((e, idx) => ({ ...e, id: e.id || `edu-${idx}` }));
        }
        if (parsedState.projects) {
          parsedState.projects = parsedState.projects.map((p, idx) => ({ ...p, id: p.id || `proj-${idx}` }));
        }
        if (parsedState.certifications) {
          parsedState.certifications = parsedState.certifications.map((c, idx) => ({ ...c, id: c.id || `cert-${idx}` }));
        }

        setResumeData(parsedState);
        setPdfParsing(false);
        showToast("Resume parsed and loaded successfully!", "success");
      }
    } catch (err) {
      setPdfError("Failed to structure raw text: " + err.message);
      setPdfParsing(false);
      showToast("Structuring parsed data failed", "error");
    }
  };

  const callGeminiAi = async (promptText, systemPrompt = "") => {
    setAiLoading(true);
    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: promptText }] }]
    };

    if (systemPrompt) {
      payload.systemInstruction = {
        parts: [{ text: systemPrompt }]
      };
    }

    let delay = 1000;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          setAiLoading(false);
          return result.candidates?.[0]?.content?.parts?.[0]?.text;
        }

        if (response.status !== 429 && response.status >= 400 && response.status < 500) {
          throw new Error(`API Error Status Code: ${response.status}`);
        }
      } catch (err) {
        if (attempt === 5) {
          setAiLoading(false);
          throw err;
        }
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
    setAiLoading(false);
    throw new Error("Server communication timed out. Please try again.");
  };

  const handleTailorResume = async () => {
    if (!targetJobDescription.trim()) {
      showToast("Please enter a job description to tailor against.", "error");
      return;
    }

    const systemPrompt = "You are an elite corporate technical recruiter and ATS parser. Your goal is to maximize the resume's match percentage with the provided job description.";
    const prompt = `Analyze this resume against the target Job Description below. 
    Provide a JSON response. The response must be a valid JSON object (and nothing else, no markdown fences) containing:
    1. "matchScore" (number 0-100)
    2. "missingKeywords" (array of strings)
    3. "tailoredSummary" (a refined 3-4 sentence summary optimized with key missing keywords from the JD)
    4. "bulletSuggestions" (array of objects, each containing: "jobCompany" (string matching experience company), "originalBullet" (string), "suggestedBullet" (string incorporating key JD words)).

    Resume Data:
    ${JSON.stringify(resumeData)}

    Job Description:
    ${targetJobDescription}`;

    try {
      const output = await callGeminiAi(prompt, systemPrompt);
      if (output) {
        const cleanJsonStr = output.replace(/```json/g, '').replace(/```/g, '').trim();
        const result = JSON.parse(cleanJsonStr);
        setTailoringResult(result);
        showToast("Resume tailored successfully!", "success");
      }
    } catch (err) {
      showToast("Failed to tailor resume: " + err.message, "error");
    }
  };

  const handleMorphTone = async () => {
    const systemPrompt = "You are an expert copywriter who adapts corporate narratives to specific institutional styles.";
    const prompt = `Rewrite the following professional summary and experience bullet points to match a "${selectedTone}" tone.
    Keep all factual elements, positions, and technologies completely accurate. Only morph the writing voice.
    Provide the output as a clean JSON object containing:
    1. "summary" (string)
    2. "experienceDescriptions" (array of strings, parallel in order to the provided experiences, representing the modified multi-line description bullets).

    Tones description:
    - "executive": Sophisticated, metrics-first, strategic leadership.
    - "specialist": Technical deep-dive, tool-focused, execution-based.
    - "startup": Dynamic, agile, high-impact, cross-functional.
    - "academic": Formally structured, research-oriented, highly professional.

    Current Summary:
    ${resumeData.summary}

    Experiences:
    ${JSON.stringify(resumeData.experience.map(e => ({ company: e.company, description: e.description })))}`;

    try {
      const output = await callGeminiAi(prompt, systemPrompt);
      if (output) {
        const cleanJson = output.replace(/```json/g, '').replace(/```/g, '').trim();
        const result = JSON.parse(cleanJson);
        
        const updatedExperience = resumeData.experience.map((exp, idx) => {
          if (result.experienceDescriptions && result.experienceDescriptions[idx]) {
            return { ...exp, description: result.experienceDescriptions[idx] };
          }
          return exp;
        });

        setResumeData({
          ...resumeData,
          summary: result.summary,
          experience: updatedExperience
        });
        showToast(`Resume tone converted to ${selectedTone}!`, "success");
      }
    } catch (err) {
      showToast("Failed to morph tone: " + err.message, "error");
    }
  };

  const handleGeneratePrepQuestions = async () => {
    const systemPrompt = "You are a seasoned hiring manager preparing technical and behavioral interview questionnaires.";
    const prompt = `Generate a set of highly contextualized interview preparation materials based directly on the following resume.
    Your response must be a JSON object containing:
    1. "behavioralQuestions": Array of 3 behavioral questions based on their projects/experience, with a sub-property "hiringManagerTip" for each.
    2. "technicalQuestions": Array of 3 technical deep-dive questions based on their listed technologies/skills, with a sub-property "keyConceptToMention" for each.

    Resume Data:
    ${JSON.stringify(resumeData)}`;

    try {
      const output = await callGeminiAi(prompt, systemPrompt);
      if (output) {
        const cleanJson = output.replace(/```json/g, '').replace(/```/g, '').trim();
        const result = JSON.parse(cleanJson);
        setInterviewPrep(result);
        showToast("Interview preparation materials generated!", "success");
      }
    } catch (err) {
      showToast("Failed to generate prep: " + err.message, "error");
    }
  };

  const applyTailoredSummary = () => {
    if (tailoringResult && tailoringResult.tailoredSummary) {
      setResumeData({ ...resumeData, summary: tailoringResult.tailoredSummary });
      showToast("Tailored summary applied!", "success");
    }
  };

  const applyTailoredBullet = (company, original, suggested) => {
    const updatedExperience = resumeData.experience.map(exp => {
      if (exp.company === company) {
        const bullets = exp.description.split('\n');
        const updatedBullets = bullets.map(b => b.trim() === original.trim() ? suggested : b);
        return { ...exp, description: updatedBullets.join('\n') };
      }
      return exp;
    });
    setResumeData({ ...resumeData, experience: updatedExperience });
    showToast(`Optimized bullet applied for ${company}!`, "success");
  };

  const handleEnhanceExperience = async (index) => {
    const exp = resumeData.experience[index];
    const prompt = `You are a professional ATS resume optimizer. Enhance the following resume description to use strong action verbs, emphasize metrics/impact, and look highly professional for automated scanners. Do NOT invent fake technologies, but focus on framing statements cleanly. Provide ONLY the polished bullet points separated by new lines. Do not wrap in markdown quotes or extra dialogue. Here is the text:\n\n${exp.description}`;

    try {
      const output = await callGeminiAi(prompt);
      if (output) {
        const updatedExpList = [...resumeData.experience];
        updatedExpList[index].description = output.trim();
        setResumeData({ ...resumeData, experience: updatedExpList });
        showToast("Bullet points successfully enhanced!", "success");
      }
    } catch (err) {
      showToast("Failed to optimize. " + err.message, "error");
    }
  };

  const handleGenerateSummary = async () => {
    const jobs = resumeData.experience.map(e => `${e.position} at ${e.company}: ${e.description}`).join('\n\n');
    const skills = resumeData.skills.map(s => `${s.category}: ${s.items}`).join(', ');
    const prompt = `Based on the following work experiences and skills, write a stellar, 3-4 sentence professional resume profile summary. Make it highly ATS friendly, using premium target terminology and industry keywords. Provide ONLY the summary paragraph. No preamble, no quotes.\n\nJobs:\n${jobs}\n\nSkills:\n${skills}`;

    try {
      const output = await callGeminiAi(prompt);
      if (output) {
        setResumeData({ ...resumeData, summary: output.trim() });
        showToast("Summary generated!", "success");
      }
    } catch (err) {
      showToast("Could not generate summary. " + err.message, "error");
    }
  };

  const handleScanAtsOptimizations = async () => {
    const fullTextStr = JSON.stringify(resumeData);
    const prompt = `Perform a rigorous audit on this resume configuration data for ATS (Applicant Tracking System) compatibility. Check for structural completeness, proper bullet metrics, and formatting concerns. Respond ONLY with a valid JSON object containing an overall 'score' out of 100, an array of 'positives' (positives is an array of strings), and an array of 'improvements' (improvements is an array of strings). Keep suggestions extremely actionable. Do not add markdown wrappers around the JSON.\n\nResume Data:\n${fullTextStr}`;

    try {
      const resultText = await callGeminiAi(prompt);
      const cleanJsonStr = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
      const report = JSON.parse(cleanJsonStr);
      setAiFeedback(report);
      showToast("ATS Scan complete!", "success");
    } catch (err) {
      showToast("Audit parsing failed. Try scanning again.", "error");
    }
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(rawJsonInput);
      if (!parsed.personal || !parsed.skills || !parsed.experience) {
        throw new Error("Invalid format. Missing required resume structural components.");
      }
      setResumeData(parsed);
      setShowImportModal(false);
      showToast("Resume data imported successfully!", "success");
    } catch (e) {
      showToast(e.message || "Invalid JSON formatted string", "error");
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resumeData.personal.fullName.replace(/\s+/g, '_')}_resume_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("JSON config exported!", "success");
  };

  const handlePrint = () => {
    window.print();
  };

  const updatePersonalInfo = (field, val) => {
    setResumeData({
      ...resumeData,
      personal: { ...resumeData.personal, [field]: val }
    });
  };

  const handleListUpdate = (section, index, field, val) => {
    const listCopy = [...resumeData[section]];
    listCopy[index][field] = val;
    setResumeData({ ...resumeData, [section]: listCopy });
  };

  const addListItem = (section, defaultObj) => {
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], { ...defaultObj, id: `${section}-${Date.now()}` }]
    });
  };

  const removeListItem = (section, index) => {
    const listCopy = [...resumeData[section]];
    listCopy.splice(index, 1);
    setResumeData({ ...resumeData, [section]: listCopy });
  };

  const moveItem = (section, index, direction) => {
    const listCopy = [...resumeData[section]];
    if (direction === 'up' && index > 0) {
      const temp = listCopy[index];
      listCopy[index] = listCopy[index - 1];
      listCopy[index - 1] = temp;
    } else if (direction === 'down' && index < listCopy.length - 1) {
      const temp = listCopy[index];
      listCopy[index] = listCopy[index + 1];
      listCopy[index + 1] = temp;
    }
    setResumeData({ ...resumeData, [section]: listCopy });
  };

  const getFontFamily = () => {
    switch (activeTheme.font) {
      case 'Georgia': return 'font-serif';
      case 'Helvetica': return 'font-sans';
      case 'Calibri': return 'font-sans antialiased';
      default: return 'font-sans';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'xs': return 'text-[11px]';
      case 'sm': return 'text-[12px]';
      case 'base': return 'text-[14px]';
      case 'lg': return 'text-[16px]';
      default: return 'text-[12px]';
    }
  };

  const getLineSpacingClass = () => {
    switch (lineSpacing) {
      case 'tight': return 'leading-[1.15]';
      case 'normal': return 'leading-[1.5]';
      case 'relaxed': return 'leading-[1.8]';
      default: return 'leading-[1.5]';
    }
  };

  const getMarginClass = () => {
    switch (pageMargin) {
      case 'narrow': return 'p-6 md:p-8';
      case 'normal': return 'p-8 md:p-12';
      case 'generous': return 'p-10 md:p-16';
      default: return 'p-8 md:p-12';
    }
  };

  const localAtsEvaluation = calculateLocalAtsScore(resumeData, activeTheme);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-teal-500 selection:text-white">
      
      {/* HEADER BAR */}
      <header className="border-b border-slate-800 bg-slate-950 px-6 py-4 sticky top-0 z-40 print:hidden flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-teal-500 p-2 rounded-xl text-slate-950">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide flex items-center gap-2">
              ATS-Optimized Resume Architect
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                Unprecedented Parsability
              </span>
            </h1>
            <p className="text-xs text-slate-400">Transform raw resumes with direct PDF-parsers & layout density adjusters</p>
          </div>
        </div>

        {/* ATS Realtime Score Section inside Header */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveTab("ai-audit")} 
            className="cursor-pointer bg-slate-900 border border-slate-800 rounded-xl px-4 py-1.5 flex items-center gap-3 hover:border-teal-500 transition-all group"
            title="Click to view detailed diagnostics score reports"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="16" cy="16" r="14" fill="transparent" stroke="#1e293b" strokeWidth="2" />
                <circle cx="16" cy="16" r="14" fill="transparent" 
                        stroke={localAtsEvaluation.score >= 80 ? '#10b981' : localAtsEvaluation.score >= 60 ? '#f59e0b' : '#f43f5e'} 
                        strokeWidth="2.5" 
                        strokeDasharray={2 * Math.PI * 14} 
                        strokeDashoffset={2 * Math.PI * 14 * (1 - localAtsEvaluation.score / 100)} />
              </svg>
              <span className="text-[10px] font-bold text-teal-400">{localAtsEvaluation.score}</span>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Live ATS Score</span>
              <span className="text-xs font-black text-slate-200 group-hover:text-teal-300 transition-colors flex items-center gap-1">
                Evaluation Center <span className="text-[10px]">→</span>
              </span>
            </div>
          </div>

          <button 
            onClick={() => setShowImportModal(true)} 
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
          >
            <Upload className="w-3.5 h-3.5" /> Import JSON
          </button>
          
          <button 
            onClick={handleExportJson} 
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5" /> Save Backup
          </button>

          <button 
            onClick={handlePrint} 
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-lg transition-all shadow-lg shadow-teal-500/20 font-bold"
          >
            <Download className="w-4 h-4" /> Print / Export PDF
          </button>
        </div>
      </header>

      {/* Floating Notifications */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl bg-slate-850 text-slate-100 border border-slate-700">
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : notification.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          ) : (
            <Info className="w-5 h-5 text-teal-400" />
          )}
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-850 border border-slate-700 rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-2">Import Resume Profile config</h3>
            <p className="text-xs text-slate-400 mb-4">Paste JSON configuration data to restore your workspace.</p>
            <textarea 
              className="w-full h-48 bg-slate-950 border border-slate-700 rounded-lg p-3 text-mono text-xs text-teal-300 focus:ring-2 focus:ring-teal-500 focus:outline-none mb-4"
              placeholder='Paste JSON structural data here...'
              value={rawJsonInput}
              onChange={(e) => setRawJsonInput(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-slate-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleImportJson}
                className="bg-teal-500 text-slate-950 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-teal-400"
              >
                Restore Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN WORKSPACE SPLIT */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Editor Sidebar (Left Panel) */}
        <aside className="w-full lg:w-[45%] bg-slate-950 border-r border-slate-800 flex flex-col overflow-y-auto print:hidden">
          
          {/* Real-time ATS Scorecard Sidebar Card */}
          <div className="mx-6 mt-6 p-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-4 flex items-center justify-center font-black text-sm bg-slate-950"
                  style={{ 
                    borderColor: localAtsEvaluation.score >= 80 ? '#10b981' : localAtsEvaluation.score >= 60 ? '#f59e0b' : '#f43f5e',
                    color: localAtsEvaluation.score >= 80 ? '#10b981' : localAtsEvaluation.score >= 60 ? '#f59e0b' : '#f43f5e'
                  }}
                >
                  {localAtsEvaluation.score}%
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200">ATS Real-time Compliance</h3>
                  <p className="text-[11px] text-slate-400">Updates instantly as you add text & metrics.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowScoreDiagnostics(!showScoreDiagnostics)}
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 transition"
              >
                {showScoreDiagnostics ? "Hide Checklist" : "View Checklist"}
                <span className="text-[10px]">{showScoreDiagnostics ? "▲" : "▼"}</span>
              </button>
            </div>

            {showScoreDiagnostics && (
              <div className="border-t border-slate-800/80 pt-3 space-y-2 max-h-60 overflow-y-auto">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Parsing Checks Matrix</span>
                {localAtsEvaluation.diagnostics.map((diag, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs">
                    <span className={`text-sm leading-none ${
                      diag.type === 'pass' ? 'text-emerald-400' : diag.type === 'warn' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {diag.type === 'pass' ? '✓' : diag.type === 'warn' ? '⚠' : '✗'}
                    </span>
                    <span className="text-slate-300">{diag.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Editor Tabs Navigation */}
          <nav className="flex items-center overflow-x-auto border-b border-slate-800 bg-slate-950 shrink-0 scrollbar-thin mt-4">
            {[
              { id: "pdf-parser", label: "Upload Old Resume", icon: Upload },
              { id: "personal", label: "Identity", icon: User },
              { id: "experience", label: "Experience", icon: Briefcase },
              { id: "education", label: "Education", icon: GraduationCap },
              { id: "projects", label: "Projects", icon: Code },
              { id: "skills", label: "Skills", icon: Award },
              { id: "certifications", label: "Credentials", icon: Award },
              { id: "settings", label: "Design Settings", icon: Settings },
              { id: "ai-audit", label: "ATS Assistant", icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-xs font-semibold tracking-wide whitespace-nowrap border-b-2 transition ${
                    isActive 
                      ? 'border-teal-500 text-teal-400 bg-slate-900/40' 
                      : 'border-transparent text-slate-400 hover:text-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Tab Content Panel */}
          <div className="p-6 flex-1 space-y-6">

            {/* TAB: PDF Resume Parser */}
            {activeTab === "pdf-parser" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-teal-400" />
                    PDF-to-Resume Parser
                  </h2>
                  <p className="text-xs text-slate-400">Upload your old PDF resume. We will extract the selectable text inside the sandbox and pass it to Gemini to instantly structure your new profile.</p>
                </div>

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-teal-500 bg-slate-900/40 p-8 rounded-2xl text-center cursor-pointer transition-all group"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="application/pdf"
                    className="hidden" 
                    onChange={handlePdfUpload}
                  />
                  
                  {pdfParsing ? (
                    <div className="space-y-3">
                      <RefreshCw className="w-10 h-10 text-teal-400 animate-spin mx-auto" />
                      <p className="text-sm font-semibold text-slate-300">Extracting and parsing text lines...</p>
                      <p className="text-[11px] text-slate-500">This connects securely to standard Gemini LLM configurations.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <FileText className="w-10 h-10 text-slate-400 group-hover:text-teal-400 transition mx-auto" />
                      <div>
                        <p className="text-sm font-semibold text-slate-200">Click to upload your old PDF resume</p>
                        <p className="text-xs text-slate-400 mt-1">Supports standard selectable PDF formats</p>
                      </div>
                    </div>
                  )}
                </div>

                {pdfError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs flex gap-2 items-start">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{pdfError}</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Personal Details */}
            {activeTab === "personal" && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">Contact Details & Persona</h2>
                  <p className="text-xs text-slate-400">Essential details for hiring managers and automatic scanning filters to match key metrics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={resumeData.personal.fullName}
                      onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Target Professional Title</label>
                    <input 
                      type="text" 
                      value={resumeData.personal.title}
                      onChange={(e) => updatePersonalInfo('title', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={resumeData.personal.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={resumeData.personal.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Location (City, State)</label>
                    <input 
                      type="text" 
                      value={resumeData.personal.location}
                      onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Personal Portfolio / Website</label>
                    <input 
                      type="text" 
                      value={resumeData.personal.website}
                      onChange={(e) => updatePersonalInfo('website', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">LinkedIn Profile Link</label>
                    <input 
                      type="text" 
                      value={resumeData.personal.linkedin}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Professional Profile Summary Block */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-slate-400">Professional Profile Summary</label>
                    <button 
                      type="button"
                      disabled={aiLoading}
                      onClick={handleGenerateSummary}
                      className="flex items-center gap-1 text-[11px] font-bold text-teal-400 hover:text-teal-300 disabled:opacity-50 transition"
                    >
                      {aiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      Generate via AI Summary
                    </button>
                  </div>
                  <textarea 
                    value={resumeData.summary}
                    onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                    className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                    placeholder="Enter summary text..."
                  />
                </div>
              </div>
            )}

            {/* TAB: Work Experience */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">Work Experience</h2>
                    <p className="text-xs text-slate-400">Describe quantifiable achievements and roles.</p>
                  </div>
                  <button 
                    onClick={() => addListItem("experience", {
                      company: "", position: "", location: "", startDate: "", endDate: "", current: false, description: ""
                    })}
                    className="flex items-center gap-1 bg-teal-500/10 hover:bg-teal-500/25 border border-teal-500/30 text-teal-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Job
                  </button>
                </div>

                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl space-y-3 relative group">
                      <div className="absolute top-4 right-4 flex items-center gap-1">
                        <button 
                          onClick={() => moveItem("experience", index, "up")}
                          className="p-1 hover:text-teal-400 text-slate-400"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => moveItem("experience", index, "down")}
                          className="p-1 hover:text-teal-400 text-slate-400"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => removeListItem("experience", index)}
                          className="p-1 hover:text-rose-400 text-slate-400 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-16">
                        <div>
                          <label className="block text-[11px] text-slate-400">Company Name</label>
                          <input 
                            type="text" 
                            value={exp.company}
                            onChange={(e) => handleListUpdate("experience", index, "company", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400">Role / Position</label>
                          <input 
                            type="text" 
                            value={exp.position}
                            onChange={(e) => handleListUpdate("experience", index, "position", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400">Job Location</label>
                          <input 
                            type="text" 
                            value={exp.location || ""}
                            onChange={(e) => handleListUpdate("experience", index, "location", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                            placeholder="e.g. San Francisco, CA"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400">Start Date</label>
                          <input 
                            type="text" 
                            value={exp.startDate}
                            onChange={(e) => handleListUpdate("experience", index, "startDate", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400">End Date</label>
                          <input 
                            type="text" 
                            disabled={exp.current}
                            value={exp.current ? "Present" : exp.endDate}
                            onChange={(e) => handleListUpdate("experience", index, "endDate", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm disabled:opacity-40"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <input 
                          type="checkbox" 
                          id={`current-${index}`} 
                          checked={exp.current}
                          onChange={(e) => handleListUpdate("experience", index, "current", e.target.checked)}
                          className="rounded text-teal-500 focus:ring-0 bg-slate-800 border-slate-700"
                        />
                        <label htmlFor={`current-${index}`} className="text-xs text-slate-300">I currently work here</label>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-[11px] text-slate-400">Achievements (one bullet statement per line)</label>
                          <button 
                            type="button"
                            disabled={aiLoading}
                            onClick={() => handleEnhanceExperience(index)}
                            className="flex items-center gap-1 text-[10px] font-bold text-teal-400 hover:text-teal-300 transition"
                          >
                            <Sparkles className="w-3.5 h-3.5" /> AI Enhance Bullets
                          </button>
                        </div>
                        <textarea 
                          value={exp.description}
                          onChange={(e) => handleListUpdate("experience", index, "description", e.target.value)}
                          className="w-full h-28 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Education */}
            {activeTab === "education" && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">Education History</h2>
                    <p className="text-xs text-slate-400">Highlight your academic credentials.</p>
                  </div>
                  <button 
                    onClick={() => addListItem("education", {
                      institution: "", degree: "", location: "", startDate: "", endDate: "", gpa: ""
                    })}
                    className="flex items-center gap-1 bg-teal-500/10 hover:bg-teal-500/25 border border-teal-500/30 text-teal-400 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Edu
                  </button>
                </div>

                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl space-y-3 relative">
                      <button 
                        onClick={() => removeListItem("education", index)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-10">
                        <div>
                          <label className="block text-[11px] text-slate-400">School / University</label>
                          <input 
                            type="text" 
                            value={edu.institution}
                            onChange={(e) => handleListUpdate("education", index, "institution", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400">Degree Focus</label>
                          <input 
                            type="text" 
                            value={edu.degree}
                            onChange={(e) => handleListUpdate("education", index, "degree", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400">Graduation Year</label>
                          <input 
                            type="text" 
                            value={edu.endDate}
                            onChange={(e) => handleListUpdate("education", index, "endDate", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400">GPA (Optional)</label>
                          <input 
                            type="text" 
                            value={edu.gpa}
                            onChange={(e) => handleListUpdate("education", index, "gpa", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Projects */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">Personal Projects</h2>
                    <p className="text-xs text-slate-400">Add portfolios, tools or independent builds.</p>
                  </div>
                  <button 
                    onClick={() => addListItem("projects", { name: "", role: "", link: "", description: "" })}
                    className="flex items-center gap-1 bg-teal-500/10 hover:bg-teal-500/25 border border-teal-500/30 text-teal-400 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                </div>

                <div className="space-y-4">
                  {resumeData.projects.map((proj, index) => (
                    <div key={proj.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl space-y-3 relative">
                      <button 
                        onClick={() => removeListItem("projects", index)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-10">
                        <div>
                          <label className="block text-[11px] text-slate-400">Project Title</label>
                          <input 
                            type="text" 
                            value={proj.name}
                            onChange={(e) => handleListUpdate("projects", index, "name", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400">Your Role</label>
                          <input 
                            type="text" 
                            value={proj.role}
                            onChange={(e) => handleListUpdate("projects", index, "role", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[11px] text-slate-400">Project Link</label>
                          <input 
                            type="text" 
                            value={proj.link}
                            onChange={(e) => handleListUpdate("projects", index, "link", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Details & Stack</label>
                        <textarea 
                          value={proj.description}
                          onChange={(e) => handleListUpdate("projects", index, "description", e.target.value)}
                          className="w-full h-20 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Technical Skills */}
            {activeTab === "skills" && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">Core Competencies</h2>
                    <p className="text-xs text-slate-400">Group key skills for optimized screening indexing.</p>
                  </div>
                  <button 
                    onClick={() => addListItem("skills", { category: "", items: "" })}
                    className="flex items-center gap-1 bg-teal-500/10 hover:bg-teal-500/25 border border-teal-500/30 text-teal-400 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Category
                  </button>
                </div>

                <div className="space-y-4">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl space-y-2 relative">
                      <button 
                        onClick={() => removeListItem("skills", index)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="pr-10">
                        <label className="block text-[11px] text-slate-400">Skill Category</label>
                        <input 
                          type="text" 
                          value={skill.category}
                          onChange={(e) => handleListUpdate("skills", index, "category", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-teal-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400">Associated Skills (Comma Separated)</label>
                        <textarea 
                          value={skill.items}
                          onChange={(e) => handleListUpdate("skills", index, "items", e.target.value)}
                          className="w-full h-16 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Certifications */}
            {activeTab === "certifications" && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">Professional Credentials</h2>
                    <p className="text-xs text-slate-400">Manage your industry certifications and years earned.</p>
                  </div>
                  <button 
                    onClick={() => addListItem("certifications", { name: "", issuer: "", year: "" })}
                    className="flex items-center gap-1 bg-teal-500/10 hover:bg-teal-500/25 border border-teal-500/30 text-teal-400 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Credential
                  </button>
                </div>

                <div className="space-y-4">
                  {resumeData.certifications?.map((cert, index) => (
                    <div key={cert.id || index} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl space-y-3 relative">
                      <button 
                        onClick={() => removeListItem("certifications", index)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-10">
                        <div>
                          <label className="block text-[11px] text-slate-400">Certification Name</label>
                          <input 
                            type="text" 
                            value={cert.name}
                            onChange={(e) => handleListUpdate("certifications", index, "name", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400">Issuer</label>
                          <input 
                            type="text" 
                            value={cert.issuer}
                            onChange={(e) => handleListUpdate("certifications", index, "issuer", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400">Year Earned</label>
                          <input 
                            type="text" 
                            value={cert.year}
                            onChange={(e) => handleListUpdate("certifications", index, "year", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Design & Styling settings */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">Formatting & Sizing Themes</h2>
                  <p className="text-xs text-slate-400">Customize standard fonts, line spacings, and document margin scale.</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-300">Choose Aesthetic Template Theme</label>
                  <div className="grid grid-cols-1 gap-3">
                    {THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setActiveTheme(theme)}
                        className={`text-left p-4 rounded-xl border transition flex flex-col gap-1.5 ${
                          activeTheme.id === theme.id 
                            ? 'bg-slate-900 border-teal-500 text-teal-400' 
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-755'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full font-bold text-sm">
                          <span>{theme.name}</span>
                          {activeTheme.id === theme.id && <span className="bg-teal-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded">Active</span>}
                        </div>
                        <p className="text-xs text-slate-400">{theme.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizing Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Standard ATS Font</label>
                    <select 
                      value={activeTheme.font}
                      onChange={(e) => setActiveTheme({ ...activeTheme, font: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                    >
                      <option value="Arial">Arial (SANS-SERIF)</option>
                      <option value="Georgia">Georgia (SERIF)</option>
                      <option value="Helvetica">Helvetica (SANS-SERIF)</option>
                      <option value="Calibri">Calibri (STANDARD)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Base Font Sizing</label>
                    <select 
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                    >
                      <option value="xs">Tiny / XS (11px)</option>
                      <option value="sm">Small (12px - Recommended)</option>
                      <option value="base">Normal (14px)</option>
                      <option value="lg">Large (16px)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Line Height Spacing</label>
                    <select 
                      value={lineSpacing}
                      onChange={(e) => setLineSpacing(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                    >
                      <option value="tight">Tight (1.15)</option>
                      <option value="normal">Standard (1.5)</option>
                      <option value="relaxed">Relaxed (1.8)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Page Margin Scale</label>
                    <select 
                      value={pageMargin}
                      onChange={(e) => setPageMargin(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                    >
                      <option value="narrow">Narrow (Maximise content room)</option>
                      <option value="normal">Standard (Standard balance)</option>
                      <option value="generous">Generous (Elegant frame)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Theme Accent Color</label>
                  <div className="flex gap-2">
                    {[
                      { name: "Teal Green", value: "#0f766e" },
                      { name: "Executive Slate", value: "#1e293b" },
                      { name: "Corporate Blue", value: "#2563eb" },
                      { name: "Classic Gold", value: "#b45309" },
                      { name: "Crimson Red", value: "#be123c" }
                    ].map(col => (
                      <button 
                        key={col.value}
                        onClick={() => setActiveTheme({ ...activeTheme, colors: { ...activeTheme.colors, primary: col.value } })}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${activeTheme.colors.primary === col.value ? 'border-teal-400 scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: col.value }}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Real-Time ATS Score & Diagnostics */}
            {activeTab === "ai-audit" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal-400" />
                    Gemini AI Workspace & Audits
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">Use elite Gemini 3 Flash models to score, morph tones, tailor to JDs, and prep for interviews.</p>
                </div>

                {/* Sub-tab Navigation */}
                <div className="flex border-b border-slate-850 gap-2 pb-2">
                  {[
                    { id: "audit", label: "Dynamic Audit" },
                    { id: "tailor", label: "Job Tailor" },
                    { id: "tone", label: "Tone Morpher" },
                    { id: "prep", label: "Interview Prep" }
                  ].map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveAiSubTab(sub.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                        activeAiSubTab === sub.id 
                          ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                {/* Sub-tab content: Audit */}
                {activeAiSubTab === "audit" && (
                  <div className="space-y-4">
                    {/* Score Dial Display Card */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center font-black text-xl bg-slate-950"
                          style={{ 
                            borderColor: localAtsEvaluation.score >= 80 ? '#10b981' : localAtsEvaluation.score >= 60 ? '#f59e0b' : '#f43f5e',
                            color: localAtsEvaluation.score >= 80 ? '#10b981' : localAtsEvaluation.score >= 60 ? '#f59e0b' : '#f43f5e'
                          }}
                        >
                          {localAtsEvaluation.score}%
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-200">Interactive ATS Compliance</h3>
                          <p className="text-xs text-slate-400">Dynamic score updates immediately as you edit.</p>
                        </div>
                      </div>
                      <button
                        onClick={handleScanAtsOptimizations}
                        disabled={aiLoading}
                        className="w-full md:w-auto bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
                      >
                        {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        Deep Gemini Audit
                      </button>
                    </div>

                    {/* Local Diagnostics List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <ListChecks className="w-4 h-4" /> Live Compatibility Checks
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                        {localAtsEvaluation.diagnostics.map((diag, index) => (
                          <div 
                            key={index} 
                            className={`flex items-start gap-2.5 p-3 rounded-xl text-xs border ${
                              diag.type === 'pass' 
                                ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-300' 
                                : diag.type === 'warn' 
                                  ? 'bg-amber-500/5 border-amber-500/10 text-amber-300' 
                                  : 'bg-rose-500/5 border-rose-500/10 text-rose-300'
                            }`}
                          >
                            <span className="text-lg leading-none mt-0.5">
                              {diag.type === 'pass' ? '✓' : diag.type === 'warn' ? '⚠' : '✗'}
                            </span>
                            <div>{diag.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deep Gemini Feedback (if loaded) */}
                    {aiFeedback && (
                      <div className="pt-4 border-t border-slate-800 space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-teal-400" /> Deep AI Semantic Audit Output
                        </h4>
                        
                        <div className="space-y-3">
                          <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl text-xs space-y-1">
                            <strong className="text-emerald-400 block">✓ ATS Structural Highlights:</strong>
                            {aiFeedback.positives?.map((pos, idx) => (
                              <div key={idx} className="pl-3 relative before:content-['•'] before:absolute before:left-0 text-slate-300">{pos}</div>
                            ))}
                          </div>

                          <div className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl text-xs space-y-1">
                            <strong className="text-amber-400 block">⚠ Recommended Optimizations:</strong>
                            {aiFeedback.improvements?.map((imp, idx) => (
                              <div key={idx} className="pl-3 relative before:content-['•'] before:absolute before:left-0 text-slate-300">{imp}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-tab content: Tailor */}
                {activeAiSubTab === "tailor" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Target Job Description</label>
                      <p className="text-[11px] text-slate-500 mb-2">Paste the job description of your target role. Gemini will tailor your resume summary and map direct skill recommendations.</p>
                      <textarea
                        value={targetJobDescription}
                        onChange={(e) => setTargetJobDescription(e.target.value)}
                        className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                        placeholder="Paste the target job description here..."
                      />
                    </div>

                    <button
                      onClick={handleTailorResume}
                      disabled={aiLoading}
                      className="w-full bg-teal-500 text-slate-950 font-bold py-2.5 rounded-lg text-xs hover:bg-teal-400 transition flex items-center justify-center gap-2"
                    >
                      {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Align Resume with Job Description
                    </button>

                    {tailoringResult && (
                      <div className="space-y-4 mt-4 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-300">Target Match Score</span>
                          <span className="text-xl font-extrabold text-teal-400">{tailoringResult.matchScore}%</span>
                        </div>

                        {tailoringResult.missingKeywords && tailoringResult.missingKeywords.length > 0 && (
                          <div>
                            <strong className="text-xs text-amber-400 block mb-1">⚠️ Missing Key Target Terms:</strong>
                            <div className="flex flex-wrap gap-1.5">
                              {tailoringResult.missingKeywords.map((kw, i) => (
                                <span key={i} className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/25">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {tailoringResult.tailoredSummary && (
                          <div className="border-t border-slate-800 pt-3">
                            <div className="flex justify-between items-center mb-1">
                              <strong className="text-xs text-teal-400">✨ Recommended Tailored Summary:</strong>
                              <button
                                onClick={applyTailoredSummary}
                                className="text-[10px] bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 px-2.5 py-1 rounded transition border border-teal-500/20 font-semibold"
                              >
                                Apply Summary
                              </button>
                            </div>
                            <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800 italic leading-relaxed">
                              {tailoringResult.tailoredSummary}
                            </p>
                          </div>
                        )}

                        {tailoringResult.bulletSuggestions && tailoringResult.bulletSuggestions.length > 0 && (
                          <div className="border-t border-slate-800 pt-3 space-y-3">
                            <strong className="text-xs text-teal-400 block">✨ Bullet Keyword Optimizations:</strong>
                            {tailoringResult.bulletSuggestions.map((sug, idx) => (
                              <div key={idx} className="bg-slate-950 p-2.5 rounded border border-slate-800 text-xs space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-bold text-slate-400">{sug.jobCompany}</span>
                                  <button
                                    onClick={() => applyTailoredBullet(sug.jobCompany, sug.originalBullet, sug.suggestedBullet)}
                                    className="text-[9px] text-teal-400 hover:underline"
                                  >
                                    Replace Bullet
                                  </button>
                                </div>
                                <p className="text-rose-400/80 line-through text-[10px]">- {sug.originalBullet}</p>
                                <p className="text-emerald-400 text-[10.5px]">- {sug.suggestedBullet}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-tab content: Tone Morpher */}
                {activeAiSubTab === "tone" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Target Professional Tone</label>
                      <p className="text-[11px] text-slate-500 mb-2">Select a strategic tone context. Gemini will rewrite the Summary and Experience sections to deliver a highly distinct and targeted copy voice.</p>
                      <select
                        value={selectedTone}
                        onChange={(e) => setSelectedTone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                      >
                        <option value="executive">Executive & Leadership (Metrics/Strategy focused)</option>
                        <option value="specialist">Technical Specialist (Deep tool/skill focused)</option>
                        <option value="startup">Startup Professional (Agile/Velocity focused)</option>
                        <option value="academic">Academic / Formal (Structured/Scientific focused)</option>
                      </select>
                    </div>

                    <button
                      onClick={handleMorphTone}
                      disabled={aiLoading}
                      className="w-full bg-teal-500 text-slate-950 font-bold py-2.5 rounded-lg text-xs hover:bg-teal-400 transition flex items-center justify-center gap-2"
                    >
                      {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Morph Entire Resume Tone
                    </button>
                  </div>
                )}

                {/* Sub-tab content: Interview Prep */}
                {activeAiSubTab === "prep" && (
                  <div className="space-y-4">
                    <p className="text-[11px] text-slate-500">Gemini will generate highly relevant technical and behavioral questions based strictly on your projects and experiences to help you prep with elite strategies.</p>
                    <button
                      onClick={handleGeneratePrepQuestions}
                      disabled={aiLoading}
                      className="w-full bg-teal-500 text-slate-950 font-bold py-2.5 rounded-lg text-xs hover:bg-teal-400 transition flex items-center justify-center gap-2"
                    >
                      {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Generate Interview Prep Questions
                    </button>

                    {interviewPrep && (
                      <div className="space-y-4 mt-4">
                        {interviewPrep.behavioralQuestions && interviewPrep.behavioralQuestions.length > 0 && (
                          <div className="space-y-2">
                            <strong className="text-xs text-teal-400 block">Behavioral Interview Questions:</strong>
                            {interviewPrep.behavioralQuestions.map((q, i) => (
                              <div key={i} className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                                <p className="font-semibold text-slate-200">Q: {q.question || q}</p>
                                {q.hiringManagerTip && (
                                  <p className="text-[10px] text-teal-300 mt-1.5 italic bg-teal-500/5 p-1.5 rounded border border-teal-500/10">
                                    💡 Recruiter Strategy: {q.hiringManagerTip}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {interviewPrep.technicalQuestions && interviewPrep.technicalQuestions.length > 0 && (
                          <div className="space-y-2">
                            <strong className="text-xs text-amber-400 block">Technical Deep-Dives:</strong>
                            {interviewPrep.technicalQuestions.map((q, i) => (
                              <div key={i} className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                                <p className="font-semibold text-slate-200">Q: {q.question || q}</p>
                                {q.keyConceptToMention && (
                                  <p className="text-[10px] text-amber-300 mt-1.5 italic bg-amber-500/5 p-1.5 rounded border border-amber-500/10">
                                    🔧 Key Terms to Include: {q.keyConceptToMention}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        </aside>

        {/* Right Panel: Live Resume Preview Sheet */}
        <main className="flex-1 bg-slate-900 flex justify-center overflow-y-auto p-4 md:p-8 print:p-0 print:bg-white print:overflow-visible">
          <div
            id="ats-resume-printable-doc"
            className={`w-full max-w-[800px] min-h-[1050px] bg-white text-slate-900 shadow-2xl transition-all print:shadow-none print:p-0 print:m-0 print:w-full print:min-h-0 ${getFontFamily()} ${getMarginClass()} ${getFontSizeClass()} ${getLineSpacingClass()}`}
            style={{
              color: activeTheme.colors.text
            }}
          >
            {/* Styling overrides */}
            <style>{`
              @media print {
                body {
                  background: white !important;
                  color: #000 !important;
                }
                nav, aside, header, button {
                  display: none !important;
                }
                #ats-resume-printable-doc {
                  padding: 0 !important;
                  margin: 0 !important;
                  box-shadow: none !important;
                  width: 100% !important;
                  max-width: 100% !important;
                }
              }
            `}</style>

            {/* Document Header */}
            <header className={`border-b-2 pb-5 mb-5 ${activeTheme.headerAlignment === 'center' ? 'text-center' : 'text-left'}`} style={{ borderColor: activeTheme.colors.primary }}>
              <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: activeTheme.colors.primary }}>
                {resumeData.personal.fullName || "Your Full Name"}
              </h1>
              <p className="text-base font-semibold mt-1 tracking-wide" style={{ color: activeTheme.colors.secondary }}>
                {resumeData.personal.title || "Professional Role / Field"}
              </p>

              <div className={`flex flex-wrap gap-x-4 gap-y-1.5 mt-3 justify-start ${activeTheme.headerAlignment === 'center' ? 'justify-center' : 'justify-start'}`}>
                {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                {resumeData.personal.email && <span>• &nbsp;<a href={`mailto:${resumeData.personal.email}`} className="underline">{resumeData.personal.email}</a></span>}
                {resumeData.personal.location && <span>• &nbsp;{resumeData.personal.location}</span>}
                {resumeData.personal.website && <span>• &nbsp;<a href={resumeData.personal.website} target="_blank" rel="noreferrer" className="underline">{resumeData.personal.website.replace(/^https?:\/\//, '')}</a></span>}
                {resumeData.personal.linkedin && <span>• &nbsp;<a href={resumeData.personal.linkedin} target="_blank" rel="noreferrer" className="underline">{resumeData.personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</a></span>}
              </div>
            </header>

            {/* Content Grid */}
            <div className={`gap-6 ${activeTheme.layout === 'double' ? 'grid grid-cols-1 md:grid-cols-3' : 'space-y-6'}`}>
              
              {/* Main/Left Column */}
              <div className={activeTheme.layout === 'double' ? 'md:col-span-2 space-y-6' : 'space-y-6'}>
                {resumeData.summary && (
                  <section className="space-y-1.5">
                    <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1 flex items-center" style={{ color: activeTheme.colors.primary, borderColor: activeTheme.colors.secondary + '33' }}>
                      Professional Summary
                    </h2>
                    <p className="text-justify">
                      {resumeData.summary}
                    </p>
                  </section>
                )}

                {resumeData.experience.length > 0 && (
                  <section className="space-y-3">
                    <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1" style={{ color: activeTheme.colors.primary, borderColor: activeTheme.colors.secondary + '33' }}>
                      Work Experience
                    </h2>
                    <div className="space-y-4">
                      {resumeData.experience.map((exp) => (
                        <div key={exp.id} className="space-y-1">
                          <div className="flex justify-between items-start flex-wrap gap-1">
                            <div>
                              <span className="font-bold block md:inline-block pr-1">{exp.position}</span>
                              <span className="italic" style={{ color: activeTheme.colors.secondary }}>| {exp.company}</span>
                            </div>
                            <div className="font-medium whitespace-nowrap">
                              {exp.startDate} – {exp.current ? "Present" : exp.endDate} {exp.location && `(${exp.location})`}
                            </div>
                          </div>
                          {exp.description && (
                            <ul className="list-disc list-inside space-y-1 mt-1">
                              {exp.description.split('\n').filter(line => line.trim().length > 0).map((line, lidx) => (
                                <li key={lidx} className="pl-1 text-justify">
                                  {line.replace(/^-\s*/, '')}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {resumeData.projects.length > 0 && (
                  <section className="space-y-3">
                    <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1" style={{ color: activeTheme.colors.primary, borderColor: activeTheme.colors.secondary + '33' }}>
                      Selected Projects
                    </h2>
                    <div className="space-y-3">
                      {resumeData.projects.map((proj) => (
                        <div key={proj.id} className="space-y-1">
                          <div className="flex justify-between items-start flex-wrap">
                            <span className="font-bold">{proj.name} {proj.role && <span className="font-normal italic">– {proj.role}</span>}</span>
                            {proj.link && <span className="underline text-slate-600">{proj.link.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                          </div>
                          <p className="text-justify">
                            {proj.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right/Sidebar Column */}
              <div className={`space-y-6 ${activeTheme.layout === 'double' ? 'md:col-span-1 border-l pl-4 md:border-slate-200' : 'space-y-6'}`}>
                {resumeData.skills.length > 0 && (
                  <section className="space-y-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1" style={{ color: activeTheme.colors.primary, borderColor: activeTheme.colors.secondary + '33' }}>
                      Technical Skills
                    </h2>
                    <div className="space-y-2">
                      {resumeData.skills.map((skill, sIdx) => (
                        <div key={sIdx}>
                          <span className="font-bold block text-slate-850">{skill.category}:</span>
                          <span className="text-slate-600">{skill.items}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {resumeData.education.length > 0 && (
                  <section className="space-y-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1" style={{ color: activeTheme.colors.primary, borderColor: activeTheme.colors.secondary + '33' }}>
                      Education
                    </h2>
                    <div className="space-y-3">
                      {resumeData.education.map((edu) => (
                        <div key={edu.id} className="space-y-0.5">
                          <div className="font-bold">{edu.degree}</div>
                          <div className="text-slate-600 font-medium">{edu.institution}</div>
                          <div className="flex justify-between text-slate-500 italic">
                            <span>Class of {edu.endDate}</span>
                            {edu.gpa && <span>GPA: {edu.gpa}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {resumeData.certifications && resumeData.certifications.length > 0 && (
                  <section className="space-y-2">
                    <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1" style={{ color: activeTheme.colors.primary, borderColor: activeTheme.colors.secondary + '33' }}>
                      Certifications
                    </h2>
                    <div className="space-y-1.5">
                      {resumeData.certifications.map((cert, cIdx) => (
                        <div key={cert.id || cIdx} className="flex justify-between">
                          <div>
                            <span className="font-bold block">{cert.name}</span>
                            <span className="text-slate-500 text-[11px]">{cert.issuer}</span>
                          </div>
                          <span className="text-slate-500 font-medium whitespace-nowrap">{cert.year}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

            </div>
          </div>
        </main>

      </div>
    </div>
  );
}