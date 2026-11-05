import type {
  ContentInput,
  GeneratedContent,
  LinkedInPost,
  TwitterThread,
  NewsletterSummary,
  VideoHook,
  AIServiceConfig,
} from '../types';

const MOCK_DELAY = 1500;

const MOCK_RESPONSES: Record<string, GeneratedContent> = {
  professional: {
    linkedin: {
      hook: "The biggest mistake I see professionals make? Thinking 'busy' equals 'productive.'",
      body: "After 10 years building teams at scale, I've learned that impact comes from ruthless prioritization, not packed calendars. The highest performers I've worked with share one trait: they say 'no' to good opportunities so they can say 'yes' to great ones.\n\nThis isn't about doing less. It's about doing what matters. Every meeting you attend, every project you take on, every 'quick sync' you agree to — it all compounds. The question isn't 'can I fit this in?' It's 'does this move the needle?'\n\nStart each week by identifying your 3 non-negotiables. Everything else is negotiable.",
      hashtags: ["#Leadership", "#Productivity", "#Prioritization", "#HighPerformance", "#Management"],
      callToAction: "What's the one thing you're saying 'no' to this week? Drop it in the comments 👇",
    },
    twitter: {
      hook: "The 'busy trap' is the silent killer of careers. 🧵",
      tweets: [
        "Most people confuse motion with progress. A packed calendar feels productive. An empty one feels lazy. But the highest leverage work happens in the whitespace.",
        "I've advised 50+ founders. The ones who scale fastest? They protect 4 hours of deep work daily. No meetings. No Slack. No email. Just building.",
        "The math is simple: 4 hours × 5 days = 20 hours of compounding progress per week. That's 1,000 hours a year. Most people waste that in 'syncs.'",
        "Your calendar is a reflection of your priorities. If 'strategic thinking' isn't on it, it's not a priority — it's a wish.",
        "Pro tip: Block 'Focus Time' first. Let everything else flow around it. Your future self will thank you.",
      ],
      callToAction: "Retweet if you're protecting your deep work time today. 🔁",
    },
    newsletter: {
      subjectLine: "Why 'Busy' Is the New 'Lazy' (and what to do instead)",
      preheader: "The counterintuitive truth about high-performance that nobody talks about",
      body: "Hey there,\n\nLast week, a founder I advise showed me his calendar. Back-to-back meetings from 8 AM to 6 PM. 'I'm crushing it,' he said.\n\nI asked: 'When do you think?'\n\nSilence.\n\nHere's the uncomfortable truth: Being busy is often a form of laziness. It's easier to say 'yes' to every meeting than to do the hard work of deciding what actually matters.\n\nReal productivity looks different:\n• 4 hours of uninterrupted deep work\n• 2 hours of high-leverage conversations\n• 1 hour of strategic review\n• The rest? Delegated, automated, or deleted.\n\nThe best operators I know have surprisingly empty calendars. Not because they do less — because they do only what moves the needle.\n\nTry this Monday: Block your 3 non-negotiables first. Let the chaos arrange itself around your priorities.\n\nTo your focus,\nThe Repurposr Team",
      cta: "Reply and tell me: What's your #1 non-negotiable this week?",
    },
    video: [
      {
        hook: "Stop saying yes to everything. Here's why 'busy' is actually lazy...",
        visualCue: "Split screen: chaotic calendar vs. 3-item priority list",
        duration: "5s",
      },
      {
        hook: "The 4-hour rule that 10x'd my clients' output (steal this)",
        visualCue: "Timer counting down 4:00:00 with 'DEEP WORK' label",
        duration: "5s",
      },
      {
        hook: "Your calendar is lying to you. Here's what it SHOULD look like...",
        visualCue: "Before/after calendar transformation animation",
        duration: "5s",
      },
    ],
  },
  casual: {
    linkedin: {
      hook: "Real talk: I used to wear 'busy' like a badge of honor. 🤷‍♂️",
      body: "Turns out, being busy just meant I was bad at saying no. Last year I started blocking 3 hours every morning for actual work — no meetings, no Slack, no email. Just the stuff that moves the needle.\n\nThe difference? Night and day. My output doubled. My stress halved. And honestly? I finally have time for the things that matter outside of work too.\n\nIf your calendar controls you, you're not leading — you're reacting. Take it back.",
      hashtags: ["#WorkLifeBalance", "#Productivity", "#Boundaries", "#DeepWork", "#RealTalk"],
      callToAction: "What would you do with 3 uninterrupted hours each morning? 👇",
    },
    twitter: {
      hook: "Hot take: Being busy is a flex for people who don't know how to prioritize. 🧵",
      tweets: [
        "Used to humble-brag about my packed calendar. 'So busy!' 'Crazy week!' Meanwhile I was just... tired. And not actually moving anything forward.",
        "Started time-blocking 3 hours of 'do not disturb' every morning. No meetings. No notifications. Just the ONE thing that matters most that day.",
        "First week felt weird. FOMO was real. But by Friday I'd shipped more than I had in the previous month.",
        "Now? That block is non-negotiable. Meetings get scheduled around it. Slack waits. The world keeps spinning.",
        "Moral: You don't need more time. You need better boundaries.",
      ],
      callToAction: "Quote tweet with your #1 time-management hack 👇",
    },
    newsletter: {
      subjectLine: "I stopped being 'busy' and started getting things done",
      preheader: "How 3 hours of 'no meetings' changed everything",
      body: "Hey friend,\n\nConfession: I used to be THAT person. The one who says 'so busy!' like it's a personality trait. Wears the packed calendar like a medal.\n\nSpoiler: It wasn't a medal. It was a cage.\n\nLast year I tried something wild. I blocked 3 hours every morning — 9 AM to noon — and labeled it 'Focus Time.' No meetings allowed. No Slack. No email. Just me and the one thing that actually matters.\n\nFirst few days? Uncomfortable. I kept checking my phone. Wondering what I was missing.\n\nBut then... magic happened. I started finishing things. Big things. The kind that sit on your to-do list for months.\n\nTurns out, 'busy' is just what it looks like when you're avoiding the hard decisions about what matters.\n\nAnyway, try it. Block 3 hours. Tell people you're in 'monk mode.' See what happens.\n\nCatch you later,\n[Your Name]",
      cta: "Hit reply — what's the one thing you'd tackle with 3 free hours?",
    },
    video: [
      {
        hook: "I was 'so busy' but getting nothing done. Here's what changed...",
        visualCue: "Phone screen showing '147 unread Slack messages' → peaceful desk",
        duration: "5s",
      },
      {
        hook: "The 'Monk Mode' morning routine that 2x'd my output",
        visualCue: "Coffee → noise-canceling headphones → 'Focus Time' calendar block",
        duration: "5s",
      },
      {
        hook: "Your calendar is NOT your boss. Here's how to prove it...",
        visualCue: "Dramatic calendar delete animation → 'Focus Time' block appears",
        duration: "5s",
      },
    ],
  },
  educational: {
    linkedin: {
      hook: "Framework: The Eisenhower Matrix — but make it actually work for modern knowledge work.",
      body: "The classic 2x2 (Urgent vs. Important) fails because everything feels urgent in Slack-era workplaces. Here's the modified version I teach every new manager:\n\n🔴 DO NOW: Important + Time-sensitive (crises, deadlines, blockers)\n🟡 SCHEDULE: Important + Not time-sensitive (strategy, skill-building, relationships) ← THIS IS WHERE GROWTH LIVES\n🟢 DELEGATE: Not important + Time-sensitive (most meetings, FYI emails, interruptions)\n⚪ DELETE: Not important + Not time-sensitive (doom-scrolling, busywork, perfectionism)\n\nThe trap? We live in 🟡 but get pulled into 🟢. The fix? Time-block 🟡 first. Treat it like a meeting with your most important client: yourself.\n\nPro tip: Color-code your calendar. If you don't see yellow blocks, you're not growing.",
      hashtags: ["#Frameworks", "#TimeManagement", "#Leadership", "#Productivity", "#ManagementTips"],
      callToAction: "Save this framework. Which quadrant owns your calendar right now? 👇",
    },
    twitter: {
      hook: "The Eisenhower Matrix is broken for modern work. Here's the fix: 🧵",
      tweets: [
        "Classic version: Urgent vs. Important. Problem: In 2024, EVERYTHING feels urgent. Slack pings. 'Quick questions.' 'Can you hop on a call?' The matrix collapses.",
        "Modified version for knowledge workers:\n🔴 DO: Critical + Deadline-driven\n🟡 SCHEDULE: High-leverage + No deadline (strategy, learning, relationships)\n🟢 DELEGATE: Low-leverage + Deadline-driven (most meetings, FYIs)\n⚪ DELETE: Low-leverage + No deadline",
        "The insight: 🟡 (Schedule) is where ALL growth happens. But it has no deadline, so it never gets done. Unless you MAKE it urgent by time-blocking it.",
        "My rule: Yellow blocks go on the calendar FIRST. Every Monday. 3-4 blocks minimum. Everything else — meetings, email, fires — flows around them.",
        "Result: You stop reacting. Start directing. The 'urgent' stuff still gets done (or delegated). But the important stuff finally gets DONE.",
      ],
      callToAction: "Bookmark this thread. Monday morning, block your yellow time first. 📅",
    },
    newsletter: {
      subjectLine: "The Eisenhower Matrix is broken. Here's the modern fix.",
      preheader: "Why 'Urgent vs Important' fails in the Slack era — and the 4-quadrant framework that works",
      body: "Hey there,\n\nThe Eisenhower Matrix is everywhere. Urgent vs. Important. Do, Schedule, Delegate, Delete.\n\nClean theory. Broken practice.\n\nWhy? Because in the age of Slack, Teams, and 'quick syncs,' everything presents as urgent. The ping. The notification. The 'got a sec?' Everything screams 'NOW.'\n\nSo the matrix collapses. You end up in 'Do' mode 12 hours a day. 'Schedule' (where growth lives) becomes a myth.\n\nHere's the framework I use with every team I advise:\n\n🔴 EXECUTE — Critical outcomes with hard deadlines\n   Launches, crises, legal/compliance, client deliverables\n\n🟡 INVEST — High-leverage, no deadline (THE GROWTH ZONE)\n   Strategy, skill acquisition, key relationships, system building\n   → TIME-BLOCK THIS FIRST. 3-4 blocks/week. Non-negotiable.\n\n🟢 OFFLOAD — Someone else's priority with a deadline\n   Most meetings, FYI threads, 'can you review this?'\n   → Delegate, automate, or batch into 1 daily window\n\n⚪ ELIMINATE — No one's priority, no deadline\n   Doom scrolling, perfectionism, busywork disguised as work\n   → Ruthlessly cut\n\nThe shift: Stop asking 'Is this urgent?' Start asking 'Which quadrant is this?'\n\nIf the answer is 🟡 — put it on the calendar. Now.\n\nTo better decisions,\nThe Repurposr Team",
      cta: "Reply with your current quadrant breakdown — I read every response.",
    },
    video: [
      {
        hook: "Why the Eisenhower Matrix FAILS in 2024 (and the fix)",
        visualCue: "Classic 2x2 matrix → glitches → modern 4-quadrant version appears",
        duration: "5s",
      },
      {
        hook: "The 'Yellow Zone' secret: Where all career growth actually happens",
        visualCue: "Calendar with yellow 'INVEST' blocks highlighted vs. empty calendar",
        duration: "5s",
      },
      {
        hook: "Stop asking 'Is this urgent?' Ask THIS instead...",
        visualCue: "Decision flowchart: Task → Quadrant? → Action (Do/Schedule/Delegate/Delete)",
        duration: "5s",
      },
    ],
  },
  engaging: {
    linkedin: {
      hook: "I asked 100 high performers: 'What's the #1 habit that changed your career?' The answer surprised me.",
      body: "It wasn't 'wake up at 5 AM.'\nIt wasn't 'read 50 books a year.'\nIt wasn't even 'network relentlessly.'\n\nThe #1 answer: **They protect 3-4 hours of uninterrupted focus time. Every. Single. Day.**\n\nNo meetings. No Slack. No email. No exceptions.\n\nOne VP of Engineering told me: 'I treat that block like a board meeting. I'd never cancel on the board. Why would I cancel on the work that actually creates value?'\n\nAnother founder: 'My team knows 9-12 is sacred. If the building's on fire, text me. Otherwise? It waits.'\n\nThe pattern is undeniable. The people who seem to 'have it all figured out'? They've just made a boring, unsexy decision: the work that matters gets the best hours.\n\nEverything else gets the leftovers.\n\nSimple. Not easy. But simple.",
      hashtags: ["#HighPerformance", "#Habits", "#Focus", "#CareerGrowth", "#Leadership"],
      callToAction: "What's YOUR non-negotiable daily habit? Let's build a list in the comments 👇",
    },
    twitter: {
      hook: "Asked 100 high performers their #1 career habit. The answer wasn't what I expected. 🧵",
      tweets: [
        "Expected: 'Wake up at 5 AM,' 'Read 50 books/year,' 'Cold email 10 people daily.'\n\nActual #1 answer: 'I protect 3-4 hours of zero-distraction focus time. Every day. No exceptions.'",
        "A VP Eng at a unicorn: 'That block is a board meeting. I don't cancel board meetings. Why cancel on the work that creates the value?'",
        "A 3x founder: '9-12 is sacred. Team knows: building on fire? Text me. Else? It waits.'",
        "A bestselling author: 'I write 1000 words before I check email. The world can wait 2 hours for my best work.'",
        "The pattern: They don't 'find time.' They MAKE time. And they defend it like their career depends on it — because it does.",
      ],
      callToAction: "What's your sacred time block? Reply 👇",
    },
    newsletter: {
      subjectLine: "I surveyed 100 high performers. Their #1 habit? Boring but brutal.",
      preheader: "It's not 5 AM wakeups or 50 books/year. It's something anyone can do — but almost no one does.",
      body: "Hey,\n\nLast month I asked 100 people I'd consider 'high performers' — founders, executives, creators, investors — one question:\n\n'What's the single habit that changed your career?'\n\nI expected the usual: Morning routines. Reading goals. Networking systems.\n\nI was wrong.\n\nThe #1 answer, by a landslide:\n\n**'I protect 3-4 hours of uninterrupted focus time. Every day. No exceptions.'**\n\nNot 'I try to.' Not 'most days.' EVERY DAY. NO EXCEPTIONS.\n\nA VP of Engineering at a unicorn put it perfectly: 'That block is a board meeting. I'd never cancel on the board. Why would I cancel on the work that actually creates value?'\n\nA 3x founder: '9 AM to noon is sacred. My team knows: building on fire? Text me. Otherwise it waits.'\n\nA bestselling author: 'I write 1,000 words before I check email. The world can wait 2 hours for my best work.'\n\nThe pattern is undeniable. The people who seem to 'have it figured out' have just made one boring, unsexy decision:\n\n**The work that matters gets the best hours. Everything else gets the leftovers.**\n\nSimple. Not easy. But simple.\n\nWhat's your non-negotiable?\n\n— The Repurposr Team",
      cta: "Hit reply — what's the one block you'd defend with your life?",
    },
    video: [
      {
        hook: "I asked 100 successful people their #1 habit. The answer shocked me...",
        visualCue: "Montage: 5 AM alarm ❌, 50 books ❌, Calendar block 'FOCUS' ✅",
        duration: "5s",
      },
      {
        hook: "The 'Board Meeting' rule: Why top performers never cancel this block",
        visualCue: "Calendar: 'Board Meeting' → crossed out → 'Deep Work' → shield icon appears",
        duration: "5s",
      },
      {
        hook: "Your career depends on 3 hours. Here's how to claim them...",
        visualCue: "Clock 9:00 → 12:00 with 'MINE' stamp, notifications bouncing off shield",
        duration: "5s",
      },
    ],
  },
};

function getMockResponse(contentType: string): GeneratedContent {
  return MOCK_RESPONSES[contentType] || MOCK_RESPONSES.professional;
}

function buildPrompt(input: ContentInput): string {
  const typeGuidance = {
    professional: 'Write in a polished, authoritative thought-leadership tone. Use professional formatting with clear structure. Include relevant industry hashtags.',
    casual: 'Write in a conversational, relatable tone like talking to a friend over coffee. Use contractions, personal anecdotes, and casual language.',
    educational: 'Write in an instructional, value-packed tone. Use frameworks, step-by-step breakdowns, and actionable takeaways. Teach something specific.',
    engaging: 'Write in a hook-heavy, story-driven tone that maximizes engagement. Use curiosity gaps, surprising data, and strong calls to action.',
  };

  return `You are an expert content strategist. Transform the following raw content into platform-optimized pieces.

RAW CONTENT:
${input.rawText}

CONTENT TYPE: ${input.contentType.toUpperCase()}
STYLE GUIDANCE: ${typeGuidance[input.contentType]}

Generate content for these 4 platforms:

1. LINKEDIN POST:
   - Hook (1-2 sentences, grabs attention)
   - Body (3-5 paragraphs, professional insights)
   - 5-8 relevant hashtags
   - Call-to-action (question to drive comments)

2. X/TWITTER THREAD:
   - Hook tweet (compelling, under 280 chars)
   - 5-7 body tweets (each under 280 chars, numbered)
   - Closing call-to-action tweet

3. NEWSLETTER SUMMARY:
   - Subject line (compelling, under 50 chars)
   - Preheader (preview text, under 100 chars)
   - Body (structured with clear sections, conversational)
   - CTA (clear next step)

4. SHORT-FORM VIDEO HOOKS (3 hooks):
   - Hook text (first 3 seconds, punchy)
   - Visual cue description
   - Duration (always "5s")

Return ONLY valid JSON matching this exact structure:
{
  "linkedin": {"hook": "", "body": "", "hashtags": [], "callToAction": ""},
  "twitter": {"hook": "", "tweets": [], "callToAction": ""},
  "newsletter": {"subjectLine": "", "preheader": "", "body": "", "cta": ""},
  "video": [{"hook": "", "visualCue": "", "duration": "5s"}, {"hook": "", "visualCue": "", "duration": "5s"}, {"hook": "", "visualCue": "", "duration": "5s"}]
}`;
}

async function callLLMApi(prompt: string, config: AIServiceConfig): Promise<string> {
  const { provider, apiKey, baseUrl, model } = config;

  if (!apiKey || apiKey.trim() === '') {
    throw new Error('API key is required. Please configure your API key in Settings.');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  let url: string;
  let body: Record<string, unknown>;

  switch (provider) {
    case 'openai':
      url = baseUrl || 'https://api.openai.com/v1/chat/completions';
      headers['Authorization'] = `Bearer ${apiKey}`;
      body = {
        model: model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert content strategist. Return only valid JSON.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 3000,
        response_format: { type: 'json_object' },
      };
      break;

    case 'anthropic':
      url = baseUrl || 'https://api.anthropic.com/v1/messages';
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      body = {
        model: model || 'claude-3-haiku-20240307',
        max_tokens: 3000,
        temperature: 0.7,
        system: 'You are an expert content strategist. Return only valid JSON.',
        messages: [{ role: 'user', content: prompt }],
      };
      break;

    case 'custom':
      if (!baseUrl) throw new Error('Custom provider requires a base URL');
      url = baseUrl;
      headers['Authorization'] = `Bearer ${apiKey}`;
      body = {
        model: model || 'default',
        messages: [
          { role: 'system', content: 'You are an expert content strategist. Return only valid JSON.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      };
      break;

    default:
      throw new Error(`Unknown provider: ${provider}`);
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (provider === 'anthropic') {
    return data.content[0]?.text || '';
  }

  return data.choices[0]?.message?.content || '';
}

function parseAndValidateResponse(text: string): GeneratedContent {
  try {
    const parsed = JSON.parse(text);

    const requiredFields = ['linkedin', 'twitter', 'newsletter', 'video'];
    for (const field of requiredFields) {
      if (!parsed[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (!Array.isArray(parsed.video) || parsed.video.length !== 3) {
      throw new Error('Video must be an array of 3 hooks');
    }

    return parsed as GeneratedContent;
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    throw new Error('Invalid response format from AI. Please try again.');
  }
}

export async function generateContent(input: ContentInput, config: AIServiceConfig): Promise<GeneratedContent> {
  if (!config.apiKey || config.apiKey.trim() === '') {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
    return getMockResponse(input.contentType);
  }

  const prompt = buildPrompt(input);

  try {
    const responseText = await callLLMApi(prompt, config);
    return parseAndValidateResponse(responseText);
  } catch (error) {
    console.error('AI generation failed, falling back to mock:', error);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getMockResponse(input.contentType);
  }
}

export function getDefaultConfig(): AIServiceConfig {
  const stored = localStorage.getItem('repurposr_ai_config');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Ignore parse errors
    }
  }
  return {
    provider: 'openai',
    apiKey: '',
    model: 'gpt-4o-mini',
  };
}

export function saveConfig(config: AIServiceConfig): void {
  localStorage.setItem('repurposr_ai_config', JSON.stringify(config));
}