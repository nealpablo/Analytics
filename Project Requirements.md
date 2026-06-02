ANLYTC4: Final Project Requirement
Building Your Own AI Agent (Agentic AI System)
Course Final Project
Students will design and implement an individual AI Agent capable of performing a specific task autonomously or semi-autonomously using AI, NLP, or LLM technologies.
The goal of the project is to demonstrate your ability to design, implement, and evaluate an intelligent agent that can perceive input, reason about it, and perform actions toward a defined objective.

Learning Outcomes
By completing this project, students should demonstrate the ability to:
1.	Design an AI agent architecture
2.	Apply NLP or AI models for understanding user input
3.	Implement agent decision logic or workflows
4.	Evaluate the effectiveness and limitations of the AI agent
5.	Consider ethical and responsible AI implications

Project Requirements
1. Define the Agent
Students must design an agent that solves a clear problem or performs a meaningful task. Problem Statement: What "pain point" does this agent solve?
Examples:
•	AI Academic Advisor
•	Study Assistant Agent
•	Customer Support Agent
•	Code Debugging Assistant
•	Mental Wellness Check-in Bot
•	Research Paper Summarizer
•	AI Travel Planner
•	AI Meeting Scheduler
•	Personal Finance Coach
•	AI Programming Tutor
The agent must include:
•	Goal / Objective
•	Target users
•	Scope of tasks

2. Agent Architecture
Students must explain how their agent works using an agent model. Logic Flow: A flowchart of the agent’s decision-making process.

Minimum architecture components:
Input / Perception
•	User prompts
•	Data sources
•	Documents
•	APIs
Reasoning / Processing
•	NLP model
•	LLM
•	rules or decision logic
•	retrieval mechanisms
Action / Output
•	Response generation
•	recommendations
•	automated tasks
•	workflow execution
Students must submit a simple architecture diagram.
Example:
User → NLP Processing → Decision Logic → Tool/API → Response

3. Implementation
Students must implement a working prototype.
Allowed tools include:
•	Python
•	LangChain
•	OpenAI API
•	Azure AI
•	HuggingFace
•	NodeJS
•	Streamlit
•	Chatbot frameworks
Minimum features:
•	Accepts user input
•	Processes the request
•	Generates intelligent output
•	Performs at least one automated decision or action

4. Agent Behavior (Agentic Features)
Your AI must demonstrate at least two agentic capabilities, such as:
•	Goal-oriented task completion
•	Multi-step reasoning. Reasoning Engine: Use of a Large Language Model (LLM) with a specific prompting strategy (e.g., ReAct, Chain-of-Thought).
•	Tool usage (API calls). The agent must be connected to at least one external tool (e.g., a weather API, a Google Calendar integration, or a custom-built Python script).
•	Memory or context retention. Implementation of short-term (context window) or long-term (Vector Database/RAG) memory.
•	Decision-making rules
•	Planning steps
•	Autonomy: The agent should be able to take multiple steps to reach a goal without human intervention between every step.

Example:
User request → Agent plans → Agent retrieves data → Agent responds


5. Evaluation
Students must test the AI agent.
Minimum testing:
•	5–10 test scenarios
•	Document results
•	Identify failures or limitations
Example:
Test Case	Expected Result	Actual Result

6. Responsible AI Reflection
Students must include a short reflection (300–500 words) discussing:
•	Ethical risks
•	Bias or misinformation risks
•	Transparency
•	How users should safely interact with the system
Ethical Audit: A brief "Responsible AI" assessment of potential biases or risks associated with the agent's autonomy.


Deliverables
Students must submit the following (uploaded in MS Teams Assignment tab):
1. Project Report (5–8 pages)
Contents:
1.	Introduction
2.	Problem Statement
3.	Agent Design
4.	System Architecture
5.	Implementation
6.	Testing and Evaluation
7.	Responsible AI Reflection
8.	Conclusion

2. Working Prototype
Link to be included in the Assignment Tab:
•	GitHub repository. Well-documented code including a README.md that explains the system architecture, the libraries used (e.g., LangChain, CrewAI, or AutoGPT), and setup instructions.
•	Web demo
•	Notebook demo
•	Chatbot interface

3. Short Demo Video
Link to be included in the Assignment Tab:
Length: 3–5 minutes
Content:
•	Explain your AI agent
•	Demonstrate interaction
•	Show how it makes decisions

4. Presentation
Each student will present:
•	Problem solved
•	Agent architecture
•	Demo
•	Key challenges
Time: 5–7 minutes
Sample Q&A Question: "How does your agent handle a 'hallucination' when an external API returns an error?"

Evaluation Criteria
Criteria	Weight
Problem relevance	15%
Agent design	20%
Technical implementation	25%
Agentic behavior	15%
Testing & evaluation	10%
Responsible AI reflection	10%
Presentation	5%

Example High-Quality Project
AI Research Assistant
Capabilities:
•	Accepts research topic
•	Searches papers
•	Summarizes findings
•	Suggests research questions
Agent behavior:
1.	Interpret query
2.	Retrieve documents
3.	Summarize
4.	Suggest insights

Stretch Challenge (Optional Bonus)
Students may implement:
•	Multi-agent collaboration
•	Voice interaction
•	Retrieval-Augmented Generation
•	Memory-based agents
Bonus: +5%
________________________________________
HOW TO CREATE AI AGENT?

You can create their own AI agent or agentic AI relatively easily today by using no-code tools, low-code frameworks, or simple Python libraries. The key is helping them understand that an AI agent is essentially a system that:
Input → Reason → Take Action → Produce Output

1. Easiest Method: Using Custom GPTs (No-Code AI Agent)
You can create a basic AI agent using ChatGPT Custom GPTs.
Steps
1.	Go to Explore GPTs → Create GPT
2.	Define the agent role
3.	Add instructions
4.	Upload knowledge files (PDF, notes, datasets)
5.	Enable tools (browser, code interpreter, etc.)
Example Agent: AI Study Coach
Instructions:
You are a study coach that helps computer science students plan study schedules and explain difficult concepts.
Capabilities:
•	Answer questions
•	Generate study plans
•	Explain lessons
Why this works
•	No coding required
•	Immediate agent behavior
•	Good for understanding prompt-based agents

2. Beginner Coding Method: Python + OpenAI API
You can create a simple AI agent in ~30 lines of Python.
Example: Simple AI Assistant Agent (sample code below only)
from openai import OpenAI
client = OpenAI()

while True:
    user_input = input("You: ")
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role":"system","content":"You are a helpful academic assistant."},
            {"role":"user","content":user_input}
        ]
    )
    print("Agent:", response.choices[0].message.content)
You can extend this with:
•	decision rules
•	memory
•	tool usage

3. Build a Real Agent with Tools (LangChain)
You can use LangChain, which is widely used to build agentic systems.
Example agent workflow:
User → LLM → Decide Tool → Execute Tool → Return Result
Example Tools
The agent can use:
•	Wikipedia search
•	calculator
•	web search
•	database query
Example:  AI Research Agent
User:
“Explain quantum computing and find recent papers.”
Agent:
1.	Searches information
2.	Summarizes results
3.	Provides explanation

4. Visual AI Agent Builder (Great for Students)
You can create agents visually using Flowise or LangFlow.
These tools allow students to drag-and-drop AI components.
Example workflow:
User Input
   ↓
LLM
   ↓
Decision Node
   ↓
Search Tool
   ↓
Response Generator
This helps you see how agent pipelines work.

5. Create a Chatbot Agent with Knowledge
You can create domain-specific AI agents.
Example:
AI APC Student Advisor
Capabilities:
•	Answer student questions
•	Explain course requirements
•	Suggest electives
Implementation:
Upload:
•	curriculum documents
•	policies
•	course descriptions
The AI agent retrieves answers from those documents.
This introduces Retrieval-Augmented Generation (RAG).

6. Simple Agent Planning Example
You can create a task planning agent.
Example:
User request:
Plan a 3-day study schedule for machine learning.
Agent behavior:
1.	Understand goal
2.	Break task into steps
3.	Generate plan
Output:
Day 1
- Supervised learning
- Linear regression

Day 2
- Classification
- Evaluation metrics

Day 3
- Neural networks
- Practice problems
This demonstrates agent reasoning and planning.

7. Easy AI Agent Ideas for Students
You should pick simple but useful agents.
Examples:
AI Code Debugger
•	analyze code errors
•	suggest fixes
AI Resume Reviewer
•	analyze resume
•	give feedback
AI Research Summarizer
•	summarize papers
AI Mental Wellness Check-in
•	ask reflective questions
AI Programming Tutor
•	explain code concepts

Recommended Tools for Students
Tool	Difficulty	Best For
ChatGPT Custom GPT	Very Easy	Beginners
Flowise / LangFlow	Easy	Visual AI agents
Python + OpenAI API	Medium	Coding projects
LangChain	Medium	Real agent frameworks
HuggingFace	Medium	NLP experimentation

What Makes It an Agent?
You should ensure their project includes:
✔ Goal-oriented behavior
✔ Decision making
✔ Ability to process input
✔ Ability to produce actions or responses
Example architecture:
User Input
   ↓
NLP / LLM
   ↓
Decision Logic
   ↓
Tool / Data Access
   ↓
Response

